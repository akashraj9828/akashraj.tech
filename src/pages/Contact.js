/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Contact.scss";
import { Fragment } from "react";

const Social = ({ name, link, img_src }) => (
	<figure>
		<a href={link} target='_blank' rel='noopener noreferrer'>
			<img src={img_src} alt={`Akash Raj on ${name}`} />
		</a>
	</figure>
);

const Contact = ({ match }) => {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			// some stuff    to do in dev
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const contact = [
		{ link: "https://twitter.com/akashraj9828", img_src: require("assets/img/social/twitter.png"), name: "Twitter" },
		{ link: "https://github.com/akashraj9828", img_src: require("assets/img/social/github.png"), name: "Github" },
		{ link: "https://www.linkedin.com/in/akashraj9828/", img_src: require("assets/img/social/linkedin.png"), name: "Linkedin" },
		{ link: "mailto:akashraj9828@gmail.com", img_src: require("assets/img/social/email.png"), name: "mail" },
		{ link: "https://www.facebook.com/profile.php?id=100003852667560", img_src: require("assets/img/social/facebook.png"), name: "Facebook" },
		{ link: "https://www.instagram.com/akashraj.exe", img_src: require("assets/img/social/instagram.png"), name: "Instagram" },
	];

	return (
		<Fragment>
			<div className='contact-page mx-5'>
				<section class='container center' id='contact'>
					<header class='contact mt-5 center'>Hello there...</header>

					<div class='text-left mw-700 m-auto contact-div center'>
						<p class='lh-less'>
							Looks like you'd like to get in touch with me.
							<br />
							We're all busy person and I respect your time and hope the same from you. I'll reply as soon as possible.
							<br />
							<br />
							Contact me if....
						</p>

						<ul id='why-contact'>
							<li>You need engineering help on your project.🤓</li>
							<li>You would like to invite me to a meetup.</li>
							<li>You want to recommend me a movie/TV series.📽</li>
							<li>You have an offer for me I cannot resist.💲💲</li>
							<li>You simply want to connect with me.</li>
						</ul>
						<br />
						<br />
						<p class='d-inline lh-less'>
							I’m so thankful that you stopped by and I’d love to hear from you. Feel free to e-mail me at
							<a className='font-weight-bold' href='mailto:akashraj9828@gmail.com'>
								<span>
									<strong> akashraj9828@gmail.com </strong>
								</span>
							</a>
							or contact me through the form
							<br />
							Or find me on social media platforms.
						</p>
						<br />
					</div>
				</section>

				<section class='' id='socials'>
					{contact.map((e) => Social(e))}
				</section>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, null)(Contact);
