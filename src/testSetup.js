import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });

vi.mock("react-pdf", () => ({
	Document: ({ children }) => children,
	Page: () => null,
	pdfjs: { GlobalWorkerOptions: {}, version: "test" },
}));
