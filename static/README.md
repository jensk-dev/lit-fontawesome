# Lit Fontawesome

**Warning:** @jensk/lit-fontawesome is currently in experimental stages of development. Expect bugs, missing features, and a volatile API.

## Usage

### \<fa-icon\>
---
```ts
// import the icon you want to display
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// import <fa-icon>
import("@jensk/lit-fontawesome/fa-icon");

...

protected render() {
  // use the icon in the template
  return html`<fa-icon
    .size="${ "2x"}"
    .icon="${ faXmark }"
    .flash="${ true }"
  ></fa-icon>`;
}
```