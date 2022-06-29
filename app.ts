import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import {
  faArrowAltCircleDown,
  faCircle,
  faTimes,
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
      <div style="width: auto; overflow:hidden; height: auto;">
        <!-- <fa-layer>
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
        </fa-layer> -->

        <fa-layer>
          <fa-icon style="color: red;" .icon="${faCircle}"></fa-icon>
          <fa-icon style="color: blue;" .icon="${faTimes}"></fa-icon>
        </fa-layer>

        <span class="fa-layers fa-fw" style="background:MistyRose">
          <i class="fa-solid fa-circle" style="color:Tomato"></i>
          <i
            class="fa-inverse fa-solid fa-times"
            data-fa-transform="shrink-6"
          ></i>
        </span>
      </div>`;
  }
}
