/* REACT */
import React from "react";
import { useTitle } from "react-use";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiGlobe, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { resume } from "data";
import resumeData from "data/resume.json";

const profileIcons = {
	GitHub: FaGithub,
	LinkedIn: FaLinkedin,
};

const DateRange = ({ item }) => (
	<span className='resume-date'>
		{item.startDate}
		{item.endDate && item.endDate !== item.startDate ? ` – ${item.endDate}` : ""}
	</span>
);

const Entry = ({ item, project = false }) => (
	<article className='resume-entry'>
		<div className='resume-entry-heading'>
			<div>
				{project && item.url ? (
					<a href={item.url} target='_blank' rel='noreferrer'>
						{item.name}
					</a>
				) : item.companyUrl ? (
					<a href={item.companyUrl} target='_blank' rel='noreferrer'>
						{item.company}
					</a>
				) : (
					<strong>{item.name || item.company || item.institution}</strong>
				)}
				{item.position && <span className='resume-role'> · {item.position}</span>}
				{item.degree && (
					<span className='resume-role'>
						{" "}
						· {item.degree} in {item.area}
					</span>
				)}
			</div>
			<div className='resume-entry-meta'>
				<DateRange item={item} />
				{item.location && <span>{item.location}</span>}
			</div>
		</div>
		{item.description && <p>{item.description}</p>}
		{item.technologies?.length > 0 && <p className='resume-technologies'>{item.technologies.join(" · ")}</p>}
		{item.highlights?.length > 0 && (
			<ul>
				{item.highlights.map((highlight) => (
					<li key={highlight}>{highlight}</li>
				))}
			</ul>
		)}
	</article>
);

const Section = ({ title, children }) => (
	<section className='resume-section'>
		<h2>{title}</h2>
		{children}
	</section>
);

const Resume = () => {
	useTitle(resume.title);
	const { basics } = resumeData;

	return (
		<div className='resume'>
			<div className='resume-actions'>
				<button type='button' onClick={() => window.print()} aria-label='Print resume or save it as a PDF'>
					Print / save as PDF
				</button>
			</div>
			<main className='resume-sheet'>
				<header className='resume-header'>
					<h1>{basics.name}</h1>
					<p className='resume-label'>{basics.label}</p>
					<div className='resume-contact'>
						{basics.location && (
							<span>
								<FiMapPin aria-hidden='true' />
								{basics.location}
							</span>
						)}
						<a href={`mailto:${basics.email}`}>
							<FiMail aria-hidden='true' />
							{basics.email}
						</a>
						<a href={`tel:${basics.phone}`}>
							<FiPhone aria-hidden='true' />
							{basics.phone}
						</a>
						<a href={basics.website.url} target='_blank' rel='noreferrer'>
							<FiGlobe aria-hidden='true' />
							{basics.website.label}
						</a>
						{basics.profiles.map((profile) => {
							const ProfileIcon = profileIcons[profile.network] || FiGlobe;

							return (
								<a
									key={profile.network}
									href={profile.url}
									target='_blank'
									rel='noreferrer'
									aria-label={`${profile.network}: ${profile.username}`}
								>
									<ProfileIcon aria-hidden='true' />
									{profile.username}
								</a>
							);
						})}
					</div>
					<p className='resume-summary'>{basics.summary}</p>
				</header>

				<div className='resume-columns'>
					<div className='resume-primary'>
						<Section title='Experience'>
							{resumeData.experience.map((item) => (
								<Entry key={`${item.company}-${item.position}`} item={item} />
							))}
						</Section>
						<Section title='Projects'>
							{resumeData.projects.map((item) => (
								<Entry key={item.name} item={item} project />
							))}
						</Section>
					</div>
					<aside className='resume-sidebar'>
						<Section title='Education'>
							{resumeData.education.map((item) => (
								<Entry key={item.institution} item={item} />
							))}
						</Section>
						<Section title='Skills'>
							{resumeData.skills.map((skill) => (
								<p key={skill.name}>
									<strong>{skill.name}</strong>
									<br />
									{skill.keywords.join(", ")}
								</p>
							))}
						</Section>
						<Section title='Publications'>
							{resumeData.publications.map((item) => (
								<p key={item}>{item}</p>
							))}
						</Section>
						<Section title='Open Source'>
							<p>{resumeData.openSource.join(", ")}</p>
						</Section>
					</aside>
				</div>
			</main>
		</div>
	);
};

export default Resume;
