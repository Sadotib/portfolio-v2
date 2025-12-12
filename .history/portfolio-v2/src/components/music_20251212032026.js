/**
 * Background music component
 * Manages audio playback with mute toggle and localStorage persistence
 */

export function initBackgroundMusic() {
  const audio = document.getElementById("bg-music");
  const button = document.getElementById("music-toggle");

  if (!button) return;

  if (audio) {
    // Initial state
    audio.volume = 0.3;
    audio.muted = true;

    const savedMuted = localStorage.getItem("music-muted") === "true";
    audio.muted = savedMuted;

    // Start playback (allowed because muted)
    audio.play().catch(() => {});
  }

  updateButton();

  button.addEventListener("click", () => {
    if (audio) {
      audio.muted = !audio.muted;
      localStorage.setItem("music-muted", audio.muted);

      // Ensure playback after user gesture
      if (!audio.muted) {
        audio.play().catch(() => {});
      }
    }
    updateButton();
  });

  function updateButton() {
    button.textContent = audio.muted ? "Unmute" : "Mute";
    button.setAttribute("aria-pressed", String(!audio.muted));
  }
}

export function setMusicVolume(volume) {
  const audio = document.getElementById("bg-music");
  if (audio) {
    audio.volume = Math.max(0, Math.min(1, volume));
  }
}

export function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const button = document.getElementById("music-toggle");
  
  if (audio && button) {
    audio.muted = !audio.muted;
    localStorage.setItem("music-muted", audio.muted);
    button.textContent = audio.muted ? "Unmute" : "Mute";
    button.setAttribute("aria-pressed", String(!audio.muted));
  }
}
