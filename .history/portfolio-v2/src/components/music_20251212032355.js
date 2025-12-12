/**
 * Background music component
 * Manages audio playback with mute toggle and localStorage persistence
 */

export function initBackgroundMusic() {
    const audio = document.getElementById("bg-music");
    const button = document.getElementById("music-toggle");

    if (!audio || !button) return;

    // Initial state
    audio.volume = 0.3;
    audio.muted = true;

    const savedMuted = localStorage.getItem("music-muted") === "true";
    audio.muted = savedMuted;

    updateButton();

    // Start playback (allowed because muted)
    audio.play().catch(() => { });

    button.addEventListener("click", () => {
        audio.muted = !audio.muted;
        localStorage.setItem("music-muted", audio.muted);

        // Ensure playback after user gesture
        if (!audio.muted) {
            audio.play().catch(() => { });
        }

        updateButton();
    });

    function updateButton() {
        button.textContent = audio.muted ? "Unmute" : "Mute";
        button.setAttribute("aria-pressed", String(!audio.muted));
    }
}
