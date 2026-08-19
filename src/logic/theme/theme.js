export const THEME_STORAGE_KEY = "theme_experiment";

export const defaultThemes = {
	dark: {
		mode: "dark",
		colors: { canvas: "#181a1b", surface: "#202324", text: "#ffffff", mutedText: "#aeb3b6", accent: "#ef596f", accentContrast: "#ffffff" },
		shape: { radiusScale: 1 },
		layout: { density: 1 },
		typography: { scale: 1 },
		depth: { shadowStrength: 1 },
		motion: { scale: 1 },
	},
	light: {
		mode: "light",
		colors: { canvas: "#ffffff", surface: "#fafafa", text: "#000000", mutedText: "#626262", accent: "#ef596f", accentContrast: "#ffffff" },
		shape: { radiusScale: 1 },
		layout: { density: 1 },
		typography: { scale: 1 },
		depth: { shadowStrength: 1 },
		motion: { scale: 1 },
	},
};

export const themePresets = [
	{ name: "Coral Night", ...defaultThemes.dark },
	{ name: "Paper Coral", ...defaultThemes.light },
	{ name: "Ocean Terminal", ...defaultThemes.dark, colors: { ...defaultThemes.dark.colors, accent: "#39c6c8", accentContrast: "#061c20", surface: "#172d35" }, shape: { radiusScale: 0.7 } },
	{ name: "Lavender Signal", ...defaultThemes.light, colors: { ...defaultThemes.light.colors, accent: "#7657d8", accentContrast: "#ffffff", surface: "#f4f1ff" }, shape: { radiusScale: 1.25 }, depth: { shadowStrength: 0.7 } },
	{ name: "Green Circuit", ...defaultThemes.dark, colors: { ...defaultThemes.dark.colors, accent: "#89ca78", accentContrast: "#0d2110", surface: "#1d2b21" }, layout: { density: 0.94 }, typography: { scale: 0.98 } },
	{ name: "Warm Studio", ...defaultThemes.light, colors: { ...defaultThemes.light.colors, canvas: "#fff8f0", surface: "#fffdf9", text: "#33251f", mutedText: "#75645a", accent: "#c2723d", accentContrast: "#ffffff" }, shape: { radiusScale: 1.15 }, depth: { shadowStrength: 0.6 } },
];

const clone = (value) => JSON.parse(JSON.stringify(value));

export const normalizeTheme = (candidate) => {
	const fallback = defaultThemes[candidate?.mode === "light" ? "light" : "dark"];
	const source = candidate && typeof candidate === "object" ? candidate : {};
	return {
		...clone(fallback),
		...source,
		mode: source.mode === "light" ? "light" : "dark",
		colors: { ...fallback.colors, ...(source.colors || {}) },
		shape: { ...fallback.shape, ...(source.shape || {}) },
		layout: { ...fallback.layout, ...(source.layout || {}) },
		typography: { ...fallback.typography, ...(source.typography || {}) },
		depth: { ...fallback.depth, ...(source.depth || {}) },
		motion: { ...fallback.motion, ...(source.motion || {}) },
	};
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || min));

export const sanitizeTheme = (candidate) => {
	const theme = normalizeTheme(candidate);
	return {
		...theme,
		shape: { radiusScale: clamp(theme.shape.radiusScale, 0, 1.5) },
		layout: { density: clamp(theme.layout.density, 0.7, 1.3) },
		typography: { scale: clamp(theme.typography.scale, 0.92, 1.12) },
		depth: { shadowStrength: clamp(theme.depth.shadowStrength, 0, 1.4) },
		motion: { scale: clamp(theme.motion.scale, 0, 1.25) },
	};
};

const cssColor = (value) => {
	const color = String(value || "").trim();
	return /^#[\da-f]{6}$/i.test(color) ? color : "#ef596f";
};

export const applyThemeToDocument = (candidate) => {
	const theme = sanitizeTheme(candidate);
	const root = document.documentElement;
	root.classList.remove("dark", "light");
	root.classList.add(theme.mode);
	const vars = {
		"--theme-canvas": cssColor(theme.colors.canvas),
		"--theme-surface": cssColor(theme.colors.surface),
		"--theme-text": cssColor(theme.colors.text),
		"--theme-muted-text": cssColor(theme.colors.mutedText),
		"--theme-accent": cssColor(theme.colors.accent),
		"--theme-accent-contrast": cssColor(theme.colors.accentContrast),
		"--theme-radius-sm": `${0.25 * theme.shape.radiusScale}rem`,
		"--theme-radius-xs": `${0.15 * theme.shape.radiusScale}rem`,
		"--theme-radius-control": `${0.5 * theme.shape.radiusScale}rem`,
		"--theme-radius-card": `${0.75 * theme.shape.radiusScale}rem`,
		"--theme-radius-lg": `${1 * theme.shape.radiusScale}rem`,
		"--theme-density": theme.layout.density,
		"--theme-type-scale": theme.typography.scale,
		"--theme-shadow-strength": theme.depth.shadowStrength,
		"--theme-motion-scale": theme.motion.scale,
	};
	Object.entries(vars).forEach(([name, value]) => root.style.setProperty(name, value));
	const meta = document.querySelector('meta[name="theme-color"]');
	if (meta) meta.setAttribute("content", vars["--theme-canvas"]);
	return theme;
};

export const readStoredTheme = () => {
	try {
		const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
		if (stored) return sanitizeTheme(JSON.parse(stored));
		const legacy = window.localStorage.getItem("page_theme");
		return sanitizeTheme(defaultThemes[legacy === "light" ? "light" : "dark"]);
	} catch {
		return clone(defaultThemes.dark);
	}
};

export const persistTheme = (theme) => {
	try {
		const normalized = sanitizeTheme(theme);
		window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(normalized));
		window.localStorage.setItem("page_theme", normalized.mode);
	} catch {
		// A storage failure must never prevent the theme from applying.
	}
};

export const randomTheme = (current) => {
	const choices = themePresets.filter((preset) => preset.name !== current?.name);
	return clone(choices[Math.floor(Math.random() * choices.length)] || themePresets[0]);
};
