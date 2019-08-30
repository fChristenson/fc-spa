import { Component } from "./component";
import { Element } from "../rendering/element";

export class NotFound extends Component {
  render() {
    return Element("h1", { children: ["404 Not found"] });
  }
}
