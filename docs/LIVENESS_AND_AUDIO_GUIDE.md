# Akash Raj — Liveness & Audio Design Guide

This guide documents the interaction, motion, and sound decisions that make the portfolio feel responsive and alive. It complements the [main design guide](./DESIGN_GUIDE.md), which remains the source of truth for visual hierarchy, layout, color, type, components, and page structure.

The goal is presence, not spectacle. A visitor should notice that the interface responds naturally, but should rarely stop to notice an animation or sound by itself.

## 1. Experience principles

1. **Content stays in control.** Motion supports reading order and interaction state; it never competes with the portfolio content.
2. **Feedback is earned.** Animate or sound an event only when the visitor deliberately acts or meaningful state changes.
3. **Small movements feel intentional.** Most movement is a few pixels, one short scale change, or a fade. The rocket is the only large, playful exception.
4. **One response per action.** A click should create one coherent visual and, where appropriate, audible response. Avoid stacked or duplicate effects.
5. **Enhancement never becomes a dependency.** Content, navigation, and controls must work when animation is reduced, audio is muted, Web Audio is unavailable, or persistence fails.
6. **Repetition creates the system.** Reuse the shared timing, easing, reveal, press, and cue patterns before inventing a new one.

## 2. Motion language

### Timing tokens

| Token |                           Value | Use                                           |
| ----- | ------------------------------: | --------------------------------------------- |
| Fast  |                         `140ms` | Immediate feedback and exits                  |
| Base  |                         `180ms` | Controls, icons, hover, and pressed states    |
| Slow  |                         `260ms` | Entrances, reveals, and small content changes |
| Ease  | `cubic-bezier(.2, .75, .25, 1)` | Shared natural deceleration                   |

Use these values through `--motion-fast`, `--motion-base`, `--motion-slow`, and `--motion-ease`. A component may be slower only when its physical metaphor needs it, such as the portrait arrival or rocket flight.

### Movement limits

- Standard entrances travel `0.25rem`–`0.5rem` vertically and fade to full opacity.
- Hover lifts stay between 1px and 3px.
- Directional affordances, such as arrows and link labels, move about `0.08rem`–`0.18rem`.
- Pressed states return toward the resting position and scale to roughly `0.94`–`0.99`.
- Image hover zoom stays subtle; project imagery uses approximately `1.045` scale.
- Staggers use 35ms steps at most and are capped within the visible group or row.
- Motion must use transforms and opacity where possible so it does not cause layout shift.

### Page and section entrances

Route changes use a short fade with a `0.25rem` downward offset: approximately 300ms entering and 200ms exiting. This connects navigation without making the site feel like a slide presentation.

Sections reveal once as they enter the viewport. The shared reveal pattern:

- observes the section with `IntersectionObserver`;
- reveals at a low threshold, generally `0.06`–`0.12`;
- uses a slightly raised bottom margin so the effect completes before the section is deeply onscreen;
- disconnects after the first reveal so scrolling back does not replay it;
- renders content immediately if the observer API is unavailable.

Do not add reveals to every nested element. Reveal the meaningful section or repeated card, then let the content remain stable.

### Direct manipulation feedback

Interactive elements should acknowledge hover, keyboard focus, and press without changing their meaning:

- Navigation icons rise 1px; control icons rotate slightly and scale up.
- Buttons lift on hover and settle with a small scale reduction when pressed.
- Text-link arrows move in the direction of travel.
- Project cards lift while their image gently enlarges.
- External-link icons shift slightly up and right.
- Social icons lift with a very small rotation.
- The contact email’s coral edge grows vertically to reinforce it as the primary action.

Focus indicators remain the explicit coral outline defined by the main design system. Motion is additional feedback, never the only indication of focus or state.

### State-change motion

- The mobile navigation panel fades and translates into place; its links follow in 20ms increments up to 100ms.
- Stats totals count up over roughly 450ms with an ease-out curve once live data is available.
- Switching the Stats project tab gives the replacement list one short fade-and-rise transition.
- Loading shimmer is reserved for content that is genuinely loading.
- The résumé’s reading surface stays still; only its action bar and document header enter. Dense document content is not staggered.

### Page-specific character

