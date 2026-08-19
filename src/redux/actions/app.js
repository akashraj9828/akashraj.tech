export const TOGGLE_THEME = "TOGGLE_THEME";
export const APPLY_THEME = "APPLY_THEME";
export const RESET_THEME = "RESET_THEME";
export const SET_ERROR = "SET_ERROR";
export const RESET_ERROR = "RESET_ERROR";
export const SET_VALIDATION_ERROR = "SET_VALIDATION_ERROR";
export const RESET_VALIDATION_ERROR = "RESET_VALIDATION_ERROR";
export const TOGGLE_HELP = "TOGGLE_HELP";

export const toggleTheme = () => ({ type: TOGGLE_THEME });
export const applyTheme = (value) => ({ type: APPLY_THEME, value });
export const resetTheme = () => ({ type: RESET_THEME });

export const setError = (value) => ({ type: SET_ERROR, value });
export const setValidationError = (value) => ({ type: SET_VALIDATION_ERROR, value });
export const resetValidationError = () => ({ type: RESET_VALIDATION_ERROR });
export const resetError = () => ({ type: RESET_ERROR });
export function toggleHelp() {
	return { type: TOGGLE_HELP };
}
