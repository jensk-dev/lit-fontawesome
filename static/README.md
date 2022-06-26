# Lit Fontawesome

**Warning:** @jensk/lit-fontawesome is currently in experimental stages of development. Expect bugs, missing features, and a volatile API.

## Usage

### \<fa-icon\>
---
```ts
// import the icon you want to display
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// import <fa-icon>
import("@jensk/lit-fontawesome/components/fa-icon");
// or
import "@jensk/lit-fontawesome/components/fa-icon";
// or
import { FontAwesomeIcon } from "@jensk/lit-fontawesome";

customElements.define("fa-icon", FontAwesomeIcon);

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