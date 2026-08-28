package main

import (
	"fmt"
	"net/http"
	"runtime/debug"

	"github.com/a-h/templ"
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
