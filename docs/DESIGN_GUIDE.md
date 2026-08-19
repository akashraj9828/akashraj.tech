# Akash Raj — Design Guide

Companion guide: [Liveness & Audio Design Guide](./LIVENESS_AND_AUDIO_GUIDE.md)

## 1. The design idea

This portfolio should feel like the work it represents: calm, precise, technical, and human. It is not a product dashboard and not a visual experiment gallery. It is a focused professional introduction where the content carries the personality.

The visual system is deliberately quiet:

- One strong typeface and one accent color.
- Spacious editorial layouts instead of decorative panels.
- Clear hierarchy before interaction.
- Small moments of personality, such as the rocket, used intentionally.

When making a design decision, choose the option that makes the content easier to scan and the page feel less busy.

## 2. Visual language

### Color

| Token | Role | Light mode | Dark mode |
| --- | --- | --- | --- |
| Canvas | Main page background | White | `#181a1b` |
| Ink | Primary text and icons | Black | White |
| Coral | Accent, action, focus | `#ef596f` | `#ef596f` |
| Soft surface | Quiet grouping | Translucent ink/coral | Translucent ink/coral |
| Border | Separation | Low-contrast ink | Low-contrast ink |

Coral is an accent, not a background color. Use it to guide attention: active navigation, an eyebrow label, a primary action, a key link, or a focus ring. Do not use it for large decorative areas.

### Type

Roboto is the site typeface, supported by a system-font fallback. Type is functional, not ornamental.

| Level | Use | Style |
| --- | --- | --- |
| Display | Page title | Large, 400–500 weight, tight tracking, short line length |
| Section title | Major content group | Medium/large, 400–500 weight |
| Eyebrow | Context label | Small, uppercase, bold, coral, letter-spaced |
| Body | Reading copy | 1rem+, relaxed line height, left aligned |
| Metadata | Dates, labels, supporting detail | Smaller but readable, reduced contrast |

The global base type size must never fall below 16px. Do not center paragraphs longer than two lines.

### Shape and depth

- Use thin borders instead of heavy shadows to group content.
- Card radius: approximately `0.75rem`.
- Button radius: approximately `0.5rem`.
- Use shadow only for elevation or focus; it should be soft and subtle.
- Avoid gradients, glass effects, glowing borders, or large rounded capsules unless there is a specific interaction reason.

## 3. Layout rules

### Page frame

- Content is centered in a maximum width of roughly `72rem`.
- Mobile pages retain at least a `1rem` side gutter.
- Major page padding is fluid. Use `clamp()` rather than fixed desktop-only spacing.
- Separate major sections with whitespace and a quiet border; do not add a card merely to fill empty space.

### Hierarchy

Every page should follow this rhythm:

1. Eyebrow (optional): explains context.
2. One direct page title.
3. One concise supporting sentence or paragraph.
4. The page’s primary content or action.

The title is the visual anchor. A user should understand the page within one viewport without reading every line.

### Grids

- Use three columns only when every item remains comfortably readable.
- Collapse cards from three columns to two, then one; do not shrink card content to preserve columns.
- Supporting sidebars collapse below primary content on smaller screens.
- Never use horizontal page overflow as a layout solution. A contained scroller is acceptable only for dense visual data, such as contribution history.

## 4. Components

### Header

The header is a utility, not a hero.

- Keep it compact and visually stable across routes.
- The brand sits at the left; navigation is centered on desktop; controls live at the right.
- Active navigation uses coral plus a subtle tinted background.
- On mobile, navigation becomes a focused menu panel. It must open from a clear menu control and close via Escape, backdrop click, or navigation.
- Theme and menu controls use a minimum 40px touch target.

### Buttons

Use buttons sparingly. A section should normally have one primary action.

| Variant | Use | Appearance |
| --- | --- | --- |
| Primary | Main next step | Coral fill, white label |
| Secondary | Supporting action | Transparent, ink border and label |
| Text link | Low-emphasis navigation | Ink text with coral underline/accent |
| Icon button | Compact utility | Circular or square touch target; clear accessible name |

Button labels should start with a verb: “View projects”, “Start a conversation”, “Print résumé”. Avoid vague labels such as “Click here” or “Learn more” without context.

### Cards

Cards group repeated content, especially projects and data summaries. They should not become the default wrapper for every paragraph.

- Use a quiet border and a restrained background tint.
- Keep inner padding consistent.
- Make the full visual preview or title link to the destination.
- Add a small hover lift only where the card is interactive.
- On mobile, preserve card padding and text size; reduce columns, not readability.

### Social links

Social links are utility actions, not primary content.

