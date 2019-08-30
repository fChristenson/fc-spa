import { IVnode } from "./Vnode";
import { render, setAttibutes } from "./render";

export const diff = (
  window: Window,
  oldNode: IVnode | string,
  newNode: IVnode | string | undefined
) => {
  if (newNode === undefined) {
    return (node: Element) => {
      node.remove();
      return undefined;
    };
  }

  if (typeof oldNode === "string" || typeof newNode === "string") {
    if (oldNode !== newNode) {
      return (node: Element) => {
        node.replaceWith(render(window, newNode));
      };
    } else {
      return (node: Element) => node;
    }
  }

  if (oldNode.nodeName !== newNode.nodeName) {
    return (node: Element) => {
      node.replaceWith(render(window, newNode));
    };
  }

  const attributesPatch = diffAttributes(oldNode, newNode);
  const childrenPatch = diffChildren(
    window,
    oldNode.children,
    newNode.children
  );

  return (node: Element) => {
    attributesPatch(node);
    childrenPatch(node);
    return node;
  };
};

const diffAttributes = (oldNode: IVnode, newNode: IVnode) => {
  const patches: ((node: Element) => void)[] = [];

  patches.push(createSetAttributes(newNode.attributes));

  for (let attr in oldNode.attributes) {
    if (attr in newNode.attributes === false) {
      patches.push(createDeleteAttribute(attr));
    }
  }

  return (node: Element) => {
    patches.forEach(patch => patch(node));
    return node;
  };
};

const createSetAttributes = (attibutes: Object) => {
  return (node: Element) => {
    setAttibutes(node, attibutes);
  };
};

const createDeleteAttribute = (name: string) => {
  return (node: Element) => {
    node.removeAttribute(name);
  };
};

const diffChildren = (
  window: Window,
  oldNodeChildren: (IVnode | string)[],
  newNodeChildren: (IVnode | string)[]
) => {
  const childPatches: ((node: Element) => void)[] = [];
  oldNodeChildren.forEach((child, i) =>
    childPatches.push(diff(window, child, newNodeChildren[i]))
  );

  const appends: ((node: Element) => void)[] = [];
  newNodeChildren.slice(oldNodeChildren.length).forEach(child => {
    appends.push((node: Element) => node.appendChild(render(window, child)));
  });

  return (node: Element) => {
    node.childNodes.forEach((child, i) => {
      childPatches[i](child as Element);
    });
    appends.forEach(append => {
      append(node);
    });

    return node;
  };
};
