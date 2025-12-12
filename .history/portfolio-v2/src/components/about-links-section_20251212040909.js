import { initThemeToggle } from "../js/theme"

export function initContent() {
  document.querySelector('#content').innerHTML = `
    <div>
      
    </div>
  `
  initThemeToggle();
}