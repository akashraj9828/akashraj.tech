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

const Home = () => {
	useTitle(home.title);
	const introduction = useRef(null);
	const [fly, setFly] = useState(false);

	const scrollToIntroduction = (event) => {
		event.preventDefault();
		setFly(true);
		introduction.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		window.setTimeout(() => introduction.current?.focus(), 500);
	};

	return (
		<Fragment>
			<main className='home'>
				<section className='home-hero' aria-labelledby='home-title'>
					<div className='home-hero__content'>
						<img src={MyImage} className='home-portrait' alt={`Portrait of ${home.name}`} />
						<p className='home-eyebrow'>Hello, I&apos;m {home.firstName}.</p>
						<h1 id='home-title'>{home.heading}</h1>
						<p className='home-summary'>I build thoughtful products, from dependable systems to polished interfaces.</p>
						<div className='home-actions' aria-label='Explore my work'>
							<a className='home-button home-button--primary' href='#introduction' onClick={scrollToIntroduction}>
								About me <span aria-hidden='true'>↓</span>
							</a>
							<Link className='home-button home-button--quiet' to='/lab'>View projects</Link>
						</div>
					</div>
				</section>

				<section className='home-introduction' id='introduction' ref={introduction} tabIndex='-1' aria-labelledby='introduction-title'>
					<div className='home-introduction__inner'>
						<p className='home-eyebrow'>A little more</p>
						<h2 id='introduction-title'>Hi, I&apos;m Akash.</h2>
						<div className='home-bio'>{home.full_intro}</div>
						<div className='home-actions home-actions--secondary'>
							<Link className='home-button home-button--primary' to='/contact'>Start a conversation</Link>
							<Link className='home-text-link' to='/resume'>See my resume <span aria-hidden='true'>→</span></Link>
						</div>
					</div>
				</section>
				<button className={`home-rocket ${fly ? "home-rocket--flying" : ""}`} type='button' onClick={scrollToIntroduction} aria-label='Launch rocket and jump to introduction'>
					<img src={Rocket} alt='' />
				</button>
			</main>
		</Fragment>
	);
};

export default connect(() => ({}), null)(Home);
