import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import "./assets/styles/theme.scss";
import "./assets/styles/print.scss";

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
