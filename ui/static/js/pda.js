/**
 * PDA-7X Interface Logic
 * Terminal, Navigation, Clock, Volume Wheel, Music Toggle, Power
 */

document.addEventListener('DOMContentLoaded', function () {
  initBootSequence();
  initClock();
  initTabs();
  initTerminal();
  initVolumeWheel();
  initMusicToggle();
  initPowerButton();
});


// =========================================================
// BOOT SEQUENCE
// =========================================================

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


// =========================================================
// LIVE CLOCK
// =========================================================

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
  var elapsed =
    Math.floor(
      (Date.now() - pdaStartTime) / 1000
    );

  var h = Math.floor(elapsed / 3600);
  var m = Math.floor((elapsed % 3600) / 60);
  var s = elapsed % 60;

  return h + 'h ' + m + 'm ' + s + 's';
}


// =========================================================
// TAB NAVIGATION
// =========================================================

function initTabs() {
  var tabs =
    document.querySelectorAll('[data-tab]');

  var panels =
    document.querySelectorAll('[data-panel]');


  tabs.forEach(function (tab) {

    tab.addEventListener('click', function () {

      var target =
        tab.getAttribute('data-tab');


      // Update active tab
      tabs.forEach(function (t) {
        t.classList.remove('tab-active');
      });

      tab.classList.add('tab-active');


      // Show target panel
      panels.forEach(function (p) {

        if (
          p.getAttribute('data-panel') === target
        ) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }

      });


      // Scroll content to top
      var contentArea =
        document.getElementById('screen-panels');

      if (contentArea) {
        contentArea.scrollTop = 0;
      }

    });

  });
}


function navigateToTab(tabName) {

  var tab =
    document.querySelector(
      '[data-tab="' + tabName + '"]'
    );

  if (tab) {
    tab.click();
  }
}


// =========================================================
// TERMINAL
// =========================================================

function initTerminal() {

  var input =
    document.getElementById('terminal-input');

  var output =
    document.getElementById('terminal-output');

  var toggleBtn =
    document.getElementById('terminal-toggle');


  if (!input || !output) return;


  initTerminalScrollControls(output);


  // Terminal command input
  input.addEventListener('keydown', function (e) {

    if (e.key === 'Enter') {

      var cmd =
        input.value.trim();

      if (cmd) {

        processCommand(
          cmd,
          output
        );

        input.value = '';
      }

    }

  });


  // Toggle terminal expand/collapse
  if (toggleBtn) {

    toggleBtn.addEventListener('click', function () {

      var terminal =
        document.getElementById('terminal-bar');

      if (terminal) {
        terminal.classList.toggle(
          'terminal-expanded'
        );
      }

    });

  }
}


// =========================================================
// TERMINAL SCROLL CONTROLS
// =========================================================

function initTerminalScrollControls(output) {

  var terminal =
    document.getElementById('terminal-bar');

  if (!terminal) return;


  // Prevent duplicate controls
  if (
    terminal.querySelector(
      '.terminal-scroll-controls'
    )
  ) {
    return;
  }


  terminal.style.position = 'relative';


  // Controls container
  var controls =
    document.createElement('div');

  controls.className =
    'terminal-scroll-controls';

  controls.setAttribute(
    'aria-label',
    'Terminal navigation'
  );


  // UP button
  var up =
    document.createElement('button');

  up.type = 'button';

  up.className =
    'terminal-scroll-button terminal-scroll-up';

  up.setAttribute(
    'aria-label',
    'Scroll terminal up'
  );

  up.setAttribute(
    'title',
    'Scroll up'
  );


  // DOWN button
  var down =
    document.createElement('button');

  down.type = 'button';

  down.className =
    'terminal-scroll-button terminal-scroll-down';

  down.setAttribute(
    'aria-label',
    'Scroll terminal down'
  );

  down.setAttribute(
    'title',
    'Scroll down'
  );


  controls.appendChild(up);
  controls.appendChild(down);

  terminal.appendChild(controls);


  // -------------------------------------------------------
  // Scroll helper
  // -------------------------------------------------------

  function scrollByPage(direction) {

    var amount =
      Math.max(
        output.clientHeight * 0.7,
        70
      );

    output.scrollBy({
      top: direction * amount,
      behavior: 'smooth'
    });
  }


  // -------------------------------------------------------
  // UP
  // -------------------------------------------------------

  up.addEventListener('click', function () {
    scrollByPage(-1);
  });


  // -------------------------------------------------------
  // DOWN
  // -------------------------------------------------------

  down.addEventListener('click', function () {
    scrollByPage(1);
  });


  // -------------------------------------------------------
  // Keyboard support
  // -------------------------------------------------------

  output.addEventListener('keydown', function (e) {

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      scrollByPage(-1);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      scrollByPage(1);
    }

    if (e.key === 'PageUp') {
      e.preventDefault();
      scrollByPage(-1);
    }

    if (e.key === 'PageDown') {
      e.preventDefault();
      scrollByPage(1);
    }

  });
}


