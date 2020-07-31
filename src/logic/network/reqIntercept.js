
// intercept request and add auth string
export const reqIntercept = async (url, method = "POST", body = null, contentType = "application/json") => {
	try {
		// extra data for post
		let extras = {
			method: method,
			// body: JSON.stringify(body),
			// headers: {
			// "Content-type": "application/json",
			// },
		};
		if (method === "GET") {
			// remove body and contenttype for GET
			extras = {
				method: method,
				// headers: {
				// },
			};
		}
		const res = await fetch(url, extras);
		// const status = res ? res.status : null;
		// if (status === 401) {
		// window.location = "/logout";
		// return;
		// }
		const json = await res.json();
		return json;
	} catch (err) {
		console.error(err);
		return Promise.reject(new Error(err));
	}
};
