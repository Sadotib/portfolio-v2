import './index.css'

import { initContent } from './components/about-links-section.js'
import { headerSection } from './components/header-section.js'
import { projectTab } from './components/project-tab.js';


initContent();
headerSection();
projectTab();
document.querySelector('#app').innerHTML = `
  <div>
    <hr/>
    <h1>This is main.js</h1>
    <hr/>
  </div>
`

setupCounter(document.querySelector('#counter'))
