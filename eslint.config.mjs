import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
	{
		ignores: ["build/**", "node_modules/**", "out/**"],
	},
	js.configs.recommended,
	{
		files: ["**/*.{js,jsx,mjs,cjs}"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
			sourceType: "module",
		},
		plugins: {
			"react-hooks": reactHooks,
		},
		rules: {
			"no-case-declarations": "error",
			"no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^React$" }],
			"react-hooks/exhaustive-deps": "error",
			"react-hooks/rules-of-hooks": "error",
		},
	},
	{
		files: ["src/**/*.test.{js,jsx}"],
		languageOptions: {
			globals: globals.vitest,
		},
	},
];
