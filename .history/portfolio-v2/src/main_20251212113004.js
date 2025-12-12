import './index.css'

import { initContent } from './components/about-links-section.js'
import { headerSection } from './components/header-section.js'
import { tabProject } from './components/tab-project.js';
import { tabExperience } from './components/tab-experience.js';
import { tabSkills } from './components/tab-skills.js';
import { tabEducation } from './components/tab-education.js';
import { footerSection } from './components/footer-section.js';


// Initialize all components
const initializeApp = () => {
  initContent()
  headerSection()
  tabProject()
  tabExperience()
  tabSkills()
  tabEducation()
  footerSection()
}

document.querySelector('#app').innerHTML = `
  <div>
    <hr/>
    <h1>This is main.js</h1>
    <hr/>
  </div>
`

setupCounter(document.querySelector('#counter'))