| Area    | Motion decision                                                                                |
| ------- | ---------------------------------------------------------------------------------------------- |
| Home    | Portrait settles in once; hero copy follows in a restrained stagger.                           |
| Lab     | Cards reveal by row in 35ms steps; mobile removes the stagger.                                 |
| Stats   | Intro, activity, and detail groups reveal separately; totals animate when data arrives.        |
| Résumé  | Actions and header enter; the body remains stable for reading and printing.                    |
| Contact | Copy, reason card, and social section reveal as groups; list items use a short capped stagger. |
| Header  | Navigation, theme, sound, and menu controls share the same small hover/press language.         |

### Whole-site micro-interaction contract

The site uses one restrained feedback language everywhere. A visitor should be able to predict how an interactive element responds without learning a new animation on each page.

- **Hover:** interactive elements may lift by 1–3px, tint their border or background, or move a directional icon by `0.08rem`–`0.18rem`.
- **Focus-visible:** preserve the coral outline from the main design guide; focus motion is supplemental and must never replace the outline.
- **Pressed:** return toward the resting position and scale to roughly `0.94`–`0.99` for buttons, cards, tabs, and icon controls.
- **Links:** directional arrows and external-link icons move slightly toward their destination; text color and underline changes remain legible without motion.
- **Cards and panels:** interactive cards lift as a whole, while images may use the existing subtle `1.045` zoom. Static reading panels do not move.
- **Loading:** shimmer is allowed only while content is genuinely loading, never as decoration after data arrives. Its static fallback remains understandable with reduced motion.
- **Entrances:** route, section, and meaningful-group entrances use opacity plus at most `0.5rem` of travel. Do not animate every nested text node.
- **Staggering:** repeated items may use 35ms steps, capped within the visible group; mobile layouts remove unnecessary stagger where it slows scanning.
- **Timing:** use `--motion-fast`, `--motion-base`, `--motion-slow`, and `--motion-ease` rather than component-specific approximations.
- **Layout stability:** animations use transforms, opacity, color, borders, and shadows where possible. They must not change document flow, reading order, target size, or scroll position.

Coverage expectations:

- Shared header controls, navigation links, brand link, footer links, and buttons acknowledge hover, focus, and press.
- Home actions, portrait arrival, text-link arrows, and the rocket use the Home-specific patterns above.
- Lab cards and project actions use lift, image zoom, and directional-link feedback.
- Stats cards, tabs, repository rows, live totals, and loading placeholders acknowledge their state without adding sound to passive updates.
- Résumé motion is limited to the action bar and document header; résumé entries and dense reading content remain still.
- Contact’s email action, reason group, form link, and social controls use the same shared feedback language.

Reduced motion is a functional mode for this contract: entrances and staggers complete immediately, hover/icon/list-switch/loading animations are removed, and all content and outcomes remain available without waiting for motion.

## 3. The rocket interaction

The rocket is the portfolio’s single theatrical gesture, so its behavior is deliberately narrow.

- It gives one small nudge 1.6 seconds after the Home page appears, then remains still.
- **Only activating the rocket button launches it.** “About me” scrolls to the introduction without launching the rocket or playing its sound.
- A launch starts the two-second flight and the two-second launch cue together.
- The flight moves vertically offscreen with a brief initial build in scale and a gradual fade near the end.
- Once activated, pointer events are disabled and the rocket remains gone for that Home page visit. Repeated clicks cannot stack sounds or animations.
- Launching also scrolls to the introduction and moves keyboard focus there after the smooth scroll. With reduced motion, scrolling and focus are immediate.

When changing the rocket animation duration, update the launch cue duration in the same change. Visual departure and audible exhaust are one interaction and must end together.

## 4. Sound language

### Sound character

Sounds are quiet, synthesized interface cues—not music, ambience, or literal sound effects. Short cues use clean sine or triangle tones. The rocket uses shaped noise and low oscillators to suggest exhaust rather than a squeak, whistle, or rubbery friction sound.

The mix should remain restrained:

- normal cues peak around `0.015`–`0.018` gain;
- the rocket’s filtered noise peaks around `0.044`, with quieter low-frequency layers;
- every cue has a short fade in and a complete fade to near silence to avoid clicks;
- cues should remain recognizable at normal device volume without startling a visitor.

### Cue vocabulary

| Cue         | Character                                          | Intended use                                              |
| ----------- | -------------------------------------------------- | --------------------------------------------------------- |
| Navigate    | One brief rising tone, about 55ms                  | Internal route changes and the primary email action       |
| Toggle      | One soft rising triangle tone, about 65ms          | Menu state, tabs, printing, and sound-off acknowledgement |
| Theme light | Two short ascending tones, about 135ms total       | Switching into light mode                                 |
| Theme dark  | Two short descending tones, about 145ms total      | Switching into dark mode                                  |
| Enable      | A brighter two-tone rise, about 200ms total        | Confirming that interface sound has just been enabled     |
| Launch      | Filtered exhaust noise plus low rumble, exactly 2s | Rocket activation only                                    |

