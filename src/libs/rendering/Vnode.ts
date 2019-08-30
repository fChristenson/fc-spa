import { IComponent } from "../components/component";

export interface IVnode {
  nodeName: keyof HTMLElementTagNameMap;
  attributes: Object;
  children: (IVnode | string)[];
}

export const Vnode = (
  nodeName: keyof HTMLElementTagNameMap,
  options: { attributes?: Object; children?: (IVnode | string)[] }
): IVnode => {
  return {
    nodeName: nodeName,
    attributes: options.attributes || {},
    children: options.children || []
  };
};
