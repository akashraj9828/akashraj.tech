import React, { useEffect, useRef, useState } from "react";
import { FiRotateCcw, FiShuffle, FiSliders, FiX } from "react-icons/fi";
import { applyTheme, resetTheme } from "../redux/actions/app";
import { defaultThemes, randomTheme, sanitizeTheme, themePresets } from "../logic/theme/theme";

const colorFields = [
	["canvas", "Canvas"],
	["surface", "Surface"],
	["text", "Text"],
	["mutedText", "Muted text"],
	["accent", "Accent"],
	["accentContrast", "Accent contrast"],
];

const ThemeLab = ({ open, theme, dispatch, onClose, triggerRef }) => {
	const [draft, setDraft] = useState(theme || defaultThemes.dark);
	const [selectedPreset, setSelectedPreset] = useState("");
	const dialogRef = useRef(null);
	const appliedThemeRef = useRef(theme || defaultThemes.dark);
	const latestThemeRef = useRef(theme || defaultThemes.dark);
	latestThemeRef.current = theme || defaultThemes.dark;

	useEffect(() => {
		if (open) {
			const applied = sanitizeTheme(latestThemeRef.current);
			appliedThemeRef.current = applied;
			setDraft(applied);
			setSelectedPreset(applied.name || "");
			window.setTimeout(() => dialogRef.current?.querySelector("button, input")?.focus({ preventScroll: true }), 0);
		}
	}, [open]);

	useEffect(() => {
		if (!open) return undefined;
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				dispatch(applyTheme(appliedThemeRef.current));
				onClose();
				triggerRef.current?.focus({ preventScroll: true });
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open, onClose, dispatch, triggerRef]);

	if (!open) return null;

	const preview = (next) => {
		const updated = sanitizeTheme(next);
		setDraft(updated);
		dispatch(applyTheme(updated));
	};
	const update = (group, key, value) => preview({ ...draft, [group]: { ...draft[group], [key]: value } });
	const handleApply = () => {
		onClose();
		triggerRef.current?.focus({ preventScroll: true });
	};
	const handleRandom = () => {
		const next = randomTheme(draft);
		preview(next);
		setSelectedPreset(next.name || "");
	};
	const handlePresetChange = (event) => {
		setSelectedPreset(event.target.value);
		const next = themePresets.find((preset) => preset.name === event.target.value);
		if (next) preview(next);
	};
	const handleReset = () => {
		dispatch(resetTheme());
		onClose();
	};
	const handleCancel = () => {
		dispatch(applyTheme(appliedThemeRef.current));
		onClose();
		triggerRef.current?.focus({ preventScroll: true });
	};

	return (
		<div className='theme-lab-popover' role='presentation' onMouseDown={(event) => event.target === event.currentTarget && handleCancel()}>
			<section className='theme-lab-dialog' ref={dialogRef} role='dialog' aria-labelledby='theme-lab-title'>
				<div className='theme-lab-header'>
					<div>
						<p className='theme-lab-eyebrow'>Theme experiments</p>
						<h2 id='theme-lab-title'>Shape the interface</h2>
					</div>
					<button className='theme-lab-close' type='button' onClick={handleCancel} aria-label='Close theme experiments'>
						<FiX aria-hidden='true' />
					</button>
				</div>
				<div className='theme-lab-body'>
					<div className='theme-lab-actions'>
						<button className='button-cta' type='button' onClick={handleRandom}>
							<FiShuffle aria-hidden='true' /> Random theme
						</button>
						<button className='button-cta button-secondary' type='button' onClick={handleReset}>
							<FiRotateCcw aria-hidden='true' /> Reset
						</button>
					</div>
					<fieldset>
						<legend>Named themes</legend>
						<div className='theme-lab-presets'>
							<label htmlFor='theme-preset-select'>Choose a curated palette</label>
							<div>
								<select id='theme-preset-select' value={selectedPreset} onChange={handlePresetChange}>
									<option value=''>Select a theme</option>
									{themePresets.map((preset) => (
										<option key={preset.name} value={preset.name}>
											{preset.name}
										</option>
									))}
								</select>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<legend>Mode</legend>
						<div className='theme-lab-mode' role='radiogroup' aria-label='Theme mode'>
							{["dark", "light"].map((mode) => (
								<button key={mode} className={draft.mode === mode ? "is-selected" : ""} type='button' role='radio' aria-checked={draft.mode === mode} onClick={() => preview({ ...draft, mode })}>
									{mode}
								</button>
							))}
						</div>
					</fieldset>
					<fieldset>
						<legend>Palette</legend>
						<div className='theme-lab-colors'>
							{colorFields.map(([key, label]) => (
								<label key={key}>
									{label}
									<span>
										<input type='color' value={draft.colors[key]} onChange={(event) => update("colors", key, event.target.value)} />
										<code>{draft.colors[key]}</code>
									</span>
								</label>
							))}
						</div>
					</fieldset>
					<fieldset className='theme-lab-sliders'>
						<legend>Feel</legend>
						<label>
							Roundness <output>{Math.round(draft.shape.radiusScale * 100)}%</output>
							<input type='range' min='0' max='1.5' step='0.05' value={draft.shape.radiusScale} onChange={(event) => update("shape", "radiusScale", event.target.value)} />
						</label>
						<label>
							Density <output>{Math.round(draft.layout.density * 100)}%</output>
							<input type='range' min='0.7' max='1.3' step='0.01' value={draft.layout.density} onChange={(event) => update("layout", "density", event.target.value)} />
						</label>
						<label>
							Type scale <output>{Math.round(draft.typography.scale * 100)}%</output>
							<input type='range' min='0.92' max='1.12' step='0.01' value={draft.typography.scale} onChange={(event) => update("typography", "scale", event.target.value)} />
						</label>
						<label>
							Shadow <output>{Math.round(draft.depth.shadowStrength * 100)}%</output>
							<input type='range' min='0' max='1.4' step='0.05' value={draft.depth.shadowStrength} onChange={(event) => update("depth", "shadowStrength", event.target.value)} />
						</label>
						<label>
							Motion <output>{Math.round(draft.motion.scale * 100)}%</output>
							<input type='range' min='0' max='1.25' step='0.05' value={draft.motion.scale} onChange={(event) => update("motion", "scale", event.target.value)} />
						</label>
					</fieldset>
				</div>
				<div className='theme-lab-footer'>
					<button className='button-cta button-secondary' type='button' onClick={handleCancel}>
						Cancel
					</button>
					<button className='button-cta' type='button' onClick={handleApply}>
						<FiSliders aria-hidden='true' /> Keep theme
					</button>
				</div>
			</section>
		</div>
	);
};

export default ThemeLab;
