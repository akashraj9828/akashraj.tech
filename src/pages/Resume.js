import React from "react";
import { connect } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useWindowSize } from "react-use";
import { resume } from "data";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = ({ theme }) => {
	const { width, height } = useWindowSize();
	console.log("---: Resume -> height", height);
	return (
		<div className='resume'>
			<div className='center'>
				<Document renderMode='svg' file={theme === "dark" ? resume.resume_dark : resume.resume_light} onLoadSuccess={console.log} onLoadError={console.error}>
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
