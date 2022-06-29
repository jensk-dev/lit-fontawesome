import type {
  Icon as FaIcon,
  Text as FaText,
  Transform,
} from "@fortawesome/fontawesome-svg-core";
import { text as faText } from "@fortawesome/fontawesome-svg-core";
import type { TemplateResult } from "lit";
import { nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { FontAwesomeElement } from "../base/FontAwesomeElement";
import type { Layerable } from "../base/Layerable";

@customElement("fa-text")
export class FontAwesomeText extends FontAwesomeElement implements Layerable {
  @property()
  public value?: string | number;

  @property({ type: Object })
  public transform?: Transform;

  @property({ type: Boolean })
  public counter = false;

  @property({ type: String })
  public position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";

  private getClasses(): string[] {
    const family = FontAwesomeElement.family();
    const classes = [];

    if (this.counter) {
      classes.push(`${family}-layers-counter`);
    }

    if (this.position) {
      classes.push(`${family}-layers-${this.position}`);
    }

    return classes;
  }

  public getCompiled(): FaIcon | FaText | null {
    if (!this.value) {
      return null;
    }

    return faText(this.value.toString(), {
      transform: this.transform,
      classes: this.getClasses(),
    });
  }

  private toHtml(compiled: FaText): TemplateResult | symbol {
    return compiled === null
      ? nothing
      : (unsafeHTML(compiled.html[0]) as TemplateResult);
  }

  protected render(): unknown {
    const compiled = this.getCompiled();
    return !compiled ? nothing : this.toHtml(compiled as FaText);
  }
}
