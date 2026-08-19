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
	{ name: "Mono Blueprint", ...defaultThemes.dark, colors: { canvas: "#111111", surface: "#1b1b1b", text: "#f5f5f5", mutedText: "#a3a3a3", accent: "#ffffff", accentContrast: "#111111" }, shape: { radiusScale: 0 }, depth: { shadowStrength: 0.35 } },
	{ name: "Signal Noir", ...defaultThemes.dark, colors: { canvas: "#0b0d10", surface: "#161a20", text: "#f8fafc", mutedText: "#9aa6b2", accent: "#ffcc00", accentContrast: "#111111" }, shape: { radiusScale: 0 }, depth: { shadowStrength: 0.8 } },
	{ name: "Cobalt Editorial", ...defaultThemes.light, colors: { canvas: "#f3f6fb", surface: "#ffffff", text: "#12233f", mutedText: "#62718b", accent: "#4f67e8", accentContrast: "#ffffff" }, shape: { radiusScale: 0.35 }, layout: { density: 0.96 }, depth: { shadowStrength: 0.55 } },
	{ name: "Mint Modern", ...defaultThemes.light, colors: { canvas: "#effaf5", surface: "#ffffff", text: "#15352a", mutedText: "#58756a", accent: "#16a36a", accentContrast: "#ffffff" }, shape: { radiusScale: 0.8 }, depth: { shadowStrength: 0.45 } },
	{ name: "Sunset Terminal", ...defaultThemes.dark, colors: { canvas: "#1a1017", surface: "#251724", text: "#fff3f5", mutedText: "#c4a6b0", accent: "#ff6b6b", accentContrast: "#2b1014" }, shape: { radiusScale: 0.45 }, typography: { scale: 1.02 } },
	{ name: "Electric Violet", ...defaultThemes.dark, colors: { canvas: "#110d1d", surface: "#1c1530", text: "#f8f2ff", mutedText: "#b7a8c9", accent: "#b879ff", accentContrast: "#1c0d2f" }, shape: { radiusScale: 0.65 }, depth: { shadowStrength: 0.9 } },
	{ name: "Ink & Paper", ...defaultThemes.light, colors: { canvas: "#f6f3ee", surface: "#fffefa", text: "#1f211f", mutedText: "#72736d", accent: "#1f211f", accentContrast: "#fffefa" }, shape: { radiusScale: 0.15 }, depth: { shadowStrength: 0.25 } },
	{ name: "Tangerine Pop", ...defaultThemes.light, colors: { canvas: "#fff7ed", surface: "#fffdf9", text: "#302116", mutedText: "#856a58", accent: "#f97316", accentContrast: "#ffffff" }, shape: { radiusScale: 1.3 }, typography: { scale: 1.03 }, depth: { shadowStrength: 0.65 } },
	{ name: "Bubblegum Arcade", ...defaultThemes.dark, colors: { canvas: "#21162b", surface: "#30203d", text: "#fff7ff", mutedText: "#cbb5d2", accent: "#ff6ec7", accentContrast: "#29112b" }, shape: { radiusScale: 1.5 }, layout: { density: 1.04 }, depth: { shadowStrength: 0.95 }, motion: { scale: 1.15 } },
	{ name: "Moss & Lime", ...defaultThemes.dark, colors: { canvas: "#0f1b17", surface: "#172821", text: "#f1fff7", mutedText: "#a9c4b3", accent: "#5ee39b", accentContrast: "#082014" }, shape: { radiusScale: 0.8 }, layout: { density: 0.94 }, depth: { shadowStrength: 0.6 } },
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

const faviconAPath = "m 327.4415,-53.928 h -10.584 l -12.132,33.372 h 27.072 l -9.648,-26.532 -7.056,19.404 h 3.204 l 3.852,-10.548 5.328,14.652 h -18.432 l 9.936,-27.324 h 6.336 l 17.424,47.88 h -4.608 l -4.86,-13.428 h -30.06 L 297.2375,0 h 11.016 l 3.384,-9.324 h -3.204 l -2.304,6.3 h -4.572 l 3.78,-10.404 h 25.812 L 336.0095,0 h 11.052 z";
const faviconATransform = "translate(0 314.3566) translate(70.05000000000001 34.613600000000005) scale(1.3) translate(-297.2375 53.928)";
const faviconLuminance = (value) => {
	const hex = cssColor(value).slice(1);
	const channels = [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
	return channels.reduce((total, channel, index) => total + (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4) * [0.2126, 0.7152, 0.0722][index], 0);
};

const updateFavicon = (theme) => {
	const favicon = document.querySelector('link[rel="icon"]') || document.head.appendChild(Object.assign(document.createElement("link"), { rel: "icon" }));
	const accent = cssColor(theme.colors.accent);
	const needsBackground = faviconLuminance(accent) > 0.55;
	const background = needsBackground ? `<rect x="60" y="340" width="85" height="85" rx="12" fill="${cssColor(theme.colors.canvas)}"/>` : "";
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="60 340 85 85">${background}<path d="${faviconAPath}" transform="${faviconATransform}" fill="${accent}"/><path d="M70 422H135" stroke="${accent}" stroke-width="3" stroke-linecap="round"/></svg>`;
	favicon.setAttribute("type", "image/svg+xml");
	favicon.setAttribute("href", `data:image/svg+xml,${encodeURIComponent(svg)}`);
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
		"--theme-focus": cssColor(theme.colors.accent),
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
	updateFavicon(theme);
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
