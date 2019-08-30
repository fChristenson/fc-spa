import { IVnode, Vnode } from "../rendering/Vnode";

export interface IComponent {
  state: any;
  setState: (...args: any) => void;
  render: () => IVnode;
}

export class Component implements IComponent {
  public state = {};
  private window: Window;

  constructor() {
    this.window = window;
    this.setState = this.setState.bind(this);
  }

  setState(args: any) {
    this.state = { ...this.state, ...args };
    const event = new Event("stateupdate");
    this.window.dispatchEvent(event);
  }

  render() {
    return Vnode("h1", { children: ["Hello world"] });
  }
}