Reusing a cue gives similar actions a common character. Add a new cue only when an interaction has a distinct meaning that cannot be expressed by this vocabulary.

### Trigger map

Sound currently belongs on:

- internal header and brand navigation;
- internal Home, Contact, and Résumé actions that represent navigation;
- opening or closing the mobile menu, including Escape and backdrop dismissal;
- switching the theme;
- changing the Stats project tab;
- invoking print/save from the Résumé;
- enabling or muting interface sounds;
- launching the rocket.

Sound does **not** belong on:

- initial page load or route completion;
- hover, focus, scroll, or viewport reveals;
- the “About me” anchor action;
- passive loading or data arrival;
- every project, social, or other external link;
- repeated animation frames or number-counting steps;
- errors, if the interface has no clear recovery action tied to the sound.

### Sound preference and browser behavior

- Sound defaults to enabled, but nothing plays until a deliberate click or keyboard activation satisfies browser autoplay rules.
- The persistent header control sits beside the theme control and exposes both an accessible label and `aria-pressed` state.
- Muting plays the normal toggle acknowledgement immediately before sound turns off.
- Enabling plays the dedicated enable cue immediately after sound turns on.
- The preference persists in local storage under `interface_sounds_enabled`.
- If storage is unavailable, the in-memory preference still works.
- If Web Audio is missing, suspended, or throws an error, the underlying interaction proceeds normally.

## 5. Reduced motion and accessibility

`prefers-reduced-motion: reduce` is a functional mode, not merely a shorter animation setting.

- Reveal content is immediately visible.
- Route, hover, icon, list-switch, shimmer, and stagger animations are removed or reduced to effectively zero duration.
- Animated totals display their final values rather than counting.
- Smooth scrolling becomes immediate.
- The rocket action still navigates to and focuses the introduction, but its nonessential motion completes immediately.
- Sound preference remains independent of reduced motion; visitors control it with the dedicated sound button.

Every animated control must remain keyboard-operable, keep a visible focus indicator, and expose its state or purpose through text, an accessible name, or ARIA. No outcome may depend on seeing motion or hearing a cue.

## 6. Implementation model

The implementation is intentionally small and local:

- `Motion.scss` owns the shared tokens and base reveal classes.
- `useReducedMotion` mirrors the system media query and responds when it changes.
- `useReveal` provides a one-time viewport reveal plus optional delay and threshold.
- `useAnimatedNumber` handles short request-animation-frame count-ups and bypasses them in reduced-motion mode.
- `SoundProvider` owns the preference and exposes `enabled`, `play(cue)`, and `toggle()` across routes.
- `microSounds.js` creates cues with the Web Audio API, avoiding downloadable audio assets and their loading cost.
- Page styles own the few animations that express page-specific meaning.

Keep this separation when extending the site: global rhythm belongs in shared primitives; a unique visual metaphor belongs beside the component that owns it.

## 7. Adding or changing an interaction

Before adding motion or sound, answer these questions:

1. What action, state change, or reading transition does it clarify?
2. Can an existing motion pattern and cue express it?
3. Does it remain understandable with motion reduced and sound muted?
4. Will it replay often enough to become distracting?
5. Does it preserve layout, focus, and the result of the underlying interaction?

If the effect is purely decorative, prefer one quiet, one-time moment. If it competes with reading or fires without intent, leave it out.

## 8. Review checklist

Review liveness changes at 1440px and 390px, in light and dark mode, with sound both enabled and muted.

- Page entrances are short, one-time, and free of layout shift.
- Hover, focus, and active feedback agree with each other.
- Keyboard activation produces the same result as pointer activation.
- Reduced-motion mode reveals all content and preserves every action.
- Reloading preserves the sound preference.
- No sound plays on load, hover, focus, scroll, passive data updates, or “About me.”
- Theme, menu, tab, print, navigation, and sound controls play only their assigned cue.
- The rocket alone triggers launch motion and sound.
- The rocket animation and launch cue start and end together.
- Rapid or repeated activation does not stack launch effects.
- Muted or unavailable audio never blocks navigation or state changes.
- Print output contains no animated or fixed decorative controls.
