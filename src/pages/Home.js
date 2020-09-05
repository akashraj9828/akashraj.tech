/* REACT */
import React, { Fragment, useState, useEffect, useRef } from "react";

/* REACT-ROUTER */
import { Link } from "react-router-dom";

/* REDUX */
import { connect } from "react-redux";

/* HOOKS */
import { useTitle } from "react-use";

/* ICONS */
import MyImage from "assets/img/me.png";
import Rocket from "assets/img/rocket.png";

/* DATA */
import { home } from "data";

const Home = () => {
	useTitle(home.title)
	const part2 = useRef(null);
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			// some stuff    to do in dev
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [fly, setFly] = useState(false);

	const scrollToMiddle = (e) => {
		e && e.preventDefault();
		scrollToRef(part2);
		setFly(true);
	};
	return (
		<Fragment>
			<div className='home'>
				<section className='part1 vh-100 '>
					<div className='intro-container center'>
						<header className='intro h1 center flex-col'>
							<img src={MyImage} className='img img-fluid' alt={home.name} />
							<span className='text-center'>{home.heading}</span>
						</header>
						<div className='center'>
							<Link className='a button-cta' onClick={scrollToMiddle} to='#middle'>
								Know more
							</Link>
							<Link className='button-cta' target='' to='/resume'>
								Hire me
							</Link>
						</div>
					</div>
				</section>

				<section className='part2 vh-100 p-5 center' ref={part2}>
					<header className='hi'>Hi!</header>
					<div>
						<p className='bio center'>{home.full_intro}</p>
					</div>
					<div className='center flex-wrap'>
						<Link className='button-cta' to='/lab'>
							Projects
						</Link>
						<Link className='button-cta' to='/resume'>
							Hire me
						</Link>
						<Link className='button-cta' to='/contact'>
							Contact
						</Link>
					</div>
				</section>

				<img src={Rocket} className={`rocket slow-shaking ${fly && "fly"}`} onClick={scrollToMiddle} alt='Rocket' />
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, null)(Home);

// Helper function to scroll to a given ref
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
