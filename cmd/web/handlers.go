package main

import (
	"net/http"
	"portfolio-v2/ui/html/pages"
	"time"
)

func ping(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(time.Now().Weekday().String()))
}
func (app *application) home(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Home())
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) about(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.About())
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) contact(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Contact())
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) experience(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Experience())
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) projects(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Projects())
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) blog(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Blog())
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) misc(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Misc())
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) tour(w http.ResponseWriter, r *http.Request) {
	err := app.render(w, r, pages.Tour())
	if err != nil {
		app.serverError(w, err)
	}
}
