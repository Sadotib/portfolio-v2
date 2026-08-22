/**
 * PDA-7X Interface Logic
 * Terminal, Navigation, Clock, Volume Wheel, Music Toggle
 */

document.addEventListener('DOMContentLoaded', function () {
  initBootSequence();
  initClock();
  initTabs();
  initTerminal();
  initVolumeWheel();
  initMusicToggle();
});

// ===== BOOT SEQUENCE =====
var pdaStartTime = Date.now();

function initBootSequence() {
  var overlay = document.getElementById('boot-overlay');
  if (!overlay) return;

  var lines = [
    'PDA-7X BIOS v2.0.42',
    'INITIALIZING SYSTEM...',
    'CPU: OK  |  MEM: OK  |  NET: OK',
    'LOADING MODULES...',
    '> ui.engine      [OK]',
    '> term.shell     [OK]',
    '> data.store     [OK]',
    'SYSTEM READY.',
    '',
    'WELCOME, OPERATOR.',
  ];

  var textContainer = overlay.querySelector('.boot-text');
  var i = 0;

  var interval = setInterval(function () {
    if (i < lines.length) {
      var lineEl = document.createElement('div');
      lineEl.className = 'boot-line';
      lineEl.textContent = lines[i];
      if (lines[i] === 'WELCOME, OPERATOR.') {
        lineEl.classList.add('text-pda-amber');
      }
      textContainer.appendChild(lineEl);
      i++;
    } else {
      clearInterval(interval);
      setTimeout(function () {
        overlay.classList.add('boot-fade-out');
        setTimeout(function () {
          overlay.remove();
        }, 600);
      }, 400);
    }
  }, 120);
}

// ===== LIVE CLOCK =====
function initClock() {
  var clockEl = document.getElementById('pda-clock');
  if (!clockEl) return;

  function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = h + ':' + m + ':' + s;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

function getUptime() {
  var elapsed = Math.floor((Date.now() - pdaStartTime) / 1000);
  var h = Math.floor(elapsed / 3600);
  var m = Math.floor((elapsed % 3600) / 60);
  var s = elapsed % 60;
  return h + 'h ' + m + 'm ' + s + 's';
}

// ===== TAB NAVIGATION =====
function initTabs() {
  var tabs = document.querySelectorAll('[data-tab]');
  var panels = document.querySelectorAll('[data-panel]');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');

      // Update active tab
      tabs.forEach(function (t) {
        t.classList.remove('tab-active');
      });
      tab.classList.add('tab-active');

      // Show target panel
      panels.forEach(function (p) {
        if (p.getAttribute('data-panel') === target) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });

      // Scroll content to top
      var contentArea = document.getElementById('screen-panels');
      if (contentArea) contentArea.scrollTop = 0;
    });
  });
}

function navigateToTab(tabName) {
  var tab = document.querySelector('[data-tab="' + tabName + '"]');
  if (tab) tab.click();
}

// ===== TERMINAL =====
function initTerminal() {
  var input = document.getElementById('terminal-input');
  var output = document.getElementById('terminal-output');
  var toggleBtn = document.getElementById('terminal-toggle');

  if (!input || !output) return;

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var cmd = input.value.trim();
      if (cmd) {
        processCommand(cmd, output);
        input.value = '';
      }
    }
  });

  // Toggle terminal expand/collapse
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var terminal = document.getElementById('terminal-bar');
      if (terminal) {
        terminal.classList.toggle('terminal-expanded');
      }
    });
  }
}

function processCommand(cmd, output) {
  // Handle clear first
  if (cmd.toLowerCase() === 'clear') {
    output.innerHTML = '';
    return;
  }

  // Show typed command
  var line = document.createElement('div');
  line.className = 'term-history-line';
  line.innerHTML = '<span class="text-pda-green">root@pda:~$</span> <span class="text-pda-text">' + escapeHtml(cmd) + '</span>';
  output.appendChild(line);

  // Process and show response
  var response = getCommandResponse(cmd);
  if (response) {
    var respDiv = document.createElement('div');
    respDiv.className = 'term-response';
    respDiv.innerHTML = response;
    output.appendChild(respDiv);
  }

  output.scrollTop = output.scrollHeight;
}

