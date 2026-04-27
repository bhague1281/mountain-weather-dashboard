export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const THEME_STORAGE_KEY = "mountain-dashboard-theme";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "system" || value === "light" || value === "dark";
}

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);

  return isThemeMode(storedThemeMode) ? storedThemeMode : "system";
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function persistThemeMode(themeMode: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  if (themeMode === "system") {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
}

export function applyTheme(
  themeMode: ThemeMode,
  resolvedTheme: ResolvedTheme = themeMode === "system"
    ? getSystemTheme()
    : themeMode,
) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.style.colorScheme = resolvedTheme;
  root.dataset.theme = resolvedTheme;
}
