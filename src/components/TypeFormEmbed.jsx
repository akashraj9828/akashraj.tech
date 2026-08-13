// copied from https://github.com/alexgarces/react-typeform-embed/blob/master/src/components/ReactTypeformEmbed/index.js

import React, { Component } from "react";
import PropTypes from "prop-types";
import { createPopup, createWidget } from "@typeform/embed";
import "@typeform/embed/build/css/widget.css";

const styleDefault = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	overflow: "hidden",
};

class TypeFormEmbed extends Component {
	componentDidMount() {
		const { url, hideHeaders, hideFooter, opacity, buttonText, popup, mode, autoOpen, autoClose, onSubmit } = this.props;
		const formId = url.split("/").filter(Boolean).pop();

		const options = {
			hideHeaders,
			hideFooter,
			opacity,
			buttonText,
			mode,
			autoOpen,
			autoClose,
			onSubmit,
		};

		// Popup Mode
		if (popup) {
			// Load Typeform embed popup
			this.typeform = createPopup(formId, options);

			// Widget Mode (default)
		} else {
			const elm = this.typeformElm;

			// Load Typeform embed widget
			this.typeform = createWidget(formId, { ...options, container: elm });
		}
	}

	componentWillUnmount() {
		this.typeform?.unmount?.();
	}

	render() {
		const style = Object.assign({}, styleDefault, this.props.style);

		return (
			<div
				className='TypeFormEmbed'
				ref={(tf) => {
					this.typeformElm = tf;
				}}
				style={style}
			/>
		);
	}
}

TypeFormEmbed.propTypes = {
	style: PropTypes.object,
	url: PropTypes.string.isRequired,
	popup: PropTypes.bool,
	hideHeaders: PropTypes.bool,
	hideFooter: PropTypes.bool,

	// Widget options
	opacity: PropTypes.number,
	buttonText: PropTypes.string,

	// Popup options
	mode: PropTypes.string,
	autoOpen: PropTypes.bool,
	autoClose: PropTypes.number,
	onSubmit: PropTypes.func,
};

// Default values taken from official Typeform docs
// https://developer.typeform.com/embed/modes/
TypeFormEmbed.defaultProps = {
	style: {},
	popup: false,
	hideHeaders: false,
	hideFooter: false,
	onSubmit: () => {},

	// Widget options
	opacity: 100,
	buttonText: "Start",

	// Popup options
	mode: "popup", // options: "popup", "drawer_left", "drawer_right"
	autoOpen: false,
	autoClose: 5,
};

export default TypeFormEmbed;
