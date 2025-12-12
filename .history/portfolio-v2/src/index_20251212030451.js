/**
 * Portfolio Site Main Entry Point
 * Initializes all components and modules
 */

import { initGridAdjustment } from './components/grid.js';
import { checkOffsets } from './components/gridDebug.js';
import { initThemeToggle } from './components/theme.js';
import { initBackgroundMusic } from './components/music.js';

// Initialize grid and media adjustments
initGridAdjustment();

// Initialize theme toggle functionality
window.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initBackgroundMusic();
});


