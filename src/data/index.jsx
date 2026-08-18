import React, { Fragment } from "react";
const imageModules = import.meta.glob("../assets/img/**/*", { eager: true, query: "?url", import: "default" });
const image = (path) => imageModules[`../assets/img/${path}`];

// import { BiHome as IconHome } from "react-icons/bi";
// import { VscHome as IconHome } from "react-icons/vsc";
import { RiHomeLine as IconHome } from "react-icons/ri";
import { AiOutlineExperiment as IconLab } from "react-icons/ai";
import { ImStatsBars as IconStats } from "react-icons/im";
import { RiContactsLine as IconContact } from "react-icons/ri";
import { GiTakeMyMoney as IconHire } from "react-icons/gi";

/* BASIC DATA */
export const basic = {
	name: "Akash Raj",
	firstName: "Akash",
	lastName: "Raj",
	email: "akashraj9828@gmail.com",
	github: "akashraj9828",
	internet_alias: "akashraj9828",
	website: "akashraj.tech",
	fullWebsite: "https://akashraj.tech",
	currentCompany: "Veramatic (formerly Accumatic)",
	currentCompanyLink: "https://veramatic.io",
	dob: new Date(1998, 11, 2), // for age calculation // month is 0 indexed so JAN=0
};

/* DATA FOR HEADER / NAVBAR */
export const header = {
	...basic,
	navItems: [
		{
			label: "HOME",
			to: "/",
			icon: <IconHome />,
		},
		{
			label: "LAB",
			to: "/lab",
			icon: <IconLab />,
		},
		{
			label: "STATS",
			to: "/stats",
			icon: <IconStats />,
		},
		{
			label: "HIRE ME",
			to: "/resume",
			icon: <IconHire />,
		},
		{
			label: "CONTACT",
			to: "/contact",
			icon: <IconContact />,
		},
	],
};

/* DATA FOR HOMEPAGE */
export const home = {
	...basic,
	title: "Akash Raj",
	heading: "Engineer, explorer, maker.",
	full_intro: (
		<Fragment>
			<span>
				Hey, I'm Akash
				<span role='img' aria-label='Peace'>
					✌️
				</span>{" "}
				I'm a full-stack engineer currently working with some great people at{" "}
				<a className='d-inline font-weight-bold' href={basic.currentCompanyLink} target='_blank' rel='noopener noreferrer'>
					Veramatic
				</a>
				.
			</span>
			<br />
			<span>
				My work there includes AI agent harnesses, financial document parsing, ephemeral environments, end-to-end testing, and whatever else helps make the product easier to build and use.
			</span>
			<br />
			<span>
				I like making useful things—sometimes products, sometimes small experiments, and sometimes ideas that are simply fun to explore.
				<span role='img' aria-label='Coder'>
					👨‍💻
				</span>
			</span>
			<br />
			<span>
				Away from the keyboard, I enjoy video games, a good game of badminton, and generally finding something new to get curious about. AI{" "}
				<span role='img' aria-label='Robot'>
					🤖
				</span>{" "}
				is one of the areas I’ve been exploring lately.
			</span>
		</Fragment>
	),
};

