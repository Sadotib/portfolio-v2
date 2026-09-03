package main

import (
	"net/http"
	"os"
	"portfolio-v2/ui"
	"portfolio-v2/ui/html/pages"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

// noDirListingFS wraps an http.FileSystem and prevents directories
// from being served. This stops http.FileServer from automatically
// generating a directory listing when someone visits a directory
// such as /static/ or /static/css/.
type noDirListingFS struct {
	fs http.FileSystem
}

// Open is called by http.FileServer whenever it needs to access
// a file or directory from the filesystem.
func (n noDirListingFS) Open(name string) (http.File, error) {
	// Try to open the requested path using the underlying filesystem.
	// If the file doesn't exist (or another error occurs), pass the
	// error back to http.FileServer.
	f, err := n.fs.Open(name)
	if err != nil {
		return nil, err
	}

	// Get information about what we just opened so we can determine
	// whether it is a file or a directory.
	info, err := f.Stat()
	if err != nil {
		f.Close()
		return nil, err
	}

	// http.FileServer normally generates an HTML directory listing
	// when the requested path is a directory.
	//
	// We don't want users to browse our static/ directory structure,
	// so treat directories as if they don't exist.
	if info.IsDir() {
		f.Close()
		return nil, os.ErrNotExist
	}

	// The requested path is a regular file, so allow
	// http.FileServer to serve it normally.
	return f, nil
}

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.RedirectTrailingSlash = true
	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		app.notFound(w, r, pages.NotFound())
	})
	router.MethodNotAllowed = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		app.clientError(w, http.StatusMethodNotAllowed)
	})

	// Take the ui.Files embedded filesystem and convert it to a http.FS type so
	// that it satisfies the http.FileSystem interface. We then pass that to the
	// http.FileServer() function to create a new file server handler.
	fileServer := http.FileServer(
		noDirListingFS{
			fs: http.FS(ui.Files),
		})

	// our static files are contained in the "static" folder of the ui.Files
	// embedded filesystem. So, for example, our CSS stylesheet is located at
	// "static/css/main.css". This means that we no longer need to strip the
	// prefix from the request URL -- any requests that start with /static/ can
	// just be passed directly to the file server and the corresponding static
	// file will be served (so long as it exists).
	router.Handler(http.MethodGet, "/static/*filepath", fileServer)

	router.HandlerFunc(http.MethodGet, "/ping", ping)

	router.HandlerFunc(http.MethodGet, "/", app.home)
	router.HandlerFunc(http.MethodGet, "/about", app.about)
	router.HandlerFunc(http.MethodGet, "/contact", app.contact)
	router.HandlerFunc(http.MethodGet, "/experience", app.experience)
	router.HandlerFunc(http.MethodGet, "/projects", app.projects)
	router.HandlerFunc(http.MethodGet, "/blog", app.blog)
	// router.HandlerFunc(http.MethodGet, "/misc", app.misc)
	router.HandlerFunc(http.MethodGet, "/tour", app.tour)

	standard := alice.New(app.recoverPanic, app.logRequest, secureHeaders)

	return standard.Then(router)
}