// =========================================================
// PROCESS TERMINAL COMMAND
// =========================================================

function processCommand(cmd, output) {

  // Clear
  if (cmd.toLowerCase() === 'clear') {

    output.innerHTML = '';

    return;
  }


  // Show typed command
  var line =
    document.createElement('div');

  line.className =
    'term-history-line';


  line.innerHTML =
    '<span class="text-pda-green">' +
    'root@pda:~$' +
    '</span> ' +

    '<span class="text-pda-text">' +
    escapeHtml(cmd) +
    '</span>';


  output.appendChild(line);


  // Response
  var response =
    getCommandResponse(cmd);


  if (response) {

    var respDiv =
      document.createElement('div');

    respDiv.className =
      'term-response';

    respDiv.innerHTML =
      response;

    output.appendChild(respDiv);
  }


  output.scrollTop =
    output.scrollHeight;
}


// =========================================================
// HTML ESCAPE
// =========================================================

function escapeHtml(text) {

  var div =
    document.createElement('div');

  div.appendChild(
    document.createTextNode(text)
  );

  return div.innerHTML;
}


// =========================================================
// TERMINAL COMMAND RESPONSES
// =========================================================

function getCommandResponse(cmd) {

  var parts =
    cmd.split(/\s+/);

  var command =
    parts[0].toLowerCase();

  var args =
    parts.slice(1).join(' ');


  switch (command) {


    // -----------------------------------------------------
    // HELP
    // -----------------------------------------------------

    case '--help':
    case '-help':
    case 'help':

      return (
        '<span class="text-pda-cyan font-bold">' +
        'Available Commands:' +
        '</span>\n' +

        '  <span class="text-pda-amber">whoami</span>' +
        '        Display operator identity\n' +

        '  <span class="text-pda-amber">skills</span>' +
        '        List technical capabilities\n' +

        '  <span class="text-pda-amber">contact</span>' +
        '       Show contact channels\n' +

        '  <span class="text-pda-amber">ls</span>' +
        '            List available sections\n' +

        '  <span class="text-pda-amber">cd</span>' +
        ' &lt;section&gt;  Navigate to a section\n' +

        '  <span class="text-pda-amber">neofetch</span>' +
        '      System information\n' +

        '  <span class="text-pda-amber">uptime</span>' +
        '        Time since boot\n' +

        '  <span class="text-pda-amber">date</span>' +
        '          Current date and time\n' +

        '  <span class="text-pda-amber">echo</span>' +
        ' &lt;text&gt;   Echo text back\n' +

        '  <span class="text-pda-amber">clear</span>' +
        '         Clear terminal output\n' +

        '  <span class="text-pda-amber">secret</span>' +
        '        ???\n' +

        '  <span class="text-pda-amber">--help</span>' +
        '        Show this help message'
      );


    // -----------------------------------------------------
    // WHOAMI
    // -----------------------------------------------------

    case 'whoami':

      return (
        '<span class="text-pda-cyan font-bold">' +
        'SADOTIB' +
        '</span> // Software Engineer & Systems Architect\n' +

        '<span class="text-pda-muted">' +
        'Building robust distributed systems and hypermedia experiences.' +
        '</span>'
      );


    // -----------------------------------------------------
    // SKILLS
    // -----------------------------------------------------

    case 'skills':

      return (
        '<span class="text-pda-amber font-bold">' +
        'TECH_MATRIX:' +
        '</span>\n' +

        '  ├── Go, Python, JavaScript, Rust\n' +
        '  ├── PostgreSQL, Redis, Kafka, ClickHouse\n' +
        '  ├── Docker, Kubernetes, Linux\n' +
        '  ├── HTMX, Templ, gRPC, Protobuf\n' +
        '  └── TLS/mTLS, OAuth2, CI/CD Pipelines'
      );


    // -----------------------------------------------------
    // CONTACT
    // -----------------------------------------------------

    case 'contact':

      return (
        '<span class="text-pda-green font-bold">' +
        'CONTACT_CHANNELS:' +
        '</span>\n' +

        '  ├── WEB:    ' +

        '<span class="text-pda-cyan">' +
        'sadotib.in' +
        '</span>\n' +

        '  ├── GITHUB: ' +

        '<span class="text-pda-cyan">' +
        'github.com/sadotib' +
        '</span>\n' +

        '  └── EMAIL:  ' +

        '<span class="text-pda-cyan">' +
        'hello@sadotib.in' +
        '</span>'
      );


    // -----------------------------------------------------
    // LS
    // -----------------------------------------------------

    case 'ls':

      return (
        '  about/\n' +
        '  experience/\n' +
        '  education/\n' +
        '  projects/\n' +
        '  blog/\n' +
        '  misc/'
      );


    // -----------------------------------------------------
    // CD
    // -----------------------------------------------------

    case 'cd':

      if (!args) {

        return (
          '<span class="text-pda-red">' +
          'Usage:' +
          '</span> cd &lt;section&gt;\n' +

          '<span class="text-pda-muted">' +
          'Available: about, experience, education, projects, blog, misc' +
          '</span>'
        );
      }


      var section =
        args
          .replace(/\//g, '')
          .toLowerCase();


      var valid = [
        'about',
        'experience',
        'education',
        'projects',
        'blog',
        'misc'
      ];


      if (
        valid.indexOf(section) !== -1
      ) {

        navigateToTab(section);

        return (
          '<span class="text-pda-green">' +
          'Navigating to ' +
          section.toUpperCase() +
          '...' +
          '</span>'
        );
      }


      return (
        '<span class="text-pda-red">' +
        'ERROR:' +
        '</span> Section \'' +
        escapeHtml(args) +
        '\' not found. Use \'ls\' to list sections.'
      );


    // -----------------------------------------------------
    // NEOFETCH
    // -----------------------------------------------------

    case 'neofetch':

      return (
        '<span class="text-pda-cyan">' +

        '  ██████╗  ██████╗   █████╗ \n' +
        '  ██╔══██╗  ██╔══██╗  ██╔══██╗\n' +
        '  ██████╔╝  ██║  ██║  ███████║\n' +
        '  ██╔═══╝   ██║  ██║  ██╔══██║\n' +
        '  ██║       ██████╔╝  ██║  ██║\n' +
        '  ╚═╝       ╚═════╝   ╚═╝  ╚═╝' +

        '</span>\n' +

        '  <span class="text-pda-amber">' +
        'OS:' +
        '</span>      PDA-7X // AalBaalOS v2.0\n' +

        '  <span class="text-pda-amber">' +
        'KERNEL:' +
        '</span>  Go 1.26 / Templ / HTMX\n' +

        '  <span class="text-pda-amber">' +
        'UPTIME:' +
        '</span>  ' +
        getUptime() +
        '\n' +

        '  <span class="text-pda-amber">' +
        'SHELL:' +
        '</span>   pda-term v1.0\n' +

        '  <span class="text-pda-amber">' +
        'MEMORY:' +
        '</span>  Nai sob pahorilu\n' +

        '  <span class="text-pda-amber">' +
        'DOMAIN:' +
        '</span>  sadotib.in'
      );


    // -----------------------------------------------------
    // UPTIME
    // -----------------------------------------------------

    case 'uptime':

      return (
        '<span class="text-pda-green">' +
        'SYSTEM UPTIME:' +
        '</span> ' +
        getUptime()
      );


    // -----------------------------------------------------
    // DATE
    // -----------------------------------------------------

    case 'date':

      var now =
        new Date();

      return (
        '<span class="text-pda-cyan">' +

        now.toLocaleString(
          'en-US',
          {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }
        ) +

        '</span>'
      );


    // -----------------------------------------------------
    // ECHO
    // -----------------------------------------------------

    case 'echo':

      return args
        ? escapeHtml(args)
        : '';


    // -----------------------------------------------------
    // SECRET
    // -----------------------------------------------------

    case 'secret':

      return (
        '<span class="text-pda-amber">' +
        '======= ACCESS GRANTED =======' +
        '</span>\n' +

        '<span class="text-pda-muted">' +
        'You found the easter egg!\n\n' +

        'This entire portfolio is a single Go binary.\n' +
        'No Node.js, no webpack, no npm install.\n' +
        'Just Go + Templ + HTMX.\n' +
        'The way the web was meant to be.' +

        '</span>\n' +

        '<span class="text-pda-amber">' +
        '==============================' +
        '</span>'
      );


    // -----------------------------------------------------
    // UNKNOWN COMMAND
    // -----------------------------------------------------

    default:

      return (
        '<span class="text-pda-red">' +
        'ERROR:' +
        '</span> Command \'' +
        escapeHtml(cmd) +
        '\' not recognized.\n' +

        '<span class="text-pda-muted">' +
        'Type \'--help\' for available commands.' +
        '</span>'
      );
  }
}


// =========================================================
// VOLUME WHEEL
// =========================================================

function initVolumeWheel() {

  var wheel =
    document.getElementById('volume-wheel');

  if (!wheel) return;


  var isDragging = false;
  var currentAngle = 0;
  var startY = 0;


  // -------------------------------------------------------
  // Apply wheel transform
  // -------------------------------------------------------

  /*
   * Keep translateX(-50%) here.
   *
   * This prevents the volume wheel from shifting horizontally
   * when its rotation changes.
   */

  function updateWheelTransform() {

    wheel.style.transform =
      'translateX(-50%) rotate(' +
      currentAngle +
      'deg)';
  }


  // -------------------------------------------------------
  // Mouse
  // -------------------------------------------------------

  wheel.addEventListener(
    'mousedown',
    function (e) {

      isDragging = true;
      startY = e.clientY;

      e.preventDefault();
    }
  );


  document.addEventListener(
    'mousemove',
    function (e) {

      if (!isDragging) return;


      var delta =
        startY - e.clientY;


      currentAngle =
        Math.max(
          -150,
          Math.min(
            150,
            currentAngle +
              delta * 0.8
          )
        );


      updateWheelTransform();

      startY = e.clientY;
    }
  );


  document.addEventListener(
    'mouseup',
    function () {

      isDragging = false;
    }
  );


  // -------------------------------------------------------
  // Touch
  // -------------------------------------------------------

  wheel.addEventListener(
    'touchstart',
    function (e) {

      isDragging = true;

      startY =
        e.touches[0].clientY;

      e.preventDefault();
    }
  );


  document.addEventListener(
    'touchmove',
    function (e) {

      if (!isDragging) return;


      var delta =
        startY -
        e.touches[0].clientY;


      currentAngle =
        Math.max(
          -150,
          Math.min(
            150,
            currentAngle +
              delta * 0.8
          )
        );


      updateWheelTransform();

      startY =
        e.touches[0].clientY;
    }
  );


  document.addEventListener(
    'touchend',
    function () {

      isDragging = false;
    }
  );
}


// =========================================================
// MUSIC SYSTEM
// =========================================================

function initMusicToggle() {

  var audio =
    document.getElementById('bg-music');

  var deviceButton =
    document.getElementById('music-toggle');

  var player =
    document.getElementById('pda-music-player');

  var playerButton =
    document.getElementById('music-player-play');

  var playerIcon =
    document.getElementById('music-player-play-icon');

  var playerStatus =
    document.getElementById('music-player-status');

  var progress =
    document.getElementById('music-progress');

  var currentTime =
    document.getElementById('music-current-time');

  var duration =
    document.getElementById('music-duration');

  var volume =
    document.getElementById('music-volume');

  var volumeValue =
    document.getElementById('music-volume-value');

  var muteButton =
    document.getElementById('music-player-mute');

  var volumeIcon =
    document.getElementById('music-player-volume-icon');


  if (!audio) return;


  var led =
    deviceButton
      ? deviceButton.querySelector('.music-led')
      : null;


  var lastVolume = 0.5;


  // -------------------------------------------------------
  // TIME FORMAT
  // -------------------------------------------------------

  function formatTime(seconds) {

    if (!isFinite(seconds)) {
      return '00:00';
    }


    var minutes =
      Math.floor(seconds / 60);

    var secs =
      Math.floor(seconds % 60);


    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(secs).padStart(2, '0')
    );
  }


  // -------------------------------------------------------
  // UPDATE ENTIRE UI
  // -------------------------------------------------------

  function updateMusicUI() {

    var playing =
      !audio.paused;


    // -----------------------------------------------------
    // DEVICE AUDIO BUTTON
    // -----------------------------------------------------

    if (deviceButton) {

      deviceButton.classList.toggle(
        'music-active',
        playing
      );


      deviceButton.setAttribute(
        'aria-label',
        playing
          ? 'Pause ambient audio'
          : 'Play ambient audio'
      );


      deviceButton.setAttribute(
        'title',
        playing
          ? 'Pause ambient audio'
          : 'Play ambient audio'
      );
    }


    // -----------------------------------------------------
    // DEVICE LED
    // -----------------------------------------------------

    if (led) {

      led.classList.toggle(
        'led-green',
        playing
      );


      led.classList.toggle(
        'led-red',
        !playing
      );
    }


    // -----------------------------------------------------
    // PLAYER
    // -----------------------------------------------------

    if (player) {

      player.classList.toggle(
        'music-playing',
        playing
      );
    }


    if (playerIcon) {

      playerIcon.textContent =
        playing
          ? 'Ⅱ'
          : '▶';
    }


    if (playerStatus) {

      playerStatus.textContent =
        playing
          ? 'PLAYING'
          : 'STANDBY';
    }


    // -----------------------------------------------------
    // PROGRESS
    // -----------------------------------------------------

    if (progress) {

      if (audio.duration) {

        progress.value =
          (audio.currentTime / audio.duration) * 100;

      } else {

        progress.value = 0;
      }
    }


    if (currentTime) {

      currentTime.textContent =
        formatTime(audio.currentTime);
    }


    if (duration) {

      duration.textContent =
        formatTime(audio.duration);
    }


    // -----------------------------------------------------
    // VOLUME
    // -----------------------------------------------------

    if (volume) {

      volume.value =
        audio.volume;
    }


    if (volumeValue) {

      volumeValue.textContent =
        Math.round(audio.volume * 100);
    }


    // -----------------------------------------------------
    // VOLUME ICON
    // -----------------------------------------------------

    if (volumeIcon) {

      if (audio.muted || audio.volume === 0) {

        volumeIcon.textContent = 'MUTE';

      } else if (audio.volume < 0.5) {

        volumeIcon.textContent = 'VOL';

      } else {

        volumeIcon.textContent = 'VOL+';
      }
    }
  }


  // -------------------------------------------------------
  // DEVICE AUDIO BUTTON
  // -------------------------------------------------------

  if (deviceButton) {

    deviceButton.addEventListener(
      'click',
      function () {

        if (audio.paused) {

          audio.play().catch(function (error) {

            console.warn(
              'PDA audio could not start:',
              error
            );

          });

        } else {

          audio.pause();
        }

      }
    );
  }


  // -------------------------------------------------------
  // PLAYER PLAY BUTTON
  // -------------------------------------------------------

  if (playerButton) {

    playerButton.addEventListener(
      'click',
      function () {

        if (audio.paused) {

          audio.play().catch(function (error) {

            console.warn(
              'PDA audio could not start:',
              error
            );

          });

        } else {

          audio.pause();
        }

      }
    );
  }


  // -------------------------------------------------------
  // PROGRESS SEEKING
  // -------------------------------------------------------

  if (progress) {

    progress.addEventListener(
      'input',
      function () {

        if (!audio.duration) return;


        var percentage =
          Number(progress.value) / 100;


        audio.currentTime =
          audio.duration * percentage;

      }
    );
  }


  // -------------------------------------------------------
  // VOLUME
  // -------------------------------------------------------

  if (volume) {

    volume.addEventListener(
      'input',
      function () {

        var newVolume =
          Number(volume.value);


        audio.volume =
          newVolume;


        audio.muted =
          newVolume === 0;


        if (newVolume > 0) {

          lastVolume =
            newVolume;
        }


        updateMusicUI();

      }
    );
  }


  // -------------------------------------------------------
  // MUTE
  // -------------------------------------------------------

  if (muteButton) {

    muteButton.addEventListener(
      'click',
      function () {

        if (audio.muted || audio.volume === 0) {

          audio.muted = false;


          audio.volume =
            lastVolume > 0
              ? lastVolume
              : 0.5;

        } else {

          lastVolume =
            audio.volume;

          audio.muted = true;
        }


        updateMusicUI();

      }
    );
  }


  // -------------------------------------------------------
  // AUDIO EVENTS
  // -------------------------------------------------------

  audio.addEventListener(
    'play',
    updateMusicUI
  );


  audio.addEventListener(
    'pause',
    updateMusicUI
  );


  audio.addEventListener(
    'loadedmetadata',
    updateMusicUI
  );


  audio.addEventListener(
    'timeupdate',
    updateMusicUI
  );


  audio.addEventListener(
    'volumechange',
    updateMusicUI
  );


  audio.addEventListener(
    'ended',
    updateMusicUI
  );


  // -------------------------------------------------------
  // INITIAL STATE
  // -------------------------------------------------------

  audio.volume = 0.5;

  lastVolume = 0.5;

  updateMusicUI();
}