/* DATA FOR PROJECTS/WORK */
export const work = {
	title: "Akash Raj - Lab",
	projects: [
		{ name: "8-Bit Art Generator", img_src: image("projects/8-bit.png"), link_code: "https://github.com/akashraj9828/8-bit-art-generator", link_live: "https://akashraj9828.github.io/8-bit-art-generator/" },
		{ name: "Git - Stats", img_src: image("projects/gitstats.png"), link_code: "https://github.com/akashraj9828/gitstats", link_live: "https://gitstats.me" },
		{ name: "COVID-19 INDIA (Interactive)", img_src: image("projects/map.png"), link_code: "https://github.com/akashraj9828/COVID-19-REACT", link_live: "https://akashraj.tech/corona/interactive/" },
		{ name: "SVG Text animation generator", img_src: image("projects/svg text.png"), link_code: "https://github.com/akashraj9828/svg-text-animation-generator", link_live: "https://akashraj9828.github.io/svg-text-animation-generator/" },
		{ name: "Deep Dance(Dance by AI)", img_src: image("projects/deep-dance.gif"), link_code: "https://github.com/akashraj9828/Deep-Dance", link_live: "" },
		{ name: "Information Universe", img_src: image("projects/information-universe.png"), link_code: "https://github.com/akashraj9828/Information-Universe", link_live: "https://information-universe.herokuapp.com/" },
		{ name: "Image 2 Sound", img_src: image("projects/i2s.svg"), link_code: "https://github.com/akashraj9828/image2sound", link_live: "" },
		{ name: "COVID-19 Live Dashboard", img_src: image("projects/corona.png"), link_code: "", link_live: "https://akashraj.tech/corona/world" },
		{ name: "Collaborative Drawing", img_src: image("projects/col-draw.png"), link_code: "https://github.com/akashraj9828/Collaborative_Drawing", link_live: "https://col-draw.herokuapp.com/" },
		{ name: "Weird Mirror", img_src: image("projects/weird-mirror.gif"), link_code: "https://github.com/akashraj9828/weird-mirror", link_live: "https://akashraj9828.github.io/weird-mirror/" },
		{ name: "Classic Snake with Speech recognition", img_src: image("projects/snake voice.png"), link_code: "https://github.com/akashraj9828/SnakeGame-speech-recognition", link_live: "https://akashraj9828.github.io/SnakeGame-speech-recognition" },
		{ name: "Aestroids", img_src: image("projects/aestroids.png"), link_code: "https://github.com/akashraj9828/aestroids", link_live: "https://akashraj9828.github.io/aestroids/" },
		{ name: "Lorenz attractor 3D", img_src: image("projects/lorenz.png"), link_code: "https://github.com/akashraj9828/lorenz-attractor-3D", link_live: "https://akashraj9828.github.io/lorenz-attractor-3D" },
		{ name: "Lorenz attractor 2D", img_src: image("projects/lorrenz 2d.png"), link_code: "https://github.com/akashraj9828/lorenz-attractor", link_live: "https://akashraj9828.github.io/lorenz-attractor/" },
		{ name: "Lissajous Table", img_src: image("projects/lissajous.png"), link_code: "https://github.com/akashraj9828/lissajous-table", link_live: "https://akashraj9828.github.io/lissajous-table/" },
	],
};

/* DATA FOR HIRE ME/RESUME */
export const resume = {
	title: "Akash Raj - Hire Me",
};

/* DATA FOR CONTACT ME */
export const contact = {
	...basic,
	title: "Akash Raj - Contact",
	contact_reasons: ["You need engineering help on your project.🤓", "You would like to invite me to a meetup.", "You want to recommend me a movie/TV series.📽", "You have an offer for me I cannot resist.💲💲", "You simply want to connect with me."],
	contact_form: "https://form.typeform.com/to/pMV7SzcQ",
	socials: [
		{ link: "https://twitter.com/akashraj9828", img_src: image("social/twitter.png"), name: "Twitter" },
		{ link: "https://github.com/akashraj9828", img_src: image("social/github.png"), name: "Github" },
		{ link: "https://www.linkedin.com/in/akashraj9828/", img_src: image("social/linkedin.png"), name: "Linkedin" },
		{ link: "mailto:akashraj9828@gmail.com", img_src: image("social/email.png"), name: "mail" },
		{ link: "https://www.facebook.com/profile.php?id=100003852667560", img_src: image("social/facebook.png"), name: "Facebook" },
		{ link: "https://www.instagram.com/akashraj.exe", img_src: image("social/instagram.png"), name: "Instagram" },
	],
};

/* DATA FOR FOOTER */
export const footer = {
	...basic,
	sourceCodeUrl: "https://github.com/akashraj9828/akashraj.tech",
};
