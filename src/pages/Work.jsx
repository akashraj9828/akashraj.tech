/* REACT */
import React, { useEffect } from "react";
/* REDUX */
import { connect } from "react-redux";
/* ICONS */
import { FiGithub as GithubIcon, FiLink as LinkIcon } from "react-icons/fi";
/* HOOKS */
import { useTitle } from "react-use";
/* DATA */
import { work } from "data";

const Work = ({ match }) => {
	useTitle(work.title);

	useEffect(() => {
		if (import.meta.env.DEV) {
			// some stuff    to do in dev
			window.scrollTo(0, 0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className='work'>
			<header className='work-heading'>
				<p className='work-eyebrow'>Selected experiments</p>
				<h1>Projects from the lab.</h1>
				<p>Small tools, visual experiments, and ideas made to be explored.</p>
			</header>
			<section className='projects' aria-label='Project collection'>
				{work.projects.map((project) => <Project key={project.name} {...project} />)}
			</section>
		</main>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, null)(Work);

// Projects component
const Project = ({ name, img_src, link_code, link_live }) => {
	const destination = link_live || link_code;
	return (
		<article className='project-card'>
			<a className='project-image' href={destination} target='_blank' rel='noopener noreferrer' aria-label={`Open ${name}`}>
				<img src={img_src} alt='' />
			</a>
			<div className='project-content'>
				<h2><a href={destination} target='_blank' rel='noopener noreferrer'>{name}</a></h2>
				<div className='project-links' aria-label={`${name} links`}>
					{link_code && <a href={link_code} target='_blank' rel='noopener noreferrer' aria-label={`View ${name} source on GitHub`}><GithubIcon aria-hidden='true' /><span>Code</span></a>}
					{link_live && <a href={link_live} target='_blank' rel='noopener noreferrer' aria-label={`Open ${name} live project`}><LinkIcon aria-hidden='true' /><span>Visit</span></a>}
				</div>
			</div>
		</article>
	);
};
