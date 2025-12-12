import { initThemeToggle } from '../js/theme';
import face from '/face.png';

export function headerSection() {
  document.querySelector('#heading-section').innerHTML = `
    <div class="grid">
        <div>
            <h1>Bitopan Das</h1>
            <h3>aka sado / sadotib</h3>
            <h2>welcome to my site</h2>

        </div>
        <div>
            <form class="grid">
                <label><input name="theme" type="radio" value="dark" /> Dark</label>
                <label><input name="theme" type="radio" value="light" checked /> Light</label>


            </form>

            <br>
            <img src="${face}" alt="face" height="100" width="100" class="floating-face" />
        </div>

        <!-- Social Links Section-->
    </div>
    
  `
  initThemeToggle();
}