import { createStore } from "redux";
import reducer from "./reducers";
import { default_state } from "./default_state";
import { applyThemeToDocument, persistTheme, readStoredTheme, readThemeFromUrl } from "../logic/theme/theme";
let inital_state = { ...default_state, app: { ...default_state.app }, user: { ...default_state.user } };
try {
	const sharedTheme = readThemeFromUrl();
	const storedTheme = sharedTheme || readStoredTheme();
	applyThemeToDocument(storedTheme);
	if (sharedTheme) persistTheme(sharedTheme);
	inital_state.app.theme = storedTheme.mode;
	inital_state.app.themeConfig = storedTheme;
	let old_data = window.localStorage.getItem("userInfo");
	if (old_data) {
		let userInfo = JSON.parse(old_data);
		if (userInfo.status === "success") {
			inital_state.user = userInfo;
		}
	}
} catch (error) {
	console.error(error);
}

let store = createStore(reducer, inital_state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
