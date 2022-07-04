import type { AbstractElement } from "@fortawesome/fontawesome-svg-core";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

function buildAttribs(attributes: { [key: string | symbol ]: unknown }) {
    return Object.keys(attributes).map(key => `${key}="${attributes[key]}"`).join(" ")
}

function buildHTMLString(abstractElement: AbstractElement): string {
    const children = [];

    if (abstractElement.children) {
        for (let i = 0 ; i < abstractElement.children.length; i++) {
            children.push(buildHTMLString(abstractElement.children[i]));
        }
    }

    let attributes = "";

    if (abstractElement.attributes) {
        attributes = buildAttribs(abstractElement.attributes);
    }

    return `<${abstractElement.tag} ${attributes}>${children.join(" ")}</${abstractElement.tag}>`
}

export default function buildTemplate(abstractElement: AbstractElement) {
    return unsafeHTML(buildHTMLString(abstractElement));
}
