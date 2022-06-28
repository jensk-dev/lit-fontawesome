import { LitElement, unsafeCSS } from "lit";

import { config as faConfig, dom } from "@fortawesome/fontawesome-svg-core";

export class FontAwesomeElement extends LitElement {
  protected static readonly family = () =>
    FontAwesomeElement.config.familyPrefix;

  private static initialized = false;

  private static config = faConfig;

  constructor() {
    super();
    if (!FontAwesomeElement.initialized) {
      // configure some defaults which lit requires
      faConfig.autoAddCss = false;
      faConfig.autoReplaceSvg = false;

      // save config state on element
      FontAwesomeElement.initialized = true;
      FontAwesomeElement.config = faConfig;
    }
  }

  public static styles = [unsafeCSS(dom.css())];
}
