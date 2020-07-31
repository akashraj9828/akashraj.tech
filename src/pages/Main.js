/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import "./Main.scss";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const Main = ({match }) => {
    console.log("---: Main -> match", match);
	

	useEffect(() => {

		
		if (process.env.NODE_ENV === "development") {
			// some stuff to do in dev
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);





	return (
		<Fragment>
			{match.path}
			<br/>
			<br/>
			<br/>
			<Link to="/" >/</Link>
			<br/>
			<Link to="/work" >work</Link>
			<br/>
			<Link to="/resume" >resume</Link>
			<br/>
			<Link to="/contact" >contact</Link>
			<br/>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
	};
};

export default connect(mapStateToProps, null)(Main);
