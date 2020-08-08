import React from "react";
import { connect } from "react-redux";
import { basic } from "data";
const Footer = ({ theme, dispatch }) => {
	return (
		<footer>
			<a href={basic.website} className='repo-link'>
				©{new Date().getFullYear()} {basic.name}
			</a>
			<span className='divider'></span>{" "}
			<a href='https://github.com/akashraj9828/akashraj.tech' className='repo-link'>
				Source Code
			</a>
		</footer>
	);
};
const mapStateToProps = (state) => {
	let { app } = state;
	return { theme: app.theme };
};

export default connect(mapStateToProps, null)(Footer);
