import React, { useEffect, useMemo, useState } from "react";
import { FaCodeBranch, FaGithub, FaStar, FaUsers } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useTitle } from "react-use";
import { basic } from "data";
import { useSound } from "../logic/audio/SoundProvider";
import { useAnimatedNumber } from "../logic/motion/useAnimatedNumber";
import { useReveal } from "../logic/motion/useReveal";

const githubApi = "https://api.github.com";

const formatNumber = (number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(number);

const LoadingStats = () => (
	<section className='stats-loading' aria-label='Loading public GitHub stats' aria-live='polite'>
		<span className='sr-only'>Loading public GitHub stats…</span>
		<div className='stats-grid' aria-hidden='true'>{Array.from({ length: 4 }, (_, index) => <div className='stat-card stat-card--loading' key={index}><i /></div>)}</div>
		<div className='contribution-panel contribution-panel--loading' aria-hidden='true'><i className='loading-line loading-line--title' /><i className='loading-calendar' /><i className='loading-line loading-line--short' /></div>
		<div className='stats-details' aria-hidden='true'>
			<div className='stats-panel stats-panel--loading'><i className='loading-line loading-line--title' />{Array.from({ length: 4 }, (_, index) => <i className='loading-line' key={index} />)}</div>
			<div className='stats-panel stats-panel--loading'><i className='loading-line loading-line--title' />{Array.from({ length: 4 }, (_, index) => <i className='loading-line' key={index} />)}</div>
		</div>
	</section>
);

const Stats = () => {
	useTitle(`${basic.name} - GitHub Stats`);
	const [profile, setProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [error, setError] = useState("");
	const [contributionCalendar, setContributionCalendar] = useState(null);
	const [projectView, setProjectView] = useState("starred");
	const { play } = useSound();
	const introReveal = useReveal();
	const activityReveal = useReveal({ threshold: 0.08 });
	const detailsReveal = useReveal({ threshold: 0.06 });

	useEffect(() => {
		const controller = new AbortController();

		const loadStats = async () => {
			try {
				const [profileResponse, reposResponse] = await Promise.all([
					fetch(`${githubApi}/users/${basic.github}`, { signal: controller.signal }),
					fetch(`${githubApi}/users/${basic.github}/repos?per_page=100&sort=updated`, { signal: controller.signal }),
				]);

				if (!profileResponse.ok || !reposResponse.ok) throw new Error("GitHub stats are temporarily unavailable.");

				const [profileData, repoData] = await Promise.all([profileResponse.json(), reposResponse.json()]);
				setProfile(profileData);
				setRepos(repoData.filter((repo) => !repo.fork));
			} catch (requestError) {
				if (requestError.name !== "AbortError") setError(requestError.message);
			}
		};

		loadStats();

		fetch(`https://gh-calendar.rschristian.dev/user/${basic.github}`, { signal: controller.signal })
			.then((response) => {
				if (!response.ok) throw new Error();
				return response.json();
			})
			.then(setContributionCalendar)
			.catch(() => {});

		return () => controller.abort();
	}, []);

	const repositoryStats = useMemo(() => {
		const languages = repos.reduce((totals, repo) => {
			if (repo.language) totals[repo.language] = (totals[repo.language] || 0) + 1;
			return totals;
		}, {});

		return {
			stars: repos.reduce((total, repo) => total + repo.stargazers_count, 0),
			forks: repos.reduce((total, repo) => total + repo.forks_count, 0),
			languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 6),
			topRepos: [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count).slice(0, 6),
			recentRepos: [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 6),
		};
	}, [repos]);
	const projectRepos = projectView === "starred" ? repositoryStats.topRepos : repositoryStats.recentRepos;
	const animatedRepos = useAnimatedNumber(profile?.public_repos || 0);
	const animatedStars = useAnimatedNumber(repositoryStats.stars);
	const animatedForks = useAnimatedNumber(repositoryStats.forks);
	const animatedFollowers = useAnimatedNumber(profile?.followers || 0);
	const changeProjectView = (view) => {
		if (view === projectView) return;
		play("toggle");
		setProjectView(view);
	};

	return (
		<main id='stats'>
			<section ref={introReveal.ref} style={introReveal.style} className={`stats-intro ${introReveal.className}`}>
				<div className='intro-mark' aria-hidden='true'><FaGithub /></div>
				<div className='intro-copy'>
					<p className='intro-kicker'>GitHub profile · @{basic.github}</p>
					<h1>A living record of the work.</h1>
					<p>Projects, experiments, and open-source contributions, updated from GitHub.</p>
				</div>
				<a className='github-button' href={`https://github.com/${basic.github}`} target='_blank' rel='noopener noreferrer'>Explore GitHub <FiArrowUpRight /></a>
			</section>

			{error && <div className='stats-message'>{error} <a href={`https://github.com/${basic.github}`}>Visit the GitHub profile instead.</a></div>}
			{!profile && !error && <LoadingStats />}

			{profile && <div className='stats-content'>
				<section className='stats-grid' aria-label='GitHub totals'>
					<div className='stat-card'><FaGithub /><strong>{formatNumber(animatedRepos)}</strong><span>Public repositories</span></div>
					<div className='stat-card'><FaStar /><strong>{formatNumber(animatedStars)}</strong><span>Stars earned</span></div>
					<div className='stat-card'><FaCodeBranch /><strong>{formatNumber(animatedForks)}</strong><span>Repository forks</span></div>
					<div className='stat-card'><FaUsers /><strong>{formatNumber(animatedFollowers)}</strong><span>Followers</span></div>
				</section>

				<section ref={activityReveal.ref} style={activityReveal.style} className={`contribution-panel ${activityReveal.className}`}>
					<div className='contribution-heading'>
						<h2>Contribution Activity</h2>
						{contributionCalendar && <span>{formatNumber(contributionCalendar.total)} contributions in the last year</span>}
					</div>
					{contributionCalendar ? <>
						<div className='contribution-scroll' role='img' aria-label={`${contributionCalendar.total} GitHub contributions in the last year`}>
							<div className='contribution-calendar'>
								{contributionCalendar.contributions.flatMap((week) => week).map((day) => <span key={day.date} className={`contribution-day intensity-${day.intensity}`} title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`} />)}
							</div>
						</div>
						<div className='contribution-legend'><span>Less</span>{[0, 1, 2, 3, 4].map((intensity) => <i key={intensity} className={`contribution-day intensity-${intensity}`} />)}<span>More</span></div>
					</> : <p className='contribution-loading'>Loading contribution activity…</p>}
				</section>

				<div ref={detailsReveal.ref} style={detailsReveal.style} className={`stats-details ${detailsReveal.className}`}>
					<section className='stats-panel'>
						<div className='panel-heading'>
							<div><h2>Projects</h2><p>Public repositories from GitHub.</p></div>
							<div className='project-tabs' role='tablist' aria-label='Project list'>
								<button type='button' role='tab' aria-selected={projectView === "starred"} className={projectView === "starred" ? "is-active" : ""} onClick={() => changeProjectView("starred")}>Most starred</button>
								<button type='button' role='tab' aria-selected={projectView === "recent"} className={projectView === "recent" ? "is-active" : ""} onClick={() => changeProjectView("recent")}>Recently updated</button>
							</div>
						</div>
						<div className='repo-list repo-list--switching' role='tabpanel' key={projectView}>{projectRepos.length ? projectRepos.map((repo) => <a href={repo.html_url} target='_blank' rel='noopener noreferrer' key={repo.id} className='repo-row'><span><strong>{repo.name}</strong><small>{repo.description || "Public GitHub repository"}</small></span><span className='repo-stars'><FaStar aria-hidden='true' /> {repo.stargazers_count}</span></a>) : <p className='panel-empty'>No public repositories found.</p>}</div>
					</section>
					<section className='stats-panel'>
						<h2>Languages</h2>
					<div className='language-list'>{repositoryStats.languages.length ? repositoryStats.languages.map(([language, count]) => <div className='language-row' key={language}><span>{language}</span><span>{count} {count === 1 ? "repo" : "repos"}</span></div>) : <p className='panel-empty'>No language data available.</p>}</div>
					</section>
				</div>
				<p className='stats-source'>Live public data from the official GitHub API. Forked repositories are excluded from repository totals.</p>
			</div>}
		</main>
	);
};

export default Stats;
