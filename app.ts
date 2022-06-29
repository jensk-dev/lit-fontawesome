import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import {
  faArrowAltCircleDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./src/components/fa-icon";
import "./src/components/fa-layer";
import "./src/components/fa-text";

@customElement("app-element")
export class App extends LitElement {
  protected render(): unknown {
    return html`<fa-icon
        .spin="${true}"
        .spinReverse="${true}"
        .size="${"10x"}"
        .icon="${faXmark}"
      ></fa-icon>
      <hr />
      <div>
        <fa-layer>
          <fa-icon
            .spin="${true}"
            .spinReverse="${true}"
            .size="${"1x"}"
            .icon="${faXmark}"
          ></fa-icon>
          <fa-icon
            .fade="${true}"
            .size="${"4x"}"
            .icon="${faArrowAltCircleDown}"
            .transform="${{ x: 40 }}"
          ></fa-icon>
          <fa-text .value="${"test"}"></fa-text>
        </fa-layer>
      </div>`;
  }
}
