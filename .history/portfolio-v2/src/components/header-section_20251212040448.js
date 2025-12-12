export function headerSection() {
  document.querySelector('#heading-section').innerHTML = `
    <div>
      <form class="grid">
        <label><input name="theme" type="radio" value="dark" /> Dark</label>
        <label><input name="theme" type="radio" value="light" checked /> Light</label>
      </form>
    </div>
  `
}