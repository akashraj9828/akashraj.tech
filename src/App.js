import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import Header from "./components/Header";
// import Main from "./pages/Main";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
// import Landing from "./pages/Landing";
import { connect } from "react-redux";
import { TransitionGroup, Transition, CSSTransition } from "react-transition-group";
// import ProtectedRoute from "./ProtectedRoute";
const play = (pathname, node, appears) => {
	const delay = appears ? 0 : 0.5;
};

export const App = () => {
	const a = useRef();
	useEffect(() => {
		if (a && a.current) {
			console.log("---: App -> a.current", a.current);
		}
	}, [a]);

	return (
		<div className={`App`} ref={a}>
			<Router>
				<Header />
				{/* <Main/> */}
				<div className='main-content'>
					<Route
						render={({ location }) => {
							const { pathname, key } = location;
							return (
								<TransitionGroup component={null}>
									<CSSTransition key={location.pathname.split("/")[1] || "/"} timeout={{ enter: 300, exit: 200 }} classNames='fade' appear>
										<Switch>
											<Route path='/' exact component={Home} />
											<Route path='/work' exact component={Work} />
											<Route path='/resume' exact component={Resume} />
											<Route path='/contact' exact component={Contact} />
											<Route path='*' component={() => "404 Page not found"} />
										</Switch>
									</CSSTransition>
								</TransitionGroup>
							);
						}}
					/>
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
