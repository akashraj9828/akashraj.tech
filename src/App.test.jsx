import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { App } from "./App";
import store from "./redux/store";

test("renders the home page", () => {
	const { getAllByText } = render(
		<Provider store={store}>
			<App />
		</Provider>,
	);
	expect(getAllByText(/Akash Raj/i).length).toBeGreaterThan(0);
});
