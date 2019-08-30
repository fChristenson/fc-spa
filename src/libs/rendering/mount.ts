import { IComponent } from "../components/component";
import { render } from "./render";
import { diff } from "./diff";

export const mount = (root: HTMLElement, component: IComponent) => {
  let vdom = component.render();
  const appNode = render(window, vdom);
  root.appendChild(appNode);

  addEventListeners();

  window.addEventListener("stateupdate", () => {
    const newVdom = component.render();
    const patch = diff(window, vdom, newVdom);
    patch(root.firstChild as Element);
    vdom = newVdom;
  });
};

export const addEventListeners = () => {
  window.addEventListener("dblclick", sendUpdateEvent);
  window.addEventListener("click", sendUpdateEvent);
  window.addEventListener("keyup", sendUpdateEvent);
  window.addEventListener("keydown", sendUpdateEvent);
};

export const sendUpdateEvent = () =>
  window.dispatchEvent(new Event("stateupdate"));
