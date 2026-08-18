import { useEffect, useState } from "react";

const query = "(prefers-reduced-motion: reduce)";

export const useReducedMotion = () => {
	const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia?.(query).matches);

	useEffect(() => {
		const media = window.matchMedia?.(query);
		if (!media) return undefined;
		const update = () => setReduced(media.matches);
		update();
		media.addEventListener?.("change", update);
		return () => media.removeEventListener?.("change", update);
	}, []);

	return reduced;
};

