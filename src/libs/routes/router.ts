import { IRoute } from "./route";
import { NotFound } from "../components/notFound";
import { addEventListeners } from "../rendering/mount";
import { render } from "../rendering/render";
import { diff } from "../rendering/diff";

export const routes = (root: HTMLElement, routes: IRoute[]) => {
  let component = getRouteComponent(routes);
  let vdom = component.render();
  const appNode = render(window, vdom);
  root.appendChild(appNode);

  window.onhashchange = () => {
    component = getRouteComponent(routes);
    vdom = component.render();
    const appNode = render(window, vdom);
    root.replaceChild(appNode, root.firstChild as Element);
  };

  addEventListeners();

  window.addEventListener("stateupdate", () => {
    const newVdom = component.render();
    const patch = diff(window, vdom, newVdom);
    patch(root.firstChild as Element);
    vdom = newVdom;
  });
};

const getRouteComponent = (routes: IRoute[]) => {
  const pathToMount = window.location.hash.split("!")[1];
  const route = routes.find(c => c.path === pathToMount);
  return (route && route.component) || new NotFound();
};
