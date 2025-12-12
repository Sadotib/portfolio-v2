import './index.css'
import { setupCounter } from './js/counter.js'
import { initContent } from './components/content.js'
import { headerSection } from './components/header-section.js'


initContent();
headerSection();
document.querySelector('#app').innerHTML = `
  <div>
    
  </div>
`

setupCounter(document.querySelector('#counter'))
