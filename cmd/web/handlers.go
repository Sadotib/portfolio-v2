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

// func (app *application) about(w http.ResponseWriter, r *http.Request) {
// 	err := app.render(w, r, pages.About())
// 	if err != nil {
// 		app.serverError(w, err)
// 	}
// }
