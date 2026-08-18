import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
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
import Stats from "./pages/Stats";
import { SoundProvider } from "./logic/audio/SoundProvider";
import WebMcpProvider from "./logic/webmcp/WebMcpProvider";

const AnimatedRoutes = () => {
	const location = useLocation();
	const nodeRef = useRef(null);

	return (
		<TransitionGroup component={null}>
			<CSSTransition nodeRef={nodeRef} key={location.pathname.split("/")[1] || "/"} timeout={{ enter: 300, exit: 200 }} classNames='fade'>
				<div ref={nodeRef}>
					<Routes location={location}>
						<Route path='/' element={<Home />} />
						<Route path='/lab' element={<Work />} />
						<Route path='/work' element={<Work />} />
						<Route path='/resume' element={<Resume />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/stats' element={<Stats />} />
						<Route path='*' element={<>404 Page not found</>} />
					</Routes>
				</div>
			</CSSTransition>
		</TransitionGroup>
	);
};

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, [pathname]);

	return null;
};

export const App = () => {
	return (
		<div className={`App`}>
			<SoundProvider>
				<Router>
					<WebMcpProvider>
						<ScrollToTop />
						<Header />
						<div id='main' className='main-content'>
							<AnimatedRoutes />
						</div>
						<Footer />
					</WebMcpProvider>
				</Router>
			</SoundProvider>
		</div>
	);
};

const mapStateToProps = (state) => {
	// let { app } = state;
	// return { theme:app.theme };
	return {};
};

export default connect(mapStateToProps, null)(App);
