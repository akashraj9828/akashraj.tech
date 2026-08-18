import { execFileSync } from "node:child_process";

const stagedFiles = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR"], {
	encoding: "utf8",
})
	.trim()
	.split("\n")
	.filter(Boolean);

const affectsScreenshots = (file) => file === "index.html" || file === "vite.config.mjs" || file === "scripts/generate-readme-screenshots.mjs" || file.startsWith("public/") || (file.startsWith("src/") && !file.match(/\.test\.[cm]?[jt]sx?$/));

const relevantFiles = stagedFiles.filter(affectsScreenshots);

if (relevantFiles.length === 0) {
	console.log("No staged visual changes; README screenshots are current.");
	process.exit(0);
}

console.log(`Refreshing README screenshots for:\n${relevantFiles.map((file) => `  - ${file}`).join("\n")}`);

const yarn = process.platform === "win32" ? "yarn.cmd" : "yarn";
execFileSync(yarn, ["screenshots:readme"], { stdio: "inherit" });
execFileSync("git", ["add", "--", "out"], { stdio: "inherit" });
