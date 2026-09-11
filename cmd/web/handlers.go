package main

import (
	"fmt"
	"net/http"
	"os"
	"portfolio-v2/ui/html/pages"
	"time"

	"github.com/julienschmidt/httprouter"
)

func ping(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(time.Now().Weekday().String()))
}
func (app *application) home(w http.ResponseWriter, r *http.Request) {

	err := app.render(w, r, pages.Home(app.day))
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) about(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.About(app.day))
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) contact(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Contact(app.day))
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) experience(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Experience(app.day))
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) projects(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Projects(app.day))
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) blog(w http.ResponseWriter, r *http.Request) {

	blogs, err := loadBlogs()
	if err != nil {
		app.serverError(w, err)
		return
	}

	fmt.Println("blogs:", len(blogs))

	err = app.render(w, r, pages.Blog(blogs, app.day))
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) blogPost(w http.ResponseWriter, r *http.Request) {

	params := httprouter.ParamsFromContext(r.Context())

	slug := params.ByName("slug")

	fmt.Println("slug:", slug)

	blogPost, err := getBySlug(slug)

	if err != nil {
		if os.IsNotExist(err) {
			app.notFound(w, r, pages.NotFound())
			return
		}
		app.serverError(w, err)
		return
	}

	err = app.render(w, r, pages.BlogPost(*blogPost, app.day))
	if err != nil {
		app.serverError(w, err)
	}
}

// func (app *application) misc(w http.ResponseWriter, r *http.Request) {
// 	err := app.render(w, r, pages.Misc())
// 	if err != nil {
// 		app.serverError(w, err)
// 	}
// }

// func (app *application) tour(w http.ResponseWriter, r *http.Request) {
// 	err := app.render(w, r, pages.Tour())
// 	if err != nil {
// 		app.serverError(w, err)
// 	}
// }
