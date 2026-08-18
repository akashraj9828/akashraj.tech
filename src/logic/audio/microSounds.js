let audioContext;

const getAudioContext = () => {
	if (typeof window === "undefined") return null;
	const AudioContextClass = window.AudioContext || window.webkitAudioContext;
	if (!AudioContextClass) return null;
	audioContext ||= new AudioContextClass();
	return audioContext;
};

const tone = (context, { at = 0, duration = 0.07, from = 440, to = from, gain = 0.022, type = "sine" }) => {
	const start = context.currentTime + at;
	const oscillator = context.createOscillator();
	const volume = context.createGain();
	oscillator.type = type;
	oscillator.frequency.setValueAtTime(from, start);
	oscillator.frequency.exponentialRampToValueAtTime(Math.max(to, 1), start + duration);
	volume.gain.setValueAtTime(0.0001, start);
	volume.gain.exponentialRampToValueAtTime(gain, start + 0.012);
	volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
	oscillator.connect(volume);
	volume.connect(context.destination);
	oscillator.start(start);
	oscillator.stop(start + duration + 0.02);
};

const cuePlayers = {
	navigate: (context) => tone(context, { from: 480, to: 620, duration: 0.055, gain: 0.018 }),
	toggle: (context) => tone(context, { from: 330, to: 420, duration: 0.065, gain: 0.017, type: "triangle" }),
	themeLight: (context) => {
		tone(context, { from: 520, to: 620, duration: 0.08, gain: 0.018 });
		tone(context, { at: 0.045, from: 700, to: 820, duration: 0.09, gain: 0.015 });
	},
	themeDark: (context) => {
		tone(context, { from: 700, to: 610, duration: 0.08, gain: 0.016 });
		tone(context, { at: 0.045, from: 480, to: 390, duration: 0.1, gain: 0.018 });
	},
	enable: (context) => {
		tone(context, { from: 620, to: 700, duration: 0.11, gain: 0.018 });
		tone(context, { at: 0.07, from: 820, to: 940, duration: 0.13, gain: 0.015 });
	},
	launch: (context) => {
		tone(context, { from: 115, to: 880, duration: 0.48, gain: 0.028, type: "sawtooth" });
		tone(context, { at: 0.035, from: 180, to: 1100, duration: 0.38, gain: 0.012, type: "sine" });
	},
};

export const playMicroSound = async (cue) => {
	try {
		const context = getAudioContext();
		if (!context || !cuePlayers[cue]) return;
		if (context.state === "suspended") await context.resume();
		cuePlayers[cue](context);
	} catch {
		// Sound is progressive enhancement. Never block an interaction.
	}
};

