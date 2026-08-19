import { beforeEach, expect, test } from "vitest";
import { applyThemeToDocument, createThemeShareUrl, defaultThemes, randomTheme, readThemeFromUrl, sanitizeTheme } from "./theme";

beforeEach(() => {
	document.documentElement.className = "";
	document.documentElement.removeAttribute("style");
});

test("sanitizes experimental values into safe ranges", () => {
	const theme = sanitizeTheme({ mode: "light", shape: { radiusScale: 9 }, motion: { scale: -2 } });
	expect(theme.mode).toBe("light");
	expect(theme.shape.radiusScale).toBe(1.5);
	expect(theme.motion.scale).toBe(0);
});

test("applies a complete theme to the document", () => {
	const favicon = document.createElement("link");
	favicon.setAttribute("rel", "icon");
	document.head.appendChild(favicon);
	applyThemeToDocument(defaultThemes.light);
	expect(document.documentElement.classList.contains("light")).toBe(true);
	expect(document.documentElement.classList.contains("dark")).toBe(false);
	expect(document.documentElement.style.getPropertyValue("--theme-canvas")).toBe("#ffffff");
	expect(document.documentElement.style.getPropertyValue("--theme-focus")).toBe("#ef596f");
	expect(document.documentElement.style.getPropertyValue("--theme-radius-card")).toBe("0.75rem");
	expect(document.querySelector('link[rel="icon"]').getAttribute("href")).toContain("%23ef596f");
});

test("random themes are selected from curated presets", () => {
	const theme = randomTheme({ name: "Mono Blueprint" });
	expect(theme.name).not.toBe("Mono Blueprint");
	expect(theme.colors.accent).toMatch(/^#[\da-f]{6}$/i);
});

test("round-trips a theme through a share URL", () => {
	const source = { ...defaultThemes.light, name: "Shared Mint", colors: { ...defaultThemes.light.colors, accent: "#16a36a" }, shape: { radiusScale: 0.8 } };
	const url = createThemeShareUrl(source, new URL("https://example.com/contact"));
	const shared = readThemeFromUrl(new URL(url));
	expect(url).toContain("theme=");
	expect(shared.name).toBe("Shared Mint");
	expect(shared.colors.accent).toBe("#16a36a");
	expect(shared.shape.radiusScale).toBe(0.8);
});

test("uses a short code when sharing an unchanged named preset", () => {
	const preset = {
		...defaultThemes.dark,
		name: "Signal Noir",
		colors: { ...defaultThemes.dark.colors, canvas: "#0b0d10", surface: "#161a20", text: "#f8fafc", mutedText: "#9aa6b2", accent: "#ffcc00", accentContrast: "#111111" },
		shape: { radiusScale: 0 },
		depth: { shadowStrength: 0.8 },
	};
	const url = createThemeShareUrl(preset, new URL("https://example.com/"));

	expect(new URL(url).searchParams.get("theme")).toBe("noir");
	expect(readThemeFromUrl(new URL(url)).name).toBe("Signal Noir");
});
