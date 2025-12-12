import './index.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './js/counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    
  </div>
`

setupCounter(document.querySelector('#counter'))
