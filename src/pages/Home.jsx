/* REACT */
import React, { Fragment, useRef, useState } from "react";

/* REACT-ROUTER */
import { Link } from "react-router-dom";

/* REDUX */
import { connect } from "react-redux";

/* HOOKS */
import { useTitle } from "react-use";

/* ASSETS */
import MyImage from "assets/img/me.png";
import Rocket from "assets/img/rocket.png";

/* DATA */
import { home } from "data";
import { useSound } from "../logic/audio/SoundProvider";
import { useReveal } from "../logic/motion/useReveal";
import { useReducedMotion } from "../logic/motion/useReducedMotion";

const Home = () => {
	useTitle(home.title);
	const introduction = useRef(null);
	const [fly, setFly] = useState(false);
	const { play } = useSound();
	const reducedMotion = useReducedMotion();
	const heroReveal = useReveal();
	const introductionReveal = useReveal({ threshold: 0.08 });

	const scrollToIntroduction = (event) => {
		event.preventDefault();
		introduction.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
		if (reducedMotion) introduction.current?.focus();
		else window.setTimeout(() => introduction.current?.focus(), 500);
	};
	const launchRocket = (event) => {
		if (!fly) play("launch");
		setFly(true);
		scrollToIntroduction(event);
	};

	return (
		<Fragment>
			<main className='home'>
				<section className='home-hero' aria-labelledby='home-title'>
					<div ref={heroReveal.ref} style={heroReveal.style} className={`home-hero__content ${heroReveal.className}`}>
						<img src={MyImage} className='home-portrait' alt={`Portrait of ${home.name}`} />
						<p className='home-eyebrow'>Hello, I&apos;m {home.firstName}.</p>
						<h1 id='home-title'>{home.heading}</h1>
						<p className='home-summary'>I enjoy figuring out how things work and building useful things along the way.</p>
						<div className='home-actions' aria-label='Explore my work'>
							<a className='home-button home-button--primary' href='#introduction' onClick={scrollToIntroduction}>
								About me <span aria-hidden='true'>↓</span>
							</a>
							<Link className='home-button home-button--quiet' to='/lab' onClick={() => play("navigate")}>
								View projects
							</Link>
						</div>
					</div>
				</section>

				<section className='home-introduction' id='introduction' ref={introduction} tabIndex='-1' aria-labelledby='introduction-title'>
					<div ref={introductionReveal.ref} style={introductionReveal.style} className={`home-introduction__inner ${introductionReveal.className}`}>
						<p className='home-eyebrow'>A little more</p>
						<h2 id='introduction-title'>Hi!</h2>
						<div className='home-bio'>{home.full_intro}</div>
						<div className='home-actions home-actions--secondary'>
							<Link className='home-button home-button--primary' to='/contact' onClick={() => play("navigate")}>
								Start a conversation
							</Link>
							<Link className='home-text-link' to='/resume' onClick={() => play("navigate")}>
								See my resume <span aria-hidden='true'>→</span>
							</Link>
						</div>
					</div>
				</section>
				<button className={`home-rocket ${fly ? "home-rocket--flying" : ""}`} type='button' onClick={launchRocket} aria-label='Launch rocket and jump to introduction'>
					<img src={Rocket} alt='' />
				</button>
			</main>
		</Fragment>
	);
};

export default connect(() => ({}), null)(Home);
