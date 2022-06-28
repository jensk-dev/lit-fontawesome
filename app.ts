import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./src/components/fa-icon";

@customElement("app-element")
export class App extends LitElement {
  protected render(): unknown {
    return html`<fa-icon .icon="${faXmark}"></fa-icon>`;
  }
}
