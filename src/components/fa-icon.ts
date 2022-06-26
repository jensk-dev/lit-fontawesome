import type {
  IconDefinition,
  IconLookup,
} from "@fortawesome/fontawesome-svg-core";
import type { PropertyValueMap, TemplateResult } from "lit";
import { nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  icon as faIcon,
  parse as faParse,
} from "@fortawesome/fontawesome-svg-core";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { DirectiveResult } from "lit/directive.js";
import { cache } from "lit/directives/cache.js";
import { objectWithKey } from "../utils/objectWithKey";
import { FontAwesomeElement } from "../base/FontAwesomeElement";

// fix flow

@customElement("fa-icon")
export class FontAwesomeIcon extends FontAwesomeElement {
  @property({ type: Boolean })
  border = false;

  @property({ type: Boolean })
  fixedWidth = false;

  @property()
  flip: true | false | "horizontal" | "vertical" | "both" = false;

  @property({ type: Object })
  icon?: IconDefinition; // required;

  // FIXME: figure out type
  @property({ type: Object })
  mask: IconLookup | null = null;

  @property({ type: Boolean })
  listItem = false;

  @property({ type: String })
  pull: "right" | "left" | null = null;

  @property({ type: Boolean })
  pulse = false;

  @property({ type: Number })
  rotation?: 90 | 180 | 270 | null = null;

  @property({ type: Boolean })
  swapOpacity = false;

  @property({ type: String })
  size:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x"
    | null = null;

  @property({ type: Boolean })
  spin = false;

  @property({ type: Object })
  transform: object | null = null;

  @property({ type: Boolean })
  symbol: boolean | string = false;

  // find a different name
  @property({ type: String })
  ariaTitle: string | null = null;

  @property({ type: Boolean })
  inverse = false;

  @property({ type: Boolean })
  bounce = false;

  @property({ type: Boolean })
  shake = false;

  @property({ type: Boolean })
  beat = false;

  @property({ type: Boolean })
  fade = false;

  @property({ type: Boolean })
  beatFade = false;

  @property({ type: Boolean })
  flash = false;

  @property({ type: Boolean })
  spinPulse = false;

  @property({ type: Boolean })
  spinReverse = false;

  private template?: TemplateResult | DirectiveResult;

  private getClasses() {
    const classes = {
      "fa-spin": this.spin && !this.pulse,
      "fa-pulse": this.pulse && !this.spin,
      "fa-fw": this.fixedWidth,
      "fa-border": this.border,
      "fa-li": this.listItem,
      "fa-inverse": this.inverse,
      "fa-flip": this.flip === true, // FIXME: flip horizontal & vertical not working as expected
      "fa-flip-horizontal": this.flip === "horizontal" || this.flip === "both",
      "fa-flip-vertical": this.flip === "vertical" || this.flip === "both",
      [`fa-${this.size}`]: this.size !== null,
      [`fa-rotate-${this.rotation}`]: this.rotation !== null,
      [`fa-pull-${this.pull}`]: this.pull !== null,
      "fa-swap-opacity": this.swapOpacity,
      "fa-bounce": this.bounce,
      "fa-shake": this.shake,
      "fa-beat": this.beat && !this.fade,
      "fa-fade": this.fade && !this.beat,
      "fa-beat-fade": this.fade && this.beat,
      "fa-flash": this.flash,
      "fa-spin-pulse": this.spin && this.pulse,
      "fa-spin-reverse": this.spinReverse,
    };

    return Object.keys(classes)
      .map(key => (classes[key] ? key : null))
      .filter(key => key);
  }

  private isValidIcon(): boolean {
    return !!(
      this.icon &&
      Array.isArray(this.icon.icon) &&
      typeof this.icon.iconName === "string" &&
      typeof this.icon.prefix === "string"
    );
  }

  private isValidRotation(): boolean {
    if (this.rotation === null) {
      return true;
    }

    const validRotations = [90, 180, 270];
    return validRotations.some(valid => this.rotation === valid);
  }

  private isValidSize(): boolean {
    if (this.size === null) {
      return true;
    }

    const validSizes = [
      "2xs",
      "xs",
      "sm",
      "lg",
      "xl",
      "2xl",
      "1x",
      "2x",
      "3x",
      "4x",
      "5x",
      "6x",
      "7x",
      "8x",
      "9x",
      "10x",
    ];
    return validSizes.some(valid => this.size === valid);
  }

  private isValidPull(): boolean {
    if (this.pull === null) {
      return true;
    }

    const validPulls = ["right", "left"];
    return validPulls.some(valid => this.pull === valid);
  }

  private isValidFlip(): boolean {
    const validFlips = [false, true, "horizontal", "vertical", "both"];
    return validFlips.some(valid => this.flip === valid);
  }

  private buildTemplate() {
    if (
      !this.isValidIcon() ||
      !this.isValidFlip() ||
      !this.isValidPull() ||
      !this.isValidRotation() ||
      !this.isValidSize()
    ) {
      return;
    }

    const classes = objectWithKey("classes", this.getClasses());
    const transform = objectWithKey(
      "transform",
      typeof this.transform === "string"
        ? faParse.transform(this.transform)
        : this.transform
    );
    const mask = objectWithKey("mask", this.mask);
    const title = this.ariaTitle !== null ? { title: this.ariaTitle } : {};

    const renderedIcon = faIcon(this.icon!, {
      ...classes,
      ...transform,
      ...mask,
      symbol: this.symbol,
      ...title,
    });

    this.template = unsafeHTML(renderedIcon.html[0]);
  }

  protected update(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (this.icon !== undefined) {
      this.buildTemplate(); // FIXME: optimize
    }
    super.update(changedProperties);
  }

  protected render(): unknown {
    return cache(this.template || nothing);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fa-icon": FontAwesomeIcon;
  }
}
