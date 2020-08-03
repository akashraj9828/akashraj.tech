import React, { useState } from "react";
import { connect } from "react-redux";
// import { Document, Page } from "react-pdf";
import ResumeLight from "assets/doc/resume_light.pdf";
import ResumeDark from "assets/doc/resume_dark.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useWindowSize } from "react-use";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = ({ theme }) => {
	const { width } = useWindowSize();
	// console.log("---: Resume -> windowSize", windowSize);

	return (
		<div className='resume'>
			<div className='center'>
				<Document renderMode='svg' file={theme === "dark" ? ResumeDark : ResumeLight} onLoadSuccess={console.log} onLoadError={console.error}>
					<Page pageNumber={1} width={width - 20} />
				</Document>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	theme: state.app.theme,
});

export default connect(mapStateToProps, null)(Resume);
