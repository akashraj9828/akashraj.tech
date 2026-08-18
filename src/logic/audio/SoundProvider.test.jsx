import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { SoundProvider, SOUND_PREFERENCE_KEY, useSound } from "./SoundProvider";
import { playMicroSound } from "./microSounds";

vi.mock("./microSounds", () => ({ playMicroSound: vi.fn() }));

const SoundProbe = () => {
	const { enabled, play, toggle } = useSound();
	return <>
		<span>{enabled ? "enabled" : "muted"}</span>
		<button type='button' onClick={() => play("navigate")}>Play</button>
		<button type='button' onClick={toggle}>Toggle</button>
	</>;
};

describe("SoundProvider", () => {
	beforeEach(() => {
		window.localStorage.clear();
		vi.mocked(playMicroSound).mockClear();
	});

	test("defaults to enabled but stays silent until an interaction asks for a cue", () => {
		render(<SoundProvider><SoundProbe /></SoundProvider>);
		expect(screen.getByText("enabled")).toBeInTheDocument();
		expect(playMicroSound).not.toHaveBeenCalled();
		fireEvent.click(screen.getByRole("button", { name: "Play" }));
		expect(playMicroSound).toHaveBeenCalledWith("navigate");
	});

	test("honors a saved muted preference and previews sound when re-enabled", () => {
		window.localStorage.setItem(SOUND_PREFERENCE_KEY, "false");
		render(<React.StrictMode><SoundProvider><SoundProbe /></SoundProvider></React.StrictMode>);
		expect(screen.getByText("muted")).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Play" }));
		expect(playMicroSound).not.toHaveBeenCalled();
		fireEvent.click(screen.getByRole("button", { name: "Toggle" }));
		expect(window.localStorage.getItem(SOUND_PREFERENCE_KEY)).toBe("true");
		expect(playMicroSound).toHaveBeenCalledWith("enable");
		expect(playMicroSound).toHaveBeenCalledTimes(1);
	});
});
