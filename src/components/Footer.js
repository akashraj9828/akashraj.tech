import React from "react";
import { connect } from "react-redux";
import { footer } from "data";
const Footer = ({ theme, dispatch }) => {
	return (
		<footer>
			<a href={footer.fullWebsite} className='repo-link'>
				©{new Date().getFullYear()} {footer.name}
			</a>
			<span className='divider'></span>
			<a href={footer.sourceCodeUrl} className='repo-link'>
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
