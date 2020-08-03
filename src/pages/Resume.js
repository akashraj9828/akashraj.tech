import React, { useState } from "react";
import { connect } from "react-redux";
// import { Document, Page } from "react-pdf";
import ResumePDF from "assets/doc/resume.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useWindowSize } from "react-use";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = () => {
	const { width, height } = useWindowSize();
	// console.log("---: Resume -> windowSize", windowSize);
	return (
		<div>
			<div className='row center'>
				<Document renderMode='svg' file={ResumePDF} onLoadSuccess={console.log} onLoadError={console.error}>
					<Page pageNumber={1} width={width} />
				</Document>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Resume);
