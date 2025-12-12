import { initThemeToggle } from "../js/theme"

export function initContent() {
  document.querySelector('#content').innerHTML = `
    <div>
      <p>
        I am currently studying Computer Science and Engineering at Jorhat Engineering College, Assam.
        I am a developer
        by interest and into SAP by profession.I also have a black belt in Taekwondo with 8 years
        of experience.
      </p>
      <p>
          <a href="https://github.com/Sadotib" target="_blank">Github</a>
          <a href="https://www.linkedin.com/in/bitopan-das-a21928254/" target="_blank">LinkedIn</a>
          <a href="mailto:bitopan21mbb@gmail.com">Email</a>
          <a href="https://www.instagram.com/sadotib" target="_blank">Instagram</a>
          <a href="https://letterboxd.com/sadotib/" target="_blank">Letterboxd</a>
      </p>
      <button id="startBtn">Start Game</button>
    </div>
  `
  initThemeToggle();
}