/* REACT */
import React from "react";
/* DATA */
import { footer } from "data";
import { AiOutlineCopyright as IconCopyright } from "react-icons/ai";
import { RiCodeSSlashFill as IconCode } from "react-icons/ri";

const Footer = () => (
	<footer className='site-footer footer'>
		<div className='footer-inner'>
			<a href={footer.fullWebsite} target='_blank' rel='noopener noreferrer'>
				<IconCopyright aria-hidden='true' /> <span>{footer.name}</span>
			</a>
			<span className='divider' aria-hidden='true' />
			<a href={footer.sourceCodeUrl} target='_blank' rel='noopener noreferrer'>
				<IconCode aria-hidden='true' /> <span>View source</span>
			</a>
		</div>
	</footer>
);

export default Footer;
