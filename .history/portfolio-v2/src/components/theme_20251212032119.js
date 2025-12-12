/**
 * Theme toggle component
 * Manages light/dark theme switching with localStorage persistence
 */

export function initThemeToggle() {
  const root = document.documentElement;
  const radios = document.querySelectorAll('input[name="theme"]');

  if (!radios.length) return;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    const active = document.querySelector(
      `input[name="theme"][value="${savedTheme}"]`
    );
    if (active) active.checked = true;
  } else {
    root.setAttribute("data-theme", "light");
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      root.setAttribute("data-theme", radio.value);
      localStorage.setItem("theme", radio.value);
    });
  });
}

export function getCurrentTheme() {
  return localStorage.getItem("theme") || "light";
}

export function setTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
