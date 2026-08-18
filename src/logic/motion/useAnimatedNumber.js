import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export const useAnimatedNumber = (value, duration = 450) => {
	const reducedMotion = useReducedMotion();
	const [displayValue, setDisplayValue] = useState(reducedMotion ? value : 0);

	useEffect(() => {
		if (reducedMotion || !value) {
			setDisplayValue(value);
			return undefined;
		}
		let frame;
		const startedAt = performance.now();
		const update = (now) => {
			const progress = Math.min((now - startedAt) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setDisplayValue(Math.round(value * eased));
			if (progress < 1) frame = requestAnimationFrame(update);
		};
		frame = requestAnimationFrame(update);
		return () => cancelAnimationFrame(frame);
	}, [duration, reducedMotion, value]);

	return displayValue;
};

