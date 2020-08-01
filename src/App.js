import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import Header from "./components/Header";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Work from "./pages/Work";
// import Landing from "./pages/Landing";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
export const App = () => {
	return (
		<div className={`App`}>
			<Router>
				<Header />
				{/* <Main/> */}
				<div className='main-content'>
					<Switch>
						{/* <Route path='/' exact component={Landing} /> */}
						<Route path='/' exact component={Home} />
						<Route path='/work' exact component={Main} />
						<Route path='/contact' exact component={Main} />
						<Route path='/resume' exact component={Main} />
						<ProtectedRoute path='/dashboard' exact component={Main} />
						<Route path='*' component={() => "404 Page not found"} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

const mapStateToProps = (state) => {
	// let { app } = state;
	// return { theme:app.theme };
	return {};
};

export default connect(mapStateToProps, null)(App);
