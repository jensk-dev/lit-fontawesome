import type {
  Icon as FaIcon,
  Text as FaText,
} from "@fortawesome/fontawesome-svg-core";

import { layer as faLayer } from "@fortawesome/fontawesome-svg-core";
import type { PropertyValueMap, TemplateResult } from "lit";
import { nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { FontAwesomeElement } from "../base/FontAwesomeElement";
import type { Layerable } from "../base/Layerable";

@customElement("fa-layer")
export class FontAwesomeLayer extends FontAwesomeElement {
  @property({ type: Boolean })
  public fixedWidth = false;

  private template?: TemplateResult;

  private getLayerItems() {
    const iconOrTexts: (FaIcon | FaText)[] = [];
    for (let i = 0; i < this.children.length; i++) {
      const element = this.children.item(i) as unknown as Layerable;

      if (element.getCompiled !== undefined) {
        const iconOrText = element.getCompiled();
        if (iconOrText !== null) {
          iconOrTexts.push(iconOrText);
        }
      }
    }

    return iconOrTexts;
  }

  protected update(
    changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
  ): void {
    const family = FontAwesomeElement.family();
    const classes = [];

    if (this.fixedWidth) {
      classes.push(`${family}-fw`);
    }

    this.template = FontAwesomeLayer.buildLayers(this.getLayerItems());

    super.update(changedProperties);
  }

  private static buildLayers(layerItems: (FaIcon | FaText)[]) {
    const layer = faLayer(add => add(layerItems));
    return unsafeHTML(layer.html[0]) as TemplateResult;
  }

  protected render(): unknown {
    return this.template || nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fa-layer": FontAwesomeLayer;
  }
}
