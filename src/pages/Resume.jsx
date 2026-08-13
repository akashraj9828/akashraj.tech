/* REACT */
import React from "react";
/* REDUX */
import { connect } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
/* HOOKS */
import { useWindowSize } from "react-use";
import { useTitle } from "react-use";
/* DATA */
import { resume } from "data";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const Resume = ({ theme }) => {
	useTitle(resume.title);
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
