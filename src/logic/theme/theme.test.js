import { beforeEach, expect, test } from "vitest";
import { applyThemeToDocument, defaultThemes, randomTheme, sanitizeTheme } from "./theme";

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
	applyThemeToDocument(defaultThemes.light);
	expect(document.documentElement.classList.contains("light")).toBe(true);
	expect(document.documentElement.classList.contains("dark")).toBe(false);
	expect(document.documentElement.style.getPropertyValue("--theme-canvas")).toBe("#ffffff");
	expect(document.documentElement.style.getPropertyValue("--theme-focus")).toBe("#ef596f");
	expect(document.documentElement.style.getPropertyValue("--theme-radius-card")).toBe("0.75rem");
});

test("random themes are selected from curated presets", () => {
	const theme = randomTheme({ name: "Mono Blueprint" });
	expect(theme.name).not.toBe("Mono Blueprint");
	expect(theme.colors.accent).toMatch(/^#[\da-f]{6}$/i);
});
