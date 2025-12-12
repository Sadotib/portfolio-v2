import './index.css'

import { initContent } from './components/about-links-section.js'
import { headerSection } from './components/header-section.js'


initContent();
headerSection();
document.querySelector('#app').innerHTML = `
  <div>
    <h1>This is main.js</h1>
  </div>
`

setupCounter(document.querySelector('#counter'))
