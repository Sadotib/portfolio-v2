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
            <img src="assets/face.png" alt="face" height="100" width="100" class="floating-face" />
        </div>

        <!-- Social Links Section-->
    </div>
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
  `
}