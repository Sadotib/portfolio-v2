import './index.css'

import { initContent } from './components/about-links-section.js'
import { headerSection } from './components/header-section.js'


initContent();
headerSection();
document.querySelector('#app').innerHTML = `
  <div>
    
  </div>
`

setupCounter(document.querySelector('#counter'))
