import React, { useState } from "react";
import { connect } from "react-redux";
import { Document, Page } from "react-pdf";
import ResumePDF from "assets/doc/resume.pdf";
console.log("---: ResumePDF", ResumePDF);

const Resume = () => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<div>
			<Document file={"/resume.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
				<Page pageNumber={pageNumber} />
			</Document>
			<p>
				Page {pageNumber} of {numPages}
			</p>
		</div>
	);
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Resume);
