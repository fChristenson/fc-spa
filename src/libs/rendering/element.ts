import { IComponent } from "../components/component";
import { IVnode, Vnode } from "./Vnode";

interface IOptions {
  attributes?: Object;
  children?: (IVnode | string | IComponent)[];
}

export const Element = (
  nodeName: keyof HTMLElementTagNameMap,
  options: IOptions = {}
) => {
  const opts = {
    ...options,
    children: mapChildren(options.children)
  };
  return Vnode(nodeName, opts);
};

const mapChildren = (
  children?: (IVnode | string | IComponent)[]
): (IVnode | string)[] => {
  if (!children) return [];
  return children.map(child => {
    //@ts-ignore
    if (child.render) {
      return (child as IComponent).render();
    }
    return child as any;
  });
};
