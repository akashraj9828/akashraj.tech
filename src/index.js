import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

/* 
	IF YOU DON'T WANT TO GENERATE STATIC SNAPSHOTS 
	USE "render" FROM "react-dom" 
	instead of "react-snapsot" 
*/

// import {render} from "react-dom";
import { render } from "react-snapshot";

import App from "./App";

import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import "./assets/styles/theme.scss";

render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
