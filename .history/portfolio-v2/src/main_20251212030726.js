import './index.css'
import { initGridAdjustment } from './components/grid.js'
import { initThemeToggle } from './components/theme.js'
import { initBackgroundMusic } from './components/music.js'

// Initialize grid and media adjustments
initGridAdjustment()

// Initialize components when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  initThemeToggle()
  initBackgroundMusic()
})
