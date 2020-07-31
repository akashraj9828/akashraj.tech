import { default_state } from "../default_state";
import { UPDATE_USER, RESET_USER } from "./../actions/user";

export default function user(state = default_state.user, action) {
	const { type, value } = action;
	let new_state = { ...state };
	switch (type) {
		case UPDATE_USER:
			return { ...new_state, ...value };
		case RESET_USER:
			return default_state.user;
		default:
			return state;
	}
}
