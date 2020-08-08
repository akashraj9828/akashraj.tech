import React, { Fragment } from "react";
import ResumeLight from "assets/doc/resume_light.pdf";
import ResumeDark from "assets/doc/resume_dark.pdf";

export const basic = {
	name: "Akash Raj",
	firstName: "Akash",
	lastName: "Raj",
	email: "akashraj9828@gmail.com",
	website: "https://akashraj.tech",
	currentCompany: "Snap2Insight",
	currentCompanyLink: "https://snap2insight.com",
};

export const home = {
	...basic,
	heading: "Student, Explorer, Creator.",
	full_intro: (
		<Fragment>
			<span>It's me Akash✌️, a 21 year old Full Stack Developer.</span>
			<br />
			<span>I like to make stuff.👨‍💻</span>
			<br />
			<span>
				Currently engineering{" "}
				<a className='d-inline font-weight-bold' href={basic.currentCompanyLink} target=''>
					{" "}
					@{basic.currentCompany}{" "}
				</a>
				with some awesome folks.
			</span>
			<br />
			<span>Game development 🕹️ and AI 🤖 are my latest interests.</span>
		</Fragment>
	),
};

export const work = [
	{ name: "SVG Text animation generator", img_src: require("assets/img/projects/svg text.png"), link_code: "https://github.com/akashraj9828/svg-text-animation-generator", link_live: "https://akashraj9828.github.io/svg-text-animation-generator/" },
	{ name: "Git - Stats", img_src: require("assets/img/projects/gitstats.png"), link_code: "https://github.com/akashraj9828/gitstats", link_live: "https://gitstats.me" },
	{ name: "COVID-19 Interactive(using React)", img_src: require("assets/img/projects/map.png"), link_code: "https://github.com/akashraj9828/COVID-19-REACT", link_live: "https://akashraj.tech/corona/interactive/" },
	{ name: "COVID-19 Live Dashboard", img_src: require("assets/img/projects/corona.png"), link_code: "", link_live: "https://akashraj.tech/corona/world" },
	{ name: "Deep Dance(Dance by AI)", img_src: require("assets/img/projects/deep-dance.gif"), link_code: "https://github.com/akashraj9828/Deep-Dance", link_live: "" },
	{ name: "Image 2 Sound", img_src: require("assets/img/projects/i2s.svg"), link_code: "https://github.com/akashraj9828/image2sound", link_live: "" },
	{ name: "Information Universe", img_src: require("assets/img/projects/information-universe.png"), link_code: "https://github.com/akashraj9828/Information-Universe", link_live: "https://information-universe.herokuapp.com/" },
	{ name: "Collaborative Drawing", img_src: require("assets/img/projects/col-draw.png"), link_code: "https://github.com/akashraj9828/Collaborative_Drawing", link_live: "https://col-draw.herokuapp.com/" },
	{ name: "Weird Mirror", img_src: require("assets/img/projects/weird-mirror.gif"), link_code: "https://github.com/akashraj9828/weird-mirror", link_live: "https://akashraj9828.github.io/weird-mirror/" },
	{ name: "Classic Snake with Speech recognition", img_src: require("assets/img/projects/snake voice.png"), link_code: "https://github.com/akashraj9828/SnakeGame-speech-recognition", link_live: "https://akashraj9828.github.io/SnakeGame-speech-recognition" },
	{ name: "Aestroids", img_src: require("assets/img/projects/aestroids.png"), link_code: "https://github.com/akashraj9828/aestroids", link_live: "https://akashraj9828.github.io/aestroids/" },
	{ name: "Lorenz attractor 3D", img_src: require("assets/img/projects/lorenz.png"), link_code: "https://github.com/akashraj9828/lorenz-attractor-3D", link_live: "https://akashraj9828.github.io/lorenz-attractor-3D" },
	{ name: "Lorenz attractor 2D", img_src: require("assets/img/projects/lorrenz 2d.png"), link_code: "https://github.com/akashraj9828/lorenz-attractor", link_live: "https://akashraj9828.github.io/lorenz-attractor/" },
	{ name: "Lissajous Table", img_src: require("assets/img/projects/lissajous.png"), link_code: "https://github.com/akashraj9828/lissajous-table", link_live: "https://akashraj9828.github.io/lissajous-table/" },
];

export const resume = {
	resume_light: ResumeLight,
	resume_dark: ResumeDark,
};

export const contact = {
	...basic,
	contact_reasons: ["You need engineering help on your project.🤓", "You would like to invite me to a meetup.", "You want to recommend me a movie/TV series.📽", "You have an offer for me I cannot resist.💲💲", "You simply want to connect with me."],
	// contact_form: "https://akashraj9828.typeform.com/to/GmMPE2",
	socials: [
		{ link: "https://twitter.com/akashraj9828", img_src: require("assets/img/social/twitter.png"), name: "Twitter" },
		{ link: "https://github.com/akashraj9828", img_src: require("assets/img/social/github.png"), name: "Github" },
		{ link: "https://www.linkedin.com/in/akashraj9828/", img_src: require("assets/img/social/linkedin.png"), name: "Linkedin" },
		{ link: "mailto:akashraj9828@gmail.com", img_src: require("assets/img/social/email.png"), name: "mail" },
		{ link: "https://www.facebook.com/profile.php?id=100003852667560", img_src: require("assets/img/social/facebook.png"), name: "Facebook" },
		{ link: "https://www.instagram.com/akashraj.exe", img_src: require("assets/img/social/instagram.png"), name: "Instagram" },
	],
};
