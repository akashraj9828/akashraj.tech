/* REACT */
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

/* REDUX */
import { toggleTheme } from "../redux/actions/app";

/* ICONS */
import logo from "assets/img/logo.png";
import { RiSunLine as LightModeIcon, RiMenuLine as HamburgerIcon } from "react-icons/ri";
import { FaRegMoon as DarkModeIcon } from "react-icons/fa";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

/* DATA */
import { header } from "data";

const Header = ({ theme, dispatch }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuButton = useRef(null);
	const wasMenuOpen = useRef(false);

	useEffect(() => {
		const onKeyDown = (event) => {
			if (event.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	useEffect(() => {
		if (wasMenuOpen.current && !menuOpen) menuButton.current?.focus({ preventScroll: true });
		wasMenuOpen.current = menuOpen;
	}, [menuOpen]);

	const closeMenu = () => setMenuOpen(false);
	const renderItems = (className, onNavigate) => header.navItems.map((item, index) => {
		const contents = <><span className='nav-icon' aria-hidden='true'>{item.icon}</span><span>{item.label}</span></>;
		if (item.direct) {
			return (
				<a href={item.to} key={index} className={className} target='_blank' rel='noopener noreferrer' onClick={onNavigate}>
					{contents}
				</a>
			);
		}
		return (
			<NavLink to={item.to} key={index} end className={({ isActive }) => `${className}${isActive ? " active" : ""}`} onClick={onNavigate}>
				{contents}
			</NavLink>
		);
	});

	return (
		<header className='site-header'>
			<nav className='navbar' aria-label='Primary navigation'>
				<Link className='navbar-brand' to='/' aria-label='Akash Raj — home'>
					<img id='logo' src={logo} alt='' />
				</Link>

				<div className='desktop-navigation'>{renderItems('nav-link')}</div>

				<div className='header-actions'>
					<button className='theme-changer' type='button' onClick={() => dispatch(toggleTheme())} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
						{theme === "dark" ? <LightModeIcon aria-hidden='true' /> : <DarkModeIcon aria-hidden='true' />}
					</button>
					<button ref={menuButton} className='navbar-toggler' onClick={() => setMenuOpen((open) => !open)} type='button' aria-expanded={menuOpen} aria-controls='mobile-navigation' aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
						{menuOpen ? <CloseIcon aria-hidden='true' /> : <HamburgerIcon aria-hidden='true' />}
					</button>
				</div>
			</nav>

			<div id='mobile-navigation' className={`mobile-nav-container${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
				<button className='mobile-nav-backdrop' type='button' tabIndex={menuOpen ? 0 : -1} aria-label='Close navigation menu' onClick={closeMenu} />
				<div className='mobile-nav' role='dialog' aria-modal='true' aria-label='Navigation menu'>
					<p className='mobile-nav-label'>Navigate</p>
					{renderItems('nav-link', closeMenu)}
				</div>
			</div>
		</header>
	);
};

const mapStateToProps = (state) => ({ theme: state.app.theme });

export default connect(mapStateToProps, null)(Header);
