/* REACT */
import React, { Fragment, useEffect } from "react";
/* REDUX */
import { connect } from "react-redux";
/* COMPONENTS */
import TypeFormEmbed from "components/TypeFormEmbed";
/* DATA */
import { contact } from "data";

const Contact = () => {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			// some stuff    to do in dev
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<div className='contact-page mx-0 mx-sm-4 mx-md-5'>
				<section className='container center' id='contact'>
					<header className='contact mt-5 center'>Hello there...</header>

					<div className='text-left mw-700 m-auto contact-div center'>
						<p className='lh-less'>
							<span>Looks like you'd like to get in touch with me.</span>
							<br />
							<span>We're all busy person and I respect your time and hope the same from you. I'll reply as soon as possible.</span>
							<br />
							<br />
							<span className='h3'>Contact me if....</span>
							<br />
							<br />
						</p>

						<ul className='contact-reasons'>
							{contact.contact_reasons.map((e, i) => (
								<li key={i}>{e}</li>
							))}
						</ul>
						{contact.contact_form && (
							<Fragment>
								<br />
								{/* <Suspense fallback={<div>Loading...</div>}> */}
								<TypeFormEmbed mode='drawer_right' style={{ width: "100%", height: "350px", position: "relative" }} url={contact.contact_form}></TypeFormEmbed>
								{/* </Suspense> */}
								<br />
							</Fragment>
						)}
						<br />
						<p className='lh-less'>
							<span>
								I’m so thankful that you stopped by and I’d love to hear from you. Feel free to e-mail me at
								<a className='font-weight-bold' href={`mailto:${contact.email}`}>
									<span>
										<strong> {contact.email} </strong>
									</span>
								</a>
								{contact.contact_form && "or contact me through the form."}
							</span>
							<br />
							<br />
							<span>Or find me on social media platforms.</span>
						</p>
					</div>
				</section>

				<section className='' id='socials'>
					{contact.socials.map((e, i) => (
						<Fragment key={i}>{Social(e)}</Fragment>
					))}
				</section>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, null)(Contact);

const Social = ({ name, link, img_src }) => (
	<figure>
		<a href={link} target='_blank' rel='noopener noreferrer'>
			<img src={img_src} alt={`${contact.name} on ${name}`} />
		</a>
	</figure>
);
