export default {
	"*.{js,jsx,mjs,cjs}": ["prettier --write", "eslint --fix"],
	"*.{css,html,json,md,scss,yaml,yml}": "prettier --write",
	"*": "node scripts/update-staged-screenshots.mjs",
};
