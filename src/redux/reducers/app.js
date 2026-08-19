import { default_state } from "../default_state";
import { SET_ERROR, RESET_ERROR, TOGGLE_THEME, APPLY_THEME, RESET_THEME, TOGGLE_HELP, SET_VALIDATION_ERROR, RESET_VALIDATION_ERROR } from "./../actions/app";
import { applyThemeToDocument, defaultThemes, persistTheme, sanitizeTheme } from "../../logic/theme/theme";
export default function app(state = default_state.app, action) {
	const { type, value } = action;
	switch (type) {
		case SET_VALIDATION_ERROR: {
			let updated_error = value;
			// if there are existing validation errors push these too
			if (state.validationError) {
				updated_error = [...state.validationError, ...value];
			}
			return { ...state, validationError: updated_error };
		}
		case RESET_VALIDATION_ERROR:
			return { ...state, validationError: null };
		case TOGGLE_HELP:
			return { ...state, help: !state.help };

		case TOGGLE_THEME: {
			const new_theme = state.theme === "dark" ? "light" : "dark";
			const current = state.themeConfig || defaultThemes[state.theme];
			const isDefault = JSON.stringify(sanitizeTheme(current)) === JSON.stringify(sanitizeTheme(defaultThemes[state.theme]));
			const updated = sanitizeTheme(isDefault ? defaultThemes[new_theme] : { ...current, mode: new_theme });
			applyThemeToDocument(updated);
			persistTheme(updated);
			return { ...state, theme: new_theme, themeConfig: updated };
		}
		case APPLY_THEME: {
			const updated = applyThemeToDocument(value);
			persistTheme(updated);
			return { ...state, theme: updated.mode, themeConfig: updated };
		}
		case RESET_THEME: {
			const updated = applyThemeToDocument(defaultThemes.dark);
			try {
				window.localStorage.removeItem("page_theme");
				window.localStorage.removeItem("theme_experiment");
			} catch {
				// Ignore unavailable storage.
			}
			return { ...state, theme: updated.mode, themeConfig: updated };
		}
		case SET_ERROR:
			return { ...state, error: value };
		case RESET_ERROR:
			return { ...state, error: null };

		default:
			return state;
	}
}
