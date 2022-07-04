import type {
  Icon,
  IconDefinition,
  IconLookup,
  IconParams,
  Text,
  Transform,
} from "@fortawesome/fontawesome-svg-core";
import {
  icon as faIcon,
  parse as faParse,
} from "@fortawesome/fontawesome-svg-core";
import type { PropertyValueMap, TemplateResult } from "lit";
import { nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { DirectiveResult } from "lit/directive.js";

import { FontAwesomeElement } from "../base/FontAwesomeElement";
import type { Layerable } from "../base/Layerable";
import buildTemplate from "../utils/build";

// fix flow

@customElement("fa-icon")
export class FontAwesomeIcon extends FontAwesomeElement implements Layerable {
  public getCompiled(): Icon | Text | null {
    if (!this.icon) {
      return null;
    }

    const params = this.getParams();

    return faIcon(this.icon, params);
  }

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
  transform: Transform | null = null;

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
  flash = false;

  @property({ type: Boolean })
  spinPulse = false;

  @property({ type: Boolean })
  spinReverse = false;

  private template?: TemplateResult | DirectiveResult;

  private getClasses() {
    const family = FontAwesomeElement.family();

    const applied = [];
    const available = {
      [`${family}-spin`]: this.spin && !this.pulse,
      [`${family}-pulse`]: this.pulse && !this.spin,
      [`${family}-fw`]: this.fixedWidth,
      [`${family}-border`]: this.border,
      [`${family}-li`]: this.listItem,
      [`${family}-inverse`]: this.inverse,
      [`${family}-flip`]: this.flip === true, // FIXME: flip horizontal & vertical not working as expected
      [`${family}-flip-horizontal`]:
        this.flip === "horizontal" || this.flip === "both",
      [`${family}-flip-vertical`]:
        this.flip === "vertical" || this.flip === "both",
      [`${family}-${this.size}`]: this.size !== null,
      [`${family}-rotate-${this.rotation}`]: this.rotation !== null,
      [`${family}-pull-${this.pull}`]: this.pull !== null,
      [`${family}-swap-opacity`]: this.swapOpacity,
      [`${family}-bounce`]: this.bounce,
      [`${family}-shake`]: this.shake,
      [`${family}-beat`]: this.beat && !this.fade,
      [`${family}-fade`]: this.fade && !this.beat,
      [`${family}-beat-fade`]: this.fade && this.beat,
      [`${family}-flash`]: this.flash,
      [`${family}-spin-pulse`]: this.spin && this.pulse,
      [`${family}-spin-reverse`]: this.spinReverse,
    };

    const keys = Object.keys(available);

    for (let i = 0; i < keys.length; i++) {
      if (available[keys[i]]) {
        applied.push(keys[i]);
      }
    }

    applied.push(...this.classList);

    return applied;
  }

  private isValidIcon(): boolean {
    return (
      typeof this.icon === "object" &&
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

    this.template = FontAwesomeIcon.toHtml(this.icon!, this.getParams());
  }

  public getParams(): IconParams {
    const params: IconParams = {};
    const classes = this.getClasses();
    const transform =
      typeof this.transform === "string"
        ? faParse.transform(this.transform)
        : this.transform;

    if (classes.length > 0) params.classes = classes;
    if (transform) params.transform = transform;
    if (this.mask) params.mask = this.mask;
    if (this.ariaTitle) params.title = this.ariaTitle;

    params.styles = this.getStyles();

    return JSON.parse(JSON.stringify(params));
  }

  private getStyles() {
    const style = this.getAttribute("style");
    const styleMap: { [key: string]: string } = {};

    if (!style) return styleMap;

    const properties = style
      .trim()
      .split(";")
      .filter(prop => prop.trim() !== "");

    for (let i = 0; i < properties.length; i++) {
      const [key, val] = properties[i].split(":");
      styleMap[key] = val;
    }

    return styleMap;
  }

  private static toHtml(
    icon: IconDefinition,
    params: IconParams
  ): TemplateResult {
    const abstract = faIcon(icon, params).abstract[0];
    return buildTemplate(abstract) as TemplateResult;
  }

  protected update(
    changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
  ): void {
    this.buildTemplate();
    super.update(changedProperties);
  }

  protected render(): unknown {
    return this.template || nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fa-icon": FontAwesomeIcon;
  }
}
