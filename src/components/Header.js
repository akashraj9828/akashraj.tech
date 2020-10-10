/* REACT */
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

/* REDUX */
import { toggleTheme } from "../redux/actions/app";

/* ICONS */
import logo from "assets/img/logo.png";
import { RiSunLine as LightModeIcon } from "react-icons/ri";
import { FaRegMoon as DarkModeIcon } from "react-icons/fa";
import { RiMenuLine as HamburgerIcon } from "react-icons/ri";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

/* DATA */
import { header, home } from "data";
import MyImage from "assets/img/me.png";

const Header = ({ theme, dispatch }) => {
	const [mobileNavBarOpen, setMobileNavBarOpen] = useState(false);
	return (
		<nav className={`navbar navbar-expand-md px-4 pb-3 pt-0`}>
			<Link className='navbar-brand halucinate' to='/'>
				<img className='img img-fluid' id='logo' src={logo} alt='akash Logo' />
			</Link>

			<div className={`mobile-nav-container ${mobileNavBarOpen ? "show" : "hide"}`}>
				<div className='mobile-nav-backdrop'>

					<div className='mobile-nav ml-4 w-100'>
						<img src={MyImage} className='img img-fluid img-thumb img-round mb-2' alt={home.name} />
						<span class="name">{home.name}</span>
						<span class="alias" >@{home.internet_alias}</span>
						{header.navItems.map((e, i) => {
							if (e.direct) {
								return (
									<a href={e.to} key={i} className='nav-link' target='_blank' rel='noopener noreferrer'>
									<span className="mr-3"> {e.icon} </span>	{e.label}
									</a>
								);
							} else {
								return (
									<NavLink to={e.to} key={i} className='nav-link' activeClassName='active' exact={true} onClick={() => setMobileNavBarOpen(false)}>
										<span className="mr-3"> {e.icon} </span>	{e.label}
									</NavLink>
								);
							}
						})}
					</div>
				</div>
			</div>
			<div className='collapse navbar-collapse'>
				<ul className='nav navbar-nav nav-fill w-100 h3'>
					{header.navItems.map((e, i) => {
						if (e.direct) {
							return (
								<li className='nav-item' key={i}>
									<a href={e.to} className='nav-link' target='_blank' rel='noopener noreferrer'>
									<span className="icon mr-3"> {e.icon} </span>{e.label}
									</a>
								</li>
							);
						} else {
							return (
								<li className='nav-item' key={i}>
									<NavLink to={e.to} className='nav-link' activeClassName='active' exact={true}>
									<span className="icon mr-3"> {e.icon} </span>{e.label}
									</NavLink>
								</li>
							);
						}
					})}
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
	let { app } = state;
	return { theme: app.theme };
};

export default connect(mapStateToProps, null)(Header);
