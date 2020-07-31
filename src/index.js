import React from "react";
import {render} from "react-dom";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import "./assets/styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
