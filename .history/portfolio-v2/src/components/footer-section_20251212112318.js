export function footerSection() {
  document.querySelector('#footer-section').innerHTML = `
    <footer>
        <div class="grid">
            <div>
                <button id="music-toggle" type="button" aria-pressed="false">
                    gg
                </button>
                <em>site ver: 1.0.0</em>
            </div>

            <div>
                <em>site template:<a
                        href="https://github.com/owickstrom/the-monospace-web/tree/main">monospace-web</a></em>
            </div>
        </div>
    </footer>
  `
}