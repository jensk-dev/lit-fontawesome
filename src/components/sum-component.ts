import type { TemplateResult } from "lit";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sum-component")
export class SumComponent extends LitElement {
  @property({ type: Number })
  public a = 0;

  @property({ type: Number })
  public b = 0;

  public sum(): number {
    return this.a + this.b;
  }

  protected render(): TemplateResult {
    return html`<div>${this.sum()}</div>`;
  }
}
