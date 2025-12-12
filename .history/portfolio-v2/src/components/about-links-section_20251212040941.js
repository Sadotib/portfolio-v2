import { initThemeToggle } from "../js/theme"

export function initContent() {
  document.querySelector('#content').innerHTML = `
    <div>
      <h2>About Me</h2>
    </div>
  `
  initThemeToggle();
}