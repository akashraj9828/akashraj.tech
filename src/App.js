import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
/* COMPONENTS */
import Header from "./components/Header";
import Footer from "./components/Footer";
/* PAGES */
import Home from "./pages/Home";
import Work from "./pages/Work";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

export const App = () => {
	return (
		<div className={`App`}>
			<Router>
				<Header />
				<div className='main-content'>
					<Route
						render={({ location: { pathname } }) => {
							return (
								<TransitionGroup component={null}>
									<CSSTransition key={pathname.split("/")[1] || "/"} timeout={{ enter: 300, exit: 200 }} classNames='fade'>
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
				<Footer />
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
