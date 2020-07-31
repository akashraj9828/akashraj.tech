import { default_state } from "./../default_state";

// Define constants
// Action name
export const UPDATE_USER = "UPDATE_USER";
export const RESET_USER = "RESET_USER";

// define actions

export function updateUser(value) {
	return { type: UPDATE_USER, value: value };
}
export function resetUser() {
	return { type: RESET_USER, value: default_state.user };
}
