import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { basic, contact, home, work } from "data";
import resumeData from "data/resume.json";

const emptyInputSchema = {
	type: "object",
	properties: {},
	additionalProperties: false,
};

const pageRoutes = {
	home: "/",
	projects: "/lab",
	stats: "/stats",
	resume: "/resume",
	contact: "/contact",
};

const portfolioOwner = resumeData.basics.name || basic.name;

const textResult = (value) => ({
	content: [
		{
			type: "text",
			text: JSON.stringify(value),
		},
	],
});

const projectDetails = ({ name, link_code, link_live }) => ({
	name,
	liveUrl: link_live || null,
	sourceUrl: link_code || null,
});

export const createWebMcpTools = ({ navigate }) => [
	{
		name: "get_portfolio_overview",
		description: `Get a concise overview of ${portfolioOwner}, current work, and the sections available on this portfolio.`,
		inputSchema: emptyInputSchema,
		execute: () =>
			textResult({
				name: portfolioOwner,
				headline: home.heading,
				summary: resumeData.basics.summary,
				currentCompany: {
					name: basic.currentCompany,
					url: basic.currentCompanyLink,
				},
				website: basic.fullWebsite,
				availableSections: Object.keys(pageRoutes),
			}),
	},
	{
		name: "search_portfolio_projects",
		description: `List or search the projects and experiments in ${portfolioOwner}'s portfolio, including live and source-code links.`,
		inputSchema: {
			type: "object",
			properties: {
				query: {
					type: "string",
					description: "Optional case-insensitive text to match against project names.",
				},
				limit: {
					type: "integer",
					minimum: 1,
					maximum: 15,
					default: 15,
					description: "Maximum number of projects to return.",
				},
			},
			additionalProperties: false,
		},
		execute: ({ query = "", limit = 15 } = {}) => {
			const normalizedQuery = query.trim().toLowerCase();
			const normalizedLimit = Math.min(Math.max(Number(limit) || 15, 1), 15);
			const projects = work.projects
				.filter(({ name }) => name.toLowerCase().includes(normalizedQuery))
				.slice(0, normalizedLimit)
				.map(projectDetails);

			return textResult({ query, count: projects.length, projects });
		},
	},
	{
		name: "get_portfolio_resume",
		description: `Get structured resume information for ${portfolioOwner}, optionally limited to one resume section.`,
		inputSchema: {
			type: "object",
			properties: {
				section: {
					type: "string",
					enum: ["all", "basics", "experience", "projects", "education", "skills"],
					default: "all",
					description: "The resume section to return.",
				},
			},
			additionalProperties: false,
		},
		execute: ({ section = "all" } = {}) => {
			if (section === "all") return textResult(resumeData);
			return textResult({ [section]: resumeData[section] });
		},
	},
	{
		name: "get_portfolio_contact_options",
		description: `Get the public ways to contact or follow ${portfolioOwner}. This tool does not send a message or open an external site.`,
		inputSchema: emptyInputSchema,
		execute: () =>
			textResult({
				email: contact.email,
				contactForm: contact.contact_form,
				socialProfiles: contact.socials.map(({ name, link }) => ({ name, url: link })),
			}),
	},
	{
		name: "navigate_portfolio",
		description: `Navigate the current portfolio tab to a named section. This only changes pages within ${basic.website}.`,
		inputSchema: {
			type: "object",
			properties: {
				section: {
					type: "string",
					enum: Object.keys(pageRoutes),
					description: "Portfolio section to open.",
				},
			},
			required: ["section"],
			additionalProperties: false,
		},
		execute: ({ section } = {}) => {
			const path = pageRoutes[section];
			if (!path) return textResult({ success: false, error: "Unknown portfolio section." });

			navigate(path);
			return textResult({ success: true, section, path });
		},
	},
];

export const registerWebMcpTools = (tools, modelContext = globalThis.navigator?.modelContext) => {
	if (typeof modelContext?.registerTool !== "function") return () => {};

	const registeredToolNames = [];

	tools.forEach((tool) => {
		try {
			modelContext.registerTool(tool);
			registeredToolNames.push(tool.name);
		} catch (error) {
			console.warn(`Unable to register WebMCP tool: ${tool.name}`, error);
		}
	});

	return () => {
		if (typeof modelContext.unregisterTool !== "function") return;

		registeredToolNames.forEach((toolName) => {
			try {
				modelContext.unregisterTool(toolName);
			} catch (error) {
				console.warn(`Unable to unregister WebMCP tool: ${toolName}`, error);
			}
		});
	};
};

const WebMcpProvider = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => registerWebMcpTools(createWebMcpTools({ navigate })), [navigate]);

	return children;
};

export default WebMcpProvider;
