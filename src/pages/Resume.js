/* REACT */
import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
/* HOOKS */
import { useWindowSize } from "react-use";
import { useTitle } from "react-use";
/* DATA */
import { resume } from "data";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = ({ theme }) => {
	useTitle(resume.title)
	const { width } = useWindowSize();
	return (
		<div className='resume'>
			<div className='center'>
				<Document
					renderMode='svg'
					file={theme === "dark" ? resume.resume_dark : resume.resume_light}
					onLoadSuccess={(...e) => {
						console.log(e, ": success");
						// debugger;
					}}
					onLoadError={(...e) => {
						console.log(e, ": error");
						// debugger;
					}}
					externalLinkTarget='_blank'
					//  inputRef={e}
				>
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
