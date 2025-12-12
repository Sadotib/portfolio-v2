import './index.css'
import javascriptLogo from './javascript.svg'
import face from '/face.png'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    
  </div>
`

setupCounter(document.querySelector('#counter'))
