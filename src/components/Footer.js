/* REACT */
import React from "react";
/* REDUX */
import { connect } from "react-redux";
/* DATA */
import { footer } from "data";
const Footer = ({ theme, dispatch }) => {
	return (
		<footer>
			<a href={footer.fullWebsite} target='_blank' rel='noopener noreferrer'>
				©{new Date().getFullYear()} {footer.name}
			</a>
			<span className='divider'></span>
			<a href={footer.sourceCodeUrl} target='_blank' rel='noopener noreferrer'>
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
