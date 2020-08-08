/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Fragment } from "react";
import { FiGithub as GithubIcon, FiLink as LinkIcon } from "react-icons/fi";
import { work } from "data";

const Project = ({ name, img_src, link_code, link_live }) => {
	if (link_live) link_live = link_live + "?ref=akashraj.tech/work";
	return (
		<figure>
			<a href={link_live || link_code} target='_blank' rel='noopener noreferrer'>
				<img src={img_src} alt={name} />
			</a>
			<figcaption>
				{link_code && (
					<a className='link-icons' href={link_code} target='_blank' rel='noopener noreferrer' alt={`View ${name} in Github`}>
						<GithubIcon />
					</a>
				)}
				&nbsp;
				{link_live && (
					<a className='link-icons' href={link_live} target='_blank' rel='noopener noreferrer' alt={`View ${name} live`}>
						<LinkIcon />
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
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			// some stuff    to do in dev
			window.scrollTo(0, 0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<div className='work mx-5'>
				<section>
					<header className='mt-5'>Projects</header>
				</section>
				<section className='projects'>
					{work.map((e, i) => (
						<Fragment key={i}>{Project(e)}</Fragment>
					))}
				</section>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, null)(Work);
