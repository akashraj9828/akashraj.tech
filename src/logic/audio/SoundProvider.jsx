import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { playMicroSound } from "./microSounds";

export const SOUND_PREFERENCE_KEY = "interface_sounds_enabled";

const SoundContext = createContext({
	enabled: true,
	play: () => {},
	toggle: () => {},
});

const readPreference = () => {
	try {
		return window.localStorage.getItem(SOUND_PREFERENCE_KEY) !== "false";
	} catch {
		return true;
	}
};

export const SoundProvider = ({ children }) => {
	const [enabled, setEnabled] = useState(readPreference);

	const play = useCallback((cue) => {
		if (enabled) void playMicroSound(cue);
	}, [enabled]);

	const toggle = useCallback(() => {
		const next = !enabled;
		try {
			window.localStorage.setItem(SOUND_PREFERENCE_KEY, String(next));
		} catch {
			// Persistence is optional; the in-memory preference still works.
		}
		setEnabled(next);
		if (next) void playMicroSound("enable");
	}, [enabled]);

	const value = useMemo(() => ({ enabled, play, toggle }), [enabled, play, toggle]);
	return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};

SoundProvider.propTypes = { children: PropTypes.node.isRequired };

export const useSound = () => useContext(SoundContext);
