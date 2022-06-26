import type { TemplateResult} from "lit";
import { html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import css from "./styles.css?inline";

@customElement("border-component")
export class BorderComponent extends LitElement {
  public static styles = [unsafeCSS(css)];

  protected render(): TemplateResult {
    return html`<div class="border"><slot></slot></div>`;
  }
}
