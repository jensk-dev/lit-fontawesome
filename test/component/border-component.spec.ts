import { beforeEach, describe, expect, it } from "vitest";
import type { IWindow } from "happy-dom";
import { html, render } from "lit";

// Import the element
import "../../src/components/border-component";
// only import the type of button element so we don't import the file twice
import type { BorderComponent } from "../../src/components/border-component";

// declare the global Window object to inherit from IWindow so the happyDom type is recognized on window
declare global {
  interface Window extends IWindow {}
}

describe("sum-component", async () => {
  let element: BorderComponent;

  beforeEach(async () => {
    // render the component
    render(html`<border-component><span>Bordered Text</span></border-component>`, document.body)
    // wait for happyDom to initialize
    await window.happyDOM.whenAsyncComplete();
    // store initialized state
    element = document.body.querySelector("border-component") as BorderComponent;
  });

  it("renders border", async () => {
    // expect shadowroot
    expect(element.shadowRoot).to.exist;

    // get inner div
    const div = element.shadowRoot!.querySelector("div");

    expect(div).to.exist;
    expect(div?.classList.contains("border")).to.be.true;
  });

  it("renders slotted element", async () => {
    // expect shadowroot
    const slotted = element.querySelector("span");

    // get inner div
    expect(slotted).to.exist;
    expect(slotted?.innerText).to.equal("Bordered Text");
  });
});
