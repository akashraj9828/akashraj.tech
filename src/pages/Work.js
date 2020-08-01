/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useRef } from "react";
import { connect } from "react-redux";
import "./Work.scss";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FiGithub as GithubIcon, FiLink as LinkIcon } from "react-icons/fi";
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const Project = ({ name, img_src, link_code, link_live }) => {
	return (
		<figure>
			<a href={link_live} target='_blank' rel='noopener noreferrer'>
				<img src={img_src} alt={name} />
			</a>
			<figcaption>
				{link_code && (
					<a className="link-icons" href={link_code} target='_blank' rel='noopener noreferrer'>
                        <GithubIcon/>
					</a>
				)}
				&nbsp;
				{link_live && (
					<a className="link-icons" href={link_live} target='_blank' rel='noopener noreferrer'>
                        <LinkIcon/>
					</a>
				)}
				<br />
				<a href={link_live} target='_blank' rel='noopener noreferrer'>
					{name}
				</a>
			</figcaption>
		</figure>
	);
};

const Work = ({ match }) => {
	const part2 = useRef(null);
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			// some stuff    to do in dev
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let projects = [
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

	return (
		<Fragment>
			<div className='work mx-5'>
				<section>
					<header class='games mt-5'>Projects</header>
				</section>

				<section className='features'>
                    {projects.map(e=>Project(e))}
                </section>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, null)(Work);