function escapeHtml(text) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

function getCommandResponse(cmd) {
  var parts = cmd.split(/\s+/);
  var command = parts[0].toLowerCase();
  var args = parts.slice(1).join(' ');

  switch (command) {
    case '--help':
    case '-help':
    case 'help':
      return '<span class="text-pda-cyan font-bold">Available Commands:</span>\n' +
        '  <span class="text-pda-amber">whoami</span>        Display operator identity\n' +
        '  <span class="text-pda-amber">skills</span>        List technical capabilities\n' +
        '  <span class="text-pda-amber">contact</span>       Show contact channels\n' +
        '  <span class="text-pda-amber">ls</span>            List available sections\n' +
        '  <span class="text-pda-amber">cd</span> &lt;section&gt;  Navigate to a section\n' +
        '  <span class="text-pda-amber">neofetch</span>      System information\n' +
        '  <span class="text-pda-amber">uptime</span>        Time since boot\n' +
        '  <span class="text-pda-amber">date</span>          Current date and time\n' +
        '  <span class="text-pda-amber">echo</span> &lt;text&gt;   Echo text back\n' +
        '  <span class="text-pda-amber">clear</span>         Clear terminal output\n' +
        '  <span class="text-pda-amber">secret</span>        ???\n' +
        '  <span class="text-pda-amber">--help</span>        Show this help message';

    case 'whoami':
      return '<span class="text-pda-cyan font-bold">SADOTIB</span> // Software Engineer & Systems Architect\n' +
        '<span class="text-pda-muted">Building robust distributed systems and hypermedia experiences.</span>';

    case 'skills':
      return '<span class="text-pda-amber font-bold">TECH_MATRIX:</span>\n' +
        '  ├── Go, Python, JavaScript, Rust\n' +
        '  ├── PostgreSQL, Redis, Kafka, ClickHouse\n' +
        '  ├── Docker, Kubernetes, Linux\n' +
        '  ├── HTMX, Templ, gRPC, Protobuf\n' +
        '  └── TLS/mTLS, OAuth2, CI/CD Pipelines';

    case 'contact':
      return '<span class="text-pda-green font-bold">CONTACT_CHANNELS:</span>\n' +
        '  ├── WEB:    <span class="text-pda-cyan">sadotib.in</span>\n' +
        '  ├── GITHUB: <span class="text-pda-cyan">github.com/sadotib</span>\n' +
        '  └── EMAIL:  <span class="text-pda-cyan">hello@sadotib.in</span>';

    case 'ls':
      return '<span class="text-pda-cyan">drwxr-xr-x</span>  about/\n' +
        '<span class="text-pda-cyan">drwxr-xr-x</span>  experience/\n' +
        '<span class="text-pda-cyan">drwxr-xr-x</span>  education/\n' +
        '<span class="text-pda-cyan">drwxr-xr-x</span>  projects/\n' +
        '<span class="text-pda-cyan">drwxr-xr-x</span>  blog/\n' +
        '<span class="text-pda-cyan">drwxr-xr-x</span>  misc/';

    case 'cd':
      if (!args) {
        return '<span class="text-pda-red">Usage:</span> cd &lt;section&gt;\n' +
          '<span class="text-pda-muted">Available: about, experience, education, projects, blog, misc</span>';
      }
      var section = args.replace(/\//g, '').toLowerCase();
      var valid = ['about', 'experience', 'education', 'projects', 'blog', 'misc'];
      if (valid.indexOf(section) !== -1) {
        navigateToTab(section);
        return '<span class="text-pda-green">Navigating to ' + section.toUpperCase() + '...</span>';
      }
      return '<span class="text-pda-red">ERROR:</span> Section \'' + escapeHtml(args) + '\' not found. Use \'ls\' to list sections.';

    case 'neofetch':
      return '<span class="text-pda-cyan">  ██████╗ ██████╗  █████╗ \n' +
        '  ██╔══██╗██╔══██╗██╔══██╗\n' +
        '  ██████╔╝██║  ██║███████║\n' +
        '  ██╔═══╝ ██║  ██║██╔══██║\n' +
        '  ██║     ██████╔╝██║  ██║\n' +
        '  ╚═╝     ╚═════╝ ╚═╝  ╚═╝</span>\n' +
        '  <span class="text-pda-amber">OS:</span>      PDA-7X // SadotibOS v2.0\n' +
        '  <span class="text-pda-amber">KERNEL:</span>  Go 1.26 / Templ / HTMX\n' +
        '  <span class="text-pda-amber">UPTIME:</span>  ' + getUptime() + '\n' +
        '  <span class="text-pda-amber">SHELL:</span>   pda-term v1.0\n' +
        '  <span class="text-pda-amber">MEMORY:</span>  14.2 MB RSS\n' +
        '  <span class="text-pda-amber">DOMAIN:</span>  sadotib.in';

    case 'uptime':
      return '<span class="text-pda-green">SYSTEM UPTIME:</span> ' + getUptime();

    case 'date':
      var now = new Date();
      return '<span class="text-pda-cyan">' + now.toLocaleString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) + '</span>';

    case 'echo':
      return args ? escapeHtml(args) : '';

    case 'secret':
      return '<span class="text-pda-amber">======= ACCESS GRANTED =======</span>\n' +
        '<span class="text-pda-muted">You found the easter egg!\n\n' +
        'This entire portfolio is a single Go binary.\n' +
        'No Node.js, no webpack, no npm install.\n' +
        'Just Go + Templ + HTMX.\n' +
        'The way the web was meant to be.</span>\n' +
        '<span class="text-pda-amber">==============================</span>';

    default:
      return '<span class="text-pda-red">ERROR:</span> Command \'' + escapeHtml(cmd) + '\' not recognized.\n' +
        '<span class="text-pda-muted">Type \'--help\' for available commands.</span>';
  }
}

