package main

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"portfolio-v2/internal/models"
	"runtime/debug"
	"strings"
	"time"

	"github.com/a-h/templ"
	"github.com/yuin/goldmark"
)

func (app *application) serverError(w http.ResponseWriter, err error) {
	trace := fmt.Sprintf("%s\n%s", err.Error(), debug.Stack())
	app.errorLog.Output(2, trace)

	if app.debugFlag { //is debug flag is used, display the detailed error message
		http.Error(w, trace, http.StatusInternalServerError)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}

}

// The clientError helper sends a specific status code and corresponding description
// to the user. We'll use this later in the book to send responses like 400 "Bad
// Request" when there's a problem with the request that the user sent.
func (app *application) clientError(w http.ResponseWriter, status int) {
	http.Error(w, http.StatusText(status), status)
}

// For consistency, we'll also implement a notFound helper. This is simply a
// convenience wrapper around clientError which sends a 404 Not Found response to
// the user.
func (app *application) notFound(w http.ResponseWriter, r *http.Request, c templ.Component) {
	//we'll add a custom 404 not found page render here
	app.render(w, r, c)
	// app.clientError(w, http.StatusNotFound)

}

func (app *application) render(w http.ResponseWriter, r *http.Request, c templ.Component) error {
	return c.Render(r.Context(), w)
}

func (app *application) setDay() {
	app.day = time.Now().Weekday().String()
}

func loadBlogs() ([]models.Blog, error) {
	var blogs []models.Blog

	files, err := os.ReadDir("./blog")
	if err != nil {
		return nil, err
	}

	for _, file := range files {

		if file.IsDir() {
			continue
		}

		if filepath.Ext(file.Name()) != ".md" {
			continue
		}

		path := filepath.Join(
			"./blog",
			file.Name(),
		)

		content, err := os.ReadFile(path)
		if err != nil {
			return nil, err
		}

		slug := strings.TrimSuffix(
			file.Name(),
			filepath.Ext(file.Name()),
		)

		blogs = append(
			blogs,
			models.Blog{
				Title:   formatTitle(slug),
				Slug:    slug,
				Content: string(content),
			},
		)
	}

	return blogs, nil
}

func formatTitle(slug string) string {

	words := strings.Split(slug, "-")

	for i, word := range words {
		words[i] = strings.ToUpper(
			word[:1],
		) + word[1:]
	}

	return strings.Join(words, " ")
}

func getBySlug(slug string) (*models.Blog, error) {

	path := filepath.Join(
		"./blog",
		slug+".md",
	)

	content, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	return &models.Blog{
		Title:   formatTitle(slug),
		Slug:    slug,
		Content: renderMarkdown(string(content)),
	}, nil
}

func renderMarkdown(content string) string {
	// Remove YAML front matter if present.
	content = removeFrontMatter(content)

	var buf bytes.Buffer

	err := goldmark.Convert([]byte(content), &buf)
	if err != nil {
		return ""
	}

	return buf.String()
}

func removeFrontMatter(content string) string {
	content = strings.TrimSpace(content)

	if !strings.HasPrefix(content, "---") {
		return content
	}

	// Find the closing ---
	rest := content[3:]

	if idx := strings.Index(rest, "\n---"); idx != -1 {
		return strings.TrimSpace(rest[idx+4:])
	}

	return content
}
