import { default_state } from "../default_state";
import { SET_ERROR, RESET_ERROR, TOGGLE_THEME, TOGGLE_HELP, SET_VALIDATION_ERROR, RESET_VALIDATION_ERROR } from "./../actions/app";
export default function app(state = default_state.app, action) {
	const { type, value } = action;
	switch (type) {
		case SET_VALIDATION_ERROR:
			let updated_error = value;
			// if there are existing validation errors push these too
			if (state.validationError) {
				updated_error = [...state.validationError, ...value];
			}
			return { ...state, validationError: updated_error };
		case RESET_VALIDATION_ERROR:
			return { ...state, validationError: null };
		case TOGGLE_HELP:
			return { ...state, help: !state.help };

		case TOGGLE_THEME:
			let new_theme = state.theme === "dark" ? "light" : "dark";
			try {
				document.body.parentElement.classList.remove(state.theme);
				document.body.parentElement.classList.add(new_theme);
				window.localStorage.setItem("page_theme", new_theme);
				if (new_theme === "dark") {
					document.querySelector('meta[name="theme-color"]').setAttribute("content", "#181a1b");
				} else {
					document.querySelector('meta[name="theme-color"]').setAttribute("content", "white");
				}
			} catch (error) {
				console.error(error);
			}
			return { ...state, theme: new_theme };
		case SET_ERROR:
			return { ...state, error: value };
		case RESET_ERROR:
			return { ...state, error: null };

		default:
			return state;
	}
}
