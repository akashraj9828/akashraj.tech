import { beforeEach, expect, test } from "vitest";
import reducer from "./app";
import { toggleTheme } from "../actions/app";

beforeEach(() => {
	document.documentElement.classList.remove("dark", "light");
	window.localStorage.clear();
});

test("theme changes leave exactly one root theme class", () => {
	document.documentElement.classList.add("dark", "light");
	const state = reducer({ theme: "dark" }, toggleTheme());
	expect(state.theme).toBe("light");
	expect(document.documentElement.classList.contains("dark")).toBe(false);
	expect(document.documentElement.classList.contains("light")).toBe(true);
	expect(window.localStorage.getItem("page_theme")).toBe("light");
});
