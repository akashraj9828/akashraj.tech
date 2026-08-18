/* REACT */
import React, { Fragment } from "react";
/* REDUX */
import { connect } from "react-redux";
/* HOOKS */
import { useTitle } from "react-use";
/* DATA */
import { contact } from "data";

const Contact = () => {
	useTitle(contact.title);

	return (
		<Fragment>
			<main className='contact-page'>
				<section className='contact-hero' aria-labelledby='contact-title'>
					<div className='contact-copy'>
						<p className='contact-eyebrow'>Let&apos;s work together</p>
						<h1 id='contact-title'>Hello there.</h1>
						<p className='contact-lede'>Have a project, opportunity, or good recommendation to share? I&apos;d love to hear from you.</p>
						<a className='contact-email' href={`mailto:${contact.email}`}>
							<span>Email me</span>
							<strong>{contact.email}</strong>
						</a>
					</div>

					<aside className='contact-card' aria-labelledby='contact-reasons-title'>
						<h2 id='contact-reasons-title'>A good reason to say hello</h2>
						<ul>
							{contact.contact_reasons.map((reason, index) => <li key={index}>{reason}</li>)}
						</ul>
						{contact.contact_form && (
							<a className='contact-form-link' href={contact.contact_form} target='_blank' rel='noopener noreferrer'>
								Prefer a form? Open the contact form <span aria-hidden='true'>↗</span>
							</a>
						)}
					</aside>
				</section>

				<section className='contact-socials' aria-labelledby='social-title'>
					<div>
						<p className='contact-eyebrow'>Elsewhere</p>
						<h2 id='social-title'>Find me around the web.</h2>
					</div>
					<nav aria-label='Social profiles'>
						{contact.socials.map(({ name, link, img_src }) => (
							<a key={name} href={link} target={link.startsWith("http") ? '_blank' : undefined} rel={link.startsWith("http") ? 'noopener noreferrer' : undefined} aria-label={`${contact.name} on ${name}`}>
								<img src={img_src} alt='' />
								<span>{name}</span>
							</a>
						))}
					</nav>
				</section>
			</main>
		</Fragment>
	);
};

export default connect(() => ({}), null)(Contact);
