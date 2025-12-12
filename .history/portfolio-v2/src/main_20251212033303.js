import './index.css'

import face from '/face.png'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    
  </div>
`

setupCounter(document.querySelector('#counter'))
