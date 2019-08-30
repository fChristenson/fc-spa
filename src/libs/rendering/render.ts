import { IVnode } from "./Vnode";

export const render = (window: Window, inputVnode: IVnode | string): Node => {
  if (typeof inputVnode === "string") {
    return window.document.createTextNode(inputVnode);
  }

  const el = window.document.createElement(inputVnode.nodeName);
  setAttibutes(el, inputVnode.attributes);
  appendChildNodes(window, el, inputVnode);

  return el;
};

export const appendChildNodes = (
  window: Window,
  el: Node,
  inputVnode: IVnode
) => {
  for (const vnode of inputVnode.children) {
    if (typeof vnode === "string") {
      el.appendChild(window.document.createTextNode(vnode));
    } else {
      el.appendChild(render(window, vnode));
    }
  }
};

export const setAttibutes = (node: Node, attributes: Object) => {
  Object.keys(attributes).forEach(key => {
    if (key in node) {
      let value;
      if (key === "style") {
        // @ts-ignore
        value = createStyles(attributes[key]);
      } else {
        // @ts-ignore
        value = attributes[key];
      }

      // @ts-ignore
      node[key] = value;
    } else {
      // @ts-ignore
      node.setAttribute(key, attributes[key]);
    }
  });
};

const createStyles = (styles: Object) => {
  return Object.keys(styles)
    .map(key => {
      //@ts-ignore
      return `${key}: ${styles[key]};`;
    })
    .join("");
};
