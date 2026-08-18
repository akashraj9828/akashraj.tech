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

const rocketWhoosh = (context) => {
	const start = context.currentTime;
	// Keep the exhaust tail aligned with Home.scss's two-second flight.
	const duration = 2;
	const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
	const samples = buffer.getChannelData(0);
	let previous = 0;
	for (let index = 0; index < samples.length; index += 1) {
		const white = Math.random() * 2 - 1;
		previous = (previous + 0.18 * white) / 1.18;
		samples[index] = previous * 2.4;
	}

	const exhaust = context.createBufferSource();
	const lowPass = context.createBiquadFilter();
	const highPass = context.createBiquadFilter();
	const volume = context.createGain();
	exhaust.buffer = buffer;
	lowPass.type = "lowpass";
	lowPass.frequency.setValueAtTime(420, start);
	lowPass.frequency.exponentialRampToValueAtTime(2400, start + 0.32);
	lowPass.frequency.exponentialRampToValueAtTime(1300, start + 1.35);
	lowPass.frequency.exponentialRampToValueAtTime(450, start + duration);
	highPass.type = "highpass";
	highPass.frequency.setValueAtTime(65, start);
	volume.gain.setValueAtTime(0.0001, start);
	volume.gain.exponentialRampToValueAtTime(0.032, start + 0.05);
	volume.gain.exponentialRampToValueAtTime(0.044, start + 0.24);
	volume.gain.exponentialRampToValueAtTime(0.032, start + 1.35);
	volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);
	exhaust.connect(lowPass);
	lowPass.connect(highPass);
	highPass.connect(volume);
	volume.connect(context.destination);
	exhaust.start(start);
	exhaust.stop(start + duration);

	tone(context, { from: 82, to: 46, duration: 1.65, gain: 0.018, type: "triangle" });
	tone(context, { at: 0.025, from: 48, to: 34, duration: 1.3, gain: 0.012, type: "sine" });
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
	launch: rocketWhoosh,
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
