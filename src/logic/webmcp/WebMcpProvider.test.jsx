import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import resumeData from "data/resume.json";
import WebMcpProvider, { createWebMcpTools, registerWebMcpTools } from "./WebMcpProvider";

const parseResult = (result) => JSON.parse(result.content[0].text);

describe("WebMCP portfolio tools", () => {
	test("derives owner details from resume data", () => {
		const tools = createWebMcpTools({ navigate: vi.fn() });
		const overview = tools.find(({ name }) => name === "get_portfolio_overview");
		const result = parseResult(overview.execute());

		expect(result.name).toBe(resumeData.basics.name);
		expect(result.summary).toBe(resumeData.basics.summary);
		expect(overview.description).toContain(resumeData.basics.name);
	});

	test("registers tools while the provider is mounted", () => {
		const modelContext = {
			registerTool: vi.fn(),
			unregisterTool: vi.fn(),
		};
		Object.defineProperty(window.navigator, "modelContext", {
			configurable: true,
			value: modelContext,
		});

		const { unmount } = render(
			<MemoryRouter>
				<WebMcpProvider>
					<p>Portfolio</p>
				</WebMcpProvider>
			</MemoryRouter>,
		);

		expect(modelContext.registerTool).toHaveBeenCalledTimes(5);
		unmount();
		expect(modelContext.unregisterTool).toHaveBeenCalledTimes(5);
		delete window.navigator.modelContext;
	});

	test("registers and unregisters every tool", () => {
		const modelContext = {
			registerTool: vi.fn(),
			unregisterTool: vi.fn(),
		};
		const tools = createWebMcpTools({ navigate: vi.fn() });

		const unregister = registerWebMcpTools(tools, modelContext);
		unregister();

		expect(modelContext.registerTool).toHaveBeenCalledTimes(tools.length);
		expect(modelContext.unregisterTool).toHaveBeenCalledTimes(tools.length);
		expect(modelContext.unregisterTool).toHaveBeenCalledWith("get_portfolio_overview");
	});

	test("is a no-op in browsers without WebMCP support", () => {
		const unregister = registerWebMcpTools(createWebMcpTools({ navigate: vi.fn() }), undefined);

		expect(unregister).toBeTypeOf("function");
		expect(() => unregister()).not.toThrow();
	});

	test("searches projects and returns machine-readable links", () => {
		const tools = createWebMcpTools({ navigate: vi.fn() });
		const searchProjects = tools.find(({ name }) => name === "search_portfolio_projects");

		const result = parseResult(searchProjects.execute({ query: "git", limit: 1 }));

		expect(result.count).toBe(1);
		expect(result.projects[0]).toMatchObject({
			name: "Git - Stats",
			liveUrl: "https://gitstats.me",
			sourceUrl: "https://github.com/akashraj9828/gitstats",
		});
	});

	test("navigates only to a known portfolio section", () => {
		const navigate = vi.fn();
		const tools = createWebMcpTools({ navigate });
		const navigatePortfolio = tools.find(({ name }) => name === "navigate_portfolio");

		expect(parseResult(navigatePortfolio.execute({ section: "projects" }))).toEqual({
			success: true,
			section: "projects",
			path: "/lab",
		});
		expect(parseResult(navigatePortfolio.execute({ section: "elsewhere" }))).toEqual({
			success: false,
			error: "Unknown portfolio section.",
		});
		expect(navigate).toHaveBeenCalledOnce();
		expect(navigate).toHaveBeenCalledWith("/lab");
	});
});
