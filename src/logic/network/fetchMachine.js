import { reqIntercept } from "./reqIntercept";

// helper function to fetch data
// url, method, body, contentType are the parameters
const fetchMachineService = () => {
	// pass data through intercepter to add auth header
	const get = (url) => {
		return reqIntercept(url, "GET");
	};

	const post = (url, body, contentType) => {
		return reqIntercept(url, "POST", body, (contentType = "application/json"));
	};

	return { get, post };
};

export const fetchMachine = fetchMachineService();

export default fetchMachine;
