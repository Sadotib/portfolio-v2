tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'mono': ['Share Tech Mono', 'monospace'],
      },
      colors: {
        'pda': {
          'void': '#050508',
          'body': '#1a1d26',
          'body-light': '#252830',
          'screen': '#0a0e17',
          'bezel': '#0a0c10',
          'cyan': '#00f0ff',
          'amber': '#f0a030',
          'red': '#ff2d55',
          'green': '#00ff88',
          'muted': '#6b7280',
          'text': '#e8eaed',
          'dim': '#3a3f4b',
        }
      },
      boxShadow: {
        'cyan-glow': '0 0 10px rgba(0, 240, 255, 0.3), 0 0 30px rgba(0, 240, 255, 0.1)',
        'cyan-sm': '0 0 6px rgba(0, 240, 255, 0.4)',
        'red-glow': '0 0 8px rgba(255, 45, 85, 0.5)',
        'green-glow': '0 0 8px rgba(0, 255, 136, 0.5)',
        'amber-glow': '0 0 8px rgba(240, 160, 48, 0.5)',
      }
    }
  }
}