// =========================================================
// POWER BUTTON
// =========================================================

function initPowerButton() {

  var powerButton =
    document.getElementById(
      'power-button'
    );

  if (!powerButton) return;


  var screen =
    document.querySelector(
      '.screen-interface'
    );

  if (!screen) return;


  var isPoweredOn = true;
  var isAnimating = false;


  powerButton.addEventListener(
    'click',
    function () {

      // Prevent double clicks during animation.
      if (isAnimating) return;

      isAnimating = true;


      // ---------------------------------------------------
      // POWER OFF
      // ---------------------------------------------------

      if (isPoweredOn) {

        powerButton.classList.add(
          'power-animating'
        );

        powerButton.classList.add(
          'power-pressed'
        );


        // Make sure the screen starts from its
        // normal powered state.

        screen.classList.remove(
          'pda-screen-off'
        );

        screen.classList.remove(
          'pda-powering-on'
        );


        /*
         * Force browser reflow.
         *
         * This is important because otherwise the browser
         * may optimise consecutive class changes and skip
         * the CRT animation when powering on/off repeatedly.
         */

        void screen.offsetWidth;


        // Start CRT shutdown.
        screen.classList.add(
          'pda-powering-off'
        );


        // Disable screen interaction immediately.
        screen.style.pointerEvents =
          'none';


        isPoweredOn = false;


        /*
         * After the 720ms shutdown animation finishes,
         * leave the LCD completely black.
         */

        setTimeout(
          function () {

            screen.classList.remove(
              'pda-powering-off'
            );

            screen.classList.add(
              'pda-screen-off'
            );


            powerButton.classList.remove(
              'power-animating'
            );


            isAnimating = false;

          },
          720
        );


        return;
      }


      // ---------------------------------------------------
      // POWER ON
      // ---------------------------------------------------

      powerButton.classList.add(
        'power-animating'
      );


      /*
       * Remove the dead-screen state first.
       */

      screen.classList.remove(
        'pda-screen-off'
      );

      screen.classList.remove(
        'pda-powering-off'
      );


      /*
       * Force a reflow so the animation starts
       * from scaleY(0).
       */

      void screen.offsetWidth;


      // Start CRT startup.
      screen.classList.add(
        'pda-powering-on'
      );


      // Keep LCD locked while powering up.
      screen.style.pointerEvents =
        'none';


      isPoweredOn = true;


      /*
       * Power-on animation duration:
       * 520ms
       */

      setTimeout(
        function () {

          screen.classList.remove(
            'pda-powering-on'
          );


          screen.style.pointerEvents =
            '';


          powerButton.classList.remove(
            'power-pressed'
          );

          powerButton.classList.remove(
            'power-animating'
          );


          isAnimating = false;

        },
        520
      );

    }
  );
}