- Use matching circular icon buttons.
- Keep their visual footprint small and uniform.
- Expose the destination through an accessible name, even if the visual label is hidden.
- Do not use differently sized pill-shaped links or large branded social blocks.

## 5. Theme behavior

Light and dark mode are equal modes, not separate designs.

- Keep content order, layout, spacing, and interaction behavior identical.
- Swap only canvas, ink, border/surface opacity, and appropriate image treatment.
- Maintain readable contrast for muted text and borders in both modes.
- Theme transitions should be brief and non-disruptive.
- The current user choice should persist across navigation and reloads.

## 6. Motion

Motion should communicate state or add one small moment of delight.

- Use the shared motion timings: fast feedback around 140ms, standard controls around 180ms, and entrances around 260ms.
- Standard hover, focus, and menu transitions: 150–200ms.
- Prefer opacity, border color, and small transforms over large movement.
- Entrance motion travels no more than 4–8px and plays only once as content becomes visible.
- Stagger repeated content by no more than 35ms per item and cap the pattern within a visible row.
- Dense reading surfaces, especially the résumé, remain still apart from their header and controls.
- Never move content in a way that changes reading order or causes layout shift.
- Respect `prefers-reduced-motion` for all nonessential animation.

### The rocket

The rocket is the one playful exception. It is positioned at the bottom-right of the Home page. Clicking it scrolls to the introduction and launches it vertically offscreen. Once launched, it stays gone for that page visit.

### Sound

Sound is optional interaction feedback, never ambience.

- Interface sounds default to enabled but remain silent until a visitor deliberately clicks or keyboard-activates a supported control.
- Provide a persistent, accessible sound control beside the theme control.
- Use short, quiet cues only for navigation, theme changes, menu/tab state changes, sound opt-in, and the rocket launch.
- Never play sound on page load, hover, focus, scrolling, passive data loading, or every external link.
- A disabled, suspended, or unavailable audio system must never block the underlying interaction.
- Persist the visitor's sound preference across routes and reloads.

## 7. Page blueprints

### Home

The Home page is an introduction, not a résumé.

- Hero: portrait, role, concise value proposition, two actions maximum.
- Introduction: longer biography, then one contact action and one résumé action.
- Use empty space to create calm, but do not create dead space that hides essential content below the fold.

### Lab / Work

The Lab is a project index.

- Start with a simple editorial heading and one-line description.
- Use uniform rectangular project previews.
- Provide explicit **Code** and **Visit** actions when available.
- Let project imagery bring visual variety; keep the card chrome neutral.

### Stats

The Stats page is a living record of public work.

- Lead with the GitHub identity and a single outbound action.
- Show summary statistics before detail.
- Use panels only for distinct information groups: activity, repositories, languages.
- Provide meaningful loading and unavailable states instead of empty areas.

### Resume

The résumé is a document first.

- Favor dense but readable editorial structure over large UI cards.
- Use a primary content column and a supporting column on wide screens.
- Collapse to one column on mobile.
- Preserve a print-friendly white document with navigation removed.

### Contact

The Contact page makes one thing easy: starting a conversation.

- Make email the strongest action.
- Pair it with a concise “reasons to contact” list for warmth and context.
- Use an external form link rather than an unreliable embedded form.
- Keep social links secondary and compact.

## 8. Accessibility requirements

Accessibility is a design requirement, not a finishing task.

- Use one `h1` per page and semantic landmarks for the page structure.
- Every icon-only control must have a useful accessible name.
- Preserve a visible coral `:focus-visible` indicator.
- Interactive targets should be at least 40px in either dimension.
- Decorative imagery uses empty `alt`; meaningful imagery uses descriptive `alt` text.
- Do not communicate state with color alone.
- External links opened in a new tab use `rel="noopener noreferrer"`.
- Test the mobile menu with keyboard navigation and Escape.

## 9. Responsive quality bar

Review every visual change at desktop and mobile widths in both themes.

| Check | Requirement |
| --- | --- |
| Width | No horizontal page overflow |
| Type | Body text remains readable without zoom |
| Layout | Grids collapse before content becomes cramped |
| Controls | Buttons and icons remain tappable |
| Theme | Contrast and hierarchy match in light and dark modes |
| Motion | Reduced-motion preference remains usable |

Use 1440px and 390px as the minimum review widths. If a layout needs a special-case breakpoint to avoid breaking, simplify the layout before adding the breakpoint.

## 10. Decision filter

Before adding a visual element, ask:

1. Does it make the next action or content clearer?
2. Does it belong to the existing type, spacing, color, and shape system?
3. Does it work in both themes and at mobile width?
4. Can it be understood and operated without a pointer or animation?

If the answer is no, leave it out.
