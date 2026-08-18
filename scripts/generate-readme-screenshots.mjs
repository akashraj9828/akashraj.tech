import { spawn } from "node:child_process";
import { copyFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "@playwright/test";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(rootDirectory, "out");
const stagingDirectory = "/tmp/playwright-screenshot/akashraj-tech-readme";
const host = "127.0.0.1";
const port = 43203;
const baseURL = `http://${host}:${port}`;

const viewports = {
	desktop: { width: 1440, height: 900 },
	phone: { width: 360, height: 640 },
};

const githubProfile = { public_repos: 42, followers: 128 };
const githubRepositories = [
	{ id: 1, name: "akashraj.tech", description: "Personal website and digital garden.", html_url: "https://github.com/akashraj9828/akashraj.tech", stargazers_count: 48, forks_count: 7, language: "JavaScript", fork: false, pushed_at: "2026-07-12T10:00:00Z" },
	{ id: 2, name: "information-universe", description: "Explore Wikipedia as an interactive universe.", html_url: "https://github.com/akashraj9828/information-universe", stargazers_count: 31, forks_count: 5, language: "JavaScript", fork: false, pushed_at: "2026-06-28T10:00:00Z" },
	{ id: 3, name: "lorenz-attractor", description: "Generative Lorenz attractor experiments.", html_url: "https://github.com/akashraj9828/lorenz-attractor", stargazers_count: 24, forks_count: 3, language: "Python", fork: false, pushed_at: "2026-05-09T10:00:00Z" },
	{ id: 4, name: "co-draw", description: "A collaborative drawing experiment.", html_url: "https://github.com/akashraj9828/co-draw", stargazers_count: 18, forks_count: 4, language: "TypeScript", fork: false, pushed_at: "2026-04-15T10:00:00Z" },
	{ id: 5, name: "svg-text-animation", description: "Create standalone animated SVG lettering.", html_url: "https://github.com/akashraj9828/svg-text-animation", stargazers_count: 15, forks_count: 2, language: "JavaScript", fork: false, pushed_at: "2026-03-21T10:00:00Z" },
	{ id: 6, name: "asteroids", description: "A small browser game and rendering study.", html_url: "https://github.com/akashraj9828/asteroids", stargazers_count: 11, forks_count: 1, language: "C++", fork: false, pushed_at: "2026-02-02T10:00:00Z" },
];
const contributions = Array.from({ length: 53 }, (_, week) =>
	Array.from({ length: 7 }, (_, day) => {
		const index = week * 7 + day;
		const intensity = (week * 3 + day * 2) % 5;
		return {
			count: intensity === 0 ? 0 : intensity + ((week + day) % 3),
			date: new Date(Date.UTC(2025, 7, 17 + index)).toISOString().slice(0, 10),
			intensity,
		};
	}),
);
const contributionCalendar = {
	contributions,
	total: contributions.flat().reduce((total, day) => total + day.count, 0),
};

const captures = [
	{ name: "Home_pc_dark.png", path: "/", theme: "dark", viewport: "desktop" },
	{ name: "Home_pc_light.png", path: "/", theme: "light", viewport: "desktop" },
	{ name: "Home_phone_dark.png", path: "/", theme: "dark", viewport: "phone" },
	{ name: "Home_phone_light.png", path: "/", theme: "light", viewport: "phone" },
	{ name: "Work_pc_dark.png", path: "/work", theme: "dark", viewport: "desktop" },
	{ name: "Work_pc_light.png", path: "/work", theme: "light", viewport: "desktop" },
	{ name: "Work_phone_dark.png", path: "/work", theme: "dark", viewport: "phone" },
	{ name: "Work_phone_light.png", path: "/work", theme: "light", viewport: "phone" },
	{ name: "Contact_pc_dark.png", path: "/contact", theme: "dark", viewport: "desktop" },
	{ name: "Contact_pc_light.png", path: "/contact", theme: "light", viewport: "desktop" },
	{ name: "Contact_phone_dark.png", path: "/contact", theme: "dark", viewport: "phone" },
	{ name: "Contact_phone_light.png", path: "/contact", theme: "light", viewport: "phone" },
	{ name: "Resume_pc_dark.png", path: "/resume", theme: "dark", viewport: "desktop" },
	{ name: "Resume_pc_light.png", path: "/resume", theme: "light", viewport: "desktop" },
	{ name: "Resume_phone_dark.png", path: "/resume", theme: "dark", viewport: "phone" },
	{ name: "Resume_phone_light.png", path: "/resume", theme: "light", viewport: "phone" },
	{ name: "Stats_pc_dark.png", path: "/stats", theme: "dark", viewport: "desktop", readySelector: "#stats .stats-content" },
	{ name: "Stats_pc_light.png", path: "/stats", theme: "light", viewport: "desktop", readySelector: "#stats .stats-content" },
	{ name: "Stats_phone_dark.png", path: "/stats", theme: "dark", viewport: "phone", readySelector: "#stats .stats-content" },
	{ name: "Stats_phone_light.png", path: "/stats", theme: "light", viewport: "phone", readySelector: "#stats .stats-content" },
	{ name: "Phone_nav_dark.png", path: "/", theme: "dark", viewport: "phone", openNavigation: true },
	{ name: "Phone_nav_light.png", path: "/", theme: "light", viewport: "phone", openNavigation: true },
];

const waitForServer = async (server) => {
	const deadline = Date.now() + 30_000;
	while (Date.now() < deadline) {
		if (server.exitCode !== null) throw new Error(`Vite exited with code ${server.exitCode}`);
		try {
			const response = await fetch(baseURL);
			if (response.ok) return;
		} catch {
			// Vite has not started listening yet.
		}
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
	throw new Error(`Timed out waiting for ${baseURL}`);
};

const waitForStablePage = async (page, readySelector = "#main main") => {
	await page.locator(readySelector).waitFor({ state: "visible" });
	await page.evaluate(async () => {
		await document.fonts.ready;
		await Promise.all(
			[...document.images]
				.filter((image) => !image.complete)
				.map(
					(image) =>
						new Promise((resolve) => {
							image.addEventListener("load", resolve, { once: true });
							image.addEventListener("error", resolve, { once: true });
						}),
				),
		);
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	});
	await page.addStyleTag({
		content: `
		*, *::before, *::after {
			animation: none !important;
			caret-color: transparent !important;
			transition: none !important;
		}
	`,
	});
};

await rm(stagingDirectory, { force: true, recursive: true });
await mkdir(stagingDirectory, { recursive: true });
await mkdir(outputDirectory, { recursive: true });

const vite = spawn(process.platform === "win32" ? "yarn.cmd" : "yarn", ["vite", "--host", host, "--port", String(port), "--strictPort"], { cwd: rootDirectory, stdio: "inherit" });

let browser;
try {
	await waitForServer(vite);
	browser = await chromium.launch({ headless: true });

	for (const capture of captures) {
		const context = await browser.newContext({
			colorScheme: capture.theme,
			deviceScaleFactor: 1,
			locale: "en-US",
			reducedMotion: "reduce",
			serviceWorkers: "block",
			timezoneId: "Asia/Kolkata",
			viewport: viewports[capture.viewport],
		});
		await context.addInitScript((theme) => {
			window.localStorage.clear();
			window.localStorage.setItem("page_theme", theme);
			window.localStorage.setItem("interface_sounds_enabled", "false");
		}, capture.theme);

		const page = await context.newPage();
		await page.route("**/*", async (route) => {
			const requestURL = new URL(route.request().url());
			if (requestURL.hostname === host) {
				await route.continue();
			} else if (requestURL.origin === "https://api.github.com" && requestURL.pathname.endsWith("/repos")) {
				await route.fulfill({ json: githubRepositories });
			} else if (requestURL.origin === "https://api.github.com") {
				await route.fulfill({ json: githubProfile });
			} else if (requestURL.origin === "https://gh-calendar.rschristian.dev") {
				await route.fulfill({ json: contributionCalendar });
			} else {
				await route.abort();
			}
		});
		await page.goto(`${baseURL}${capture.path}`, { waitUntil: "domcontentloaded" });
		await waitForStablePage(page, capture.readySelector);

		if (capture.openNavigation) {
			await page.getByRole("button", { name: "Open navigation menu" }).click();
			await page.locator("#mobile-navigation.is-open").waitFor({ state: "visible" });
		}

		const stagedPath = path.join(stagingDirectory, capture.name);
		await page.screenshot({ animations: "disabled", path: stagedPath, type: "png" });
		await copyFile(stagedPath, path.join(outputDirectory, capture.name));
		await context.close();
		console.log(`Updated out/${capture.name}`);
	}
} finally {
	await browser?.close();
	if (vite.exitCode === null) vite.kill("SIGTERM");
}
