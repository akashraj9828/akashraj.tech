import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "assets/img/logo.png";
import "./Header.scss";
import { RiLogoutCircleRLine as LogOutIcon } from "react-icons/ri";
import { RiLoginCircleLine as LogInIcon } from "react-icons/ri";

import { FaSun as LightModeIcon, FaMoon as DarkModeIcon } from "react-icons/fa";
import { toggleTheme } from "../redux/actions/app";
const Header = ({ userId, firstName, lastName, userStatus, theme, dispatch }) => {
	/* OLD NAVBAR */
	return (
		<nav className={`navbar ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
			<Link className='navbar-brand' to='/'>
				<img src={logo} className='d-inline-block align-top' alt='Akash Logo' />
			</Link>
			<ul className='navbar-nav'>
				<li className='nav-item'>
					<button className='btn mx-1 no-highlight' onClick={(_) => dispatch(toggleTheme())}>
						{theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
					</button>
				</li>
			</ul>
		</nav>
	);
};
const mapStateToProps = (state) => {
	let { user, app } = state;
	return { userStatus: user.status, userId: user.userId, firstName: user.firstName, lastName: user.lastName, theme: app.theme };
};

export default connect(mapStateToProps, null)(Header);
