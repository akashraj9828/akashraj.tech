import React from "react";
import "./Loader.scss";
import { RiLoader2Line as LoaderSmall } from "react-icons/ri";
import loader from "assets/img/me.png";
export const FullScreenLoader = ({ msg }) => {
	return (
		<div className='full-screen-loader'>
			<span className='anim-loader svg-color-white'>
				<LoaderSmall fontSize={100} />
			</span>
			{msg && <h5 className='text-center text-white my-5'>{msg}</h5>}
		</div>
	);
};
export const SectionLoader = ({ msg }) => {
	return (
		<div className='section-loader pt-5'>
			<span className='svg-color-white'>
				{/* <LoaderSmall fontSize={100} /> */}
				<img src={loader} alt='loader' />
			</span>
			{msg && <h5 className='text-center my-5'>{msg}</h5>}
		</div>
	);
};
