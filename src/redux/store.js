import { createStore } from "redux";

import reducer from "./reducers";
import { default_state } from "./default_state";
// import { IS_PRODUCTION } from "./../config";

let inital_state = { ...default_state };
try {
	let old_theme = window.localStorage.getItem("page_theme");
	if (old_theme) {
		document.body.parentElement.classList.add(old_theme);
		inital_state.app.theme = old_theme;
	} else {
		document.body.parentElement.classList.add(inital_state.app.theme);
	}
	let old_data = window.localStorage.getItem("userInfo");
	if (old_data) {
		let userInfo = JSON.parse(old_data);
		if (userInfo.status === "success") {
			inital_state.user = userInfo;
		}
	}
} catch (error) {}

let store = createStore(reducer, inital_state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;
