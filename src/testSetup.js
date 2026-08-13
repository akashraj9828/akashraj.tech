import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("react-pdf", () => ({
	Document: ({ children }) => children,
	Page: () => null,
	pdfjs: { GlobalWorkerOptions: {}, version: "test" },
}));
