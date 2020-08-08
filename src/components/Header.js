import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "assets/img/logo.png";

import { FaSun as LightModeIcon, FaMoon as DarkModeIcon } from "react-icons/fa";
import { toggleTheme } from "../redux/actions/app";

import { RiMenuLine as HamburgerIcon } from "react-icons/ri";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
// MObile nav idea
// https://codepen.io/hexagoncircle/pen/XdoLYw?editors=1100

const Header = ({ theme, dispatch }) => {
	/* OLD NAVBAR */
	const [mobileNavBarOpen, setMobileNavBarOpen] = useState(false);
	return (
		<nav className={`navbar navbar-expand-md px-4 pb-3 pt-0`}>
			<Link className='navbar-brand halucinate' to='/'>
				<img className='img img-fluid' id='logo' src={logo} alt='akash Logo' />
			</Link>

			<div className={`mobile-nav-container ${mobileNavBarOpen ? "show" : "hide"}`}>
				<div className='mobile-nav-backdrop'>
					<div className='mobile-nav'>
						<NavLink to='/' className='nav-link' activeClassName='active' exact={true} onClick={() => setMobileNavBarOpen(false)}>
							HOME{" "}
						</NavLink>

						<NavLink to='/work' className='nav-link' activeClassName='active' exact={true} onClick={() => setMobileNavBarOpen(false)}>
							WORK
						</NavLink>

						<a href='https://gitstats.me/akashraj9828?ref=akashraj.tech' className='nav-link' onClick={() => setMobileNavBarOpen(false)}>
							STATS
						</a>

						<NavLink to='/resume' className='nav-link' activeClassName='active' exact={true} onClick={() => setMobileNavBarOpen(false)}>
							HIRE ME
						</NavLink>

						<NavLink to='/contact' className='nav-link' activeClassName='active' exact={true} onClick={() => setMobileNavBarOpen(false)}>
							CONTACT
						</NavLink>
					</div>
				</div>
			</div>
			<div className='collapse navbar-collapse'>
				<ul className='nav navbar-nav nav-fill w-100 h3'>
					<li className='nav-item'>
						<NavLink to='/' className='nav-link' activeClassName='active' exact={true}>
							HOME{" "}
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='/work' className='nav-link' activeClassName='active' exact={true}>
							WORK
						</NavLink>
					</li>

					<li className='nav-item'>
						<a href='https://gitstats.me/akashraj9828?ref=akashraj.tech' className='nav-link'>
							STATS
						</a>
					</li>
					<li className='nav-item'>
						<NavLink to='/resume' className='nav-link' activeClassName='active' exact={true}>
							HIRE ME
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='/contact' className='nav-link' activeClassName='active' exact={true}>
							CONTACT
						</NavLink>
					</li>
				</ul>
			</div>
			<div className='floating-buttons'>
				<button className={`btn theme-changer`} onClick={(_) => dispatch(toggleTheme())}>
					{theme === "dark" ? <LightModeIcon size='1.5rem' /> : <DarkModeIcon size='1.5rem' />}
				</button>
				<button className='btn navbar-toggler ' onClick={() => setMobileNavBarOpen((s) => !s)} type='button' aria-label='Toggle navigation'>
					{mobileNavBarOpen ? <CloseIcon size='1.5rem' /> : <HamburgerIcon size='1.5rem' />}
				</button>
			</div>
		</nav>
	);
};
const mapStateToProps = (state) => {
	let { user, app } = state;
	return { userStatus: user.status, userId: user.userId, firstName: user.firstName, lastName: user.lastName, theme: app.theme };
};

export default connect(mapStateToProps, null)(Header);
