import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export const useReveal = ({ delay = 0, threshold = 0.12 } = {}) => {
	const [node, setNode] = useState(null);
	const ref = useCallback((element) => setNode(element), []);
	const reducedMotion = useReducedMotion();
	const [visible, setVisible] = useState(reducedMotion || typeof IntersectionObserver === "undefined");

	useEffect(() => {
		if (reducedMotion || typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return undefined;
		}
		if (!node) return undefined;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold, rootMargin: "0px 0px -6%" },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [node, reducedMotion, threshold]);

	return {
		ref,
		className: `motion-reveal${visible ? " is-visible" : ""}`,
		style: { "--motion-delay": `${delay}ms` },
	};
};
