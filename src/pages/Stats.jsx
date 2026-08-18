import React, { useEffect, useMemo, useState } from "react";
import { FaCodeBranch, FaGithub, FaStar, FaUsers } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useTitle } from "react-use";
import { basic } from "data";

const githubApi = "https://api.github.com";

const formatNumber = (number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(number);

const Stats = () => {
	useTitle(`${basic.name} - GitHub Stats`);
	const [profile, setProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [error, setError] = useState("");
	const [contributionCalendar, setContributionCalendar] = useState(null);

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
		};
	}, [repos]);

	return (
		<main id='stats'>
			<header className='stats-title'>GitHub Stats</header>
			<section className='stats-intro'>
				<div className='intro-mark'><FaGithub /></div>
				<div className='intro-copy'>
					<span className='intro-kicker'><i /> <strong>@{basic.github}</strong> <b>PUBLIC PROFILE</b></span>
					<h1>Code in the open.</h1>
					<p>Projects, experiments, and open-source work—all in one live snapshot.</p>
				</div>
				<a className='github-button' href={`https://github.com/${basic.github}`} target='_blank' rel='noopener noreferrer'>Explore GitHub <FiArrowUpRight /></a>
			</section>

			{error && <div className='stats-message'>{error} <a href={`https://github.com/${basic.github}`}>Visit the GitHub profile instead.</a></div>}
			{!profile && !error && <div className='stats-message'>Loading public GitHub stats…</div>}

			{profile && <>
				<section className='stats-grid' aria-label='GitHub totals'>
					<div className='stat-card'><FaGithub /><strong>{formatNumber(profile.public_repos)}</strong><span>Public repositories</span></div>
					<div className='stat-card'><FaStar /><strong>{formatNumber(repositoryStats.stars)}</strong><span>Stars earned</span></div>
					<div className='stat-card'><FaCodeBranch /><strong>{formatNumber(repositoryStats.forks)}</strong><span>Repository forks</span></div>
					<div className='stat-card'><FaUsers /><strong>{formatNumber(profile.followers)}</strong><span>Followers</span></div>
				</section>

				<section className='contribution-panel'>
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

				<div className='stats-details'>
					<section className='stats-panel'>
						<h2>Most Starred</h2>
						<div className='repo-list'>{repositoryStats.topRepos.map((repo) => <a href={repo.html_url} target='_blank' rel='noopener noreferrer' key={repo.id} className='repo-row'><span><strong>{repo.name}</strong><small>{repo.description || "Public GitHub repository"}</small></span><span className='repo-stars'><FaStar /> {repo.stargazers_count}</span></a>)}</div>
					</section>
					<section className='stats-panel'>
						<h2>Languages</h2>
						<div className='language-list'>{repositoryStats.languages.map(([language, count]) => <div className='language-row' key={language}><span>{language}</span><span>{count} {count === 1 ? "repo" : "repos"}</span></div>)}</div>
					</section>
				</div>
				<p className='stats-source'>Live public data from the official GitHub API. Forked repositories are excluded from repository totals.</p>
			</>}
		</main>
	);
};

export default Stats;
