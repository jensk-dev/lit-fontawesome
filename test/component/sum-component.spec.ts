import { beforeEach, describe, expect, it } from "vitest";
import type { IWindow } from "happy-dom";
import { html, render } from "lit";

// Import the element
import "../../src/components/sum-component";
// only import the type of button element so we don't import the file twice
import type { SumComponent } from "../../src/components/sum-component";

// declare the global Window object to inherit from IWindow so the happyDom type is recognized on window
declare global {
  interface Window extends IWindow {}
}

describe("sum-component", async () => {
  let element: SumComponent;

  beforeEach(async () => {
    // render the component
    render(html`<sum-component .a="${4}" .b="${2}"></sum-component>`, document.body)
    // wait for happyDom to initialize
    await window.happyDOM.whenAsyncComplete();
    // store initialized state
    element = document.body.querySelector("sum-component") as SumComponent;
  });

  it("sums a & b", async () => {
    // expect shadowroot
    expect(element.shadowRoot).to.exist;

    // get inner div
    const div = element.shadowRoot!.querySelector("div");

    // assert inner text
    expect(div?.innerText).toBe("6");
  });
});
