import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "assets/img/logo.png";
import "./Header.scss";

import { FaSun as LightModeIcon, FaMoon as DarkModeIcon } from "react-icons/fa";
import { toggleTheme } from "../redux/actions/app";
const Header = ({ theme, dispatch }) => {
	/* OLD NAVBAR */
	return (
		<nav className={`navbar navbar-expand-sm px-4 pb-3 pt-0 ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
			<Link className='navbar-brand halucinate' to='/'>
				<img className='img img-fluid' id='logo' src={logo} alt='akash Logo' />
			</Link>
			<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>
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
					{/* <li className='nav-item'>
						<button className='btn mx-1 no-highlight' onClick={(_) => dispatch(toggleTheme())}>
							{theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
						</button>
					</li> */}
				</ul>
			</div>
		</nav>
	);
};
const mapStateToProps = (state) => {
	let { user, app } = state;
	return { userStatus: user.status, userId: user.userId, firstName: user.firstName, lastName: user.lastName, theme: app.theme };
};

export default connect(mapStateToProps, null)(Header);
