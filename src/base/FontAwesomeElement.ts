import { LitElement, unsafeCSS } from "lit";

import { config, dom } from "@fortawesome/fontawesome-svg-core";

export class FontAwesomeElement extends LitElement {
  private static initialized = false;

  constructor() {
    super();
    if (!FontAwesomeElement.initialized) {
      // configure some defaults which lit requires
      config.autoAddCss = false;
      config.autoReplaceSvg = false;
      FontAwesomeElement.initialized = true;
    }
  }

  public static styles = [unsafeCSS(dom.css())];
}