// ===== VOLUME WHEEL =====
function initVolumeWheel() {
  var wheel = document.getElementById('volume-wheel');
  if (!wheel) return;

  var isDragging = false;
  var currentAngle = 0;
  var startY = 0;

  wheel.addEventListener('mousedown', function (e) {
    isDragging = true;
    startY = e.clientY;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var delta = startY - e.clientY;
    currentAngle = Math.max(-150, Math.min(150, currentAngle + delta * 0.8));
    wheel.style.transform = 'rotate(' + currentAngle + 'deg)';
    startY = e.clientY;
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  // Touch support
  wheel.addEventListener('touchstart', function (e) {
    isDragging = true;
    startY = e.touches[0].clientY;
    e.preventDefault();
  });

  document.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    var delta = startY - e.touches[0].clientY;
    currentAngle = Math.max(-150, Math.min(150, currentAngle + delta * 0.8));
    wheel.style.transform = 'rotate(' + currentAngle + 'deg)';
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', function () {
    isDragging = false;
  });
}

// ===== MUSIC TOGGLE =====
function initMusicToggle() {
  var btn = document.getElementById('music-toggle');
  if (!btn) return;

  var isPlaying = false;

  btn.addEventListener('click', function () {
    isPlaying = !isPlaying;
    btn.classList.toggle('music-active', isPlaying);

    var led = btn.querySelector('.music-led');
    if (led) {
      if (isPlaying) {
        led.classList.remove('led-red');
        led.classList.add('led-green');
      } else {
        led.classList.remove('led-green');
        led.classList.add('led-red');
      }
    }
    // Audio element can be wired up here later
  });
}
