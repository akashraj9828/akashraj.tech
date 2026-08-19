# Theme system guide

`src/assets/styles/theme.scss` is the source of truth for the site's visual
theme contract. Sass imports component styles for light and dark classes, while
CSS custom properties let the Theme Lab update the same tokens at runtime.

## Token groups

| Group       | Tokens                                                                                              | Purpose                               |
| ----------- | --------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Color       | canvas, surface, text, muted text, accent, accent contrast, border, focus, success, warning, danger | Semantic color roles.                 |
| Shape       | small, control, card, large, round                                                                  | Corner treatment and roundness.       |
| Layout      | density, content width, page gutter                                                                 | Consistent spacing.                   |
| Typography  | type scale, font family, line heights                                                               | Readable type hierarchy.              |
| Depth       | shadow strength, surface and overlay shadows                                                        | Restrained elevation.                 |
| Motion      | fast/base/slow durations, easing, motion scale                                                      | Shared interaction timing.            |
| Interaction | outline width/offset, border width, control size                                                    | Focus visibility and touch usability. |
| Layering    | header, overlay, dialog z-index                                                                     | Predictable stacking.                 |

## Customization rules

The Theme Lab applies complete, validated configurations. Random themes are
curated presets so text and controls remain readable. Custom values are previews
until **Apply** is pressed. Applied themes persist in localStorage; **Reset to
defaults** removes the override.

Gradients, arbitrary fonts, and decorative effects are intentionally not
exposed. The portfolio should remain calm and content-first in every experiment.

When adding a token, define its default here, add it to the runtime theme
schema, document its semantic role, and test persistence and reset behavior.
