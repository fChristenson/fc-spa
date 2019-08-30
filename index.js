import * as f from "./src/libs";

class TodoList extends f.Component {
  constructor() {
    super();
    this.state.todos = ["foo", "bar", "baz"];
    this.state.todo = "";
  }

  render() {
    const todos = this.state.todos.map(todo => {
      return f.Element("li", {
        children: [
          todo,
          f.Element("button", {
            attributes: {
              onclick: () => {
                this.setState({
                  todos: this.state.todos.filter(t => t !== todo)
                });
              }
            },
            children: ["X"]
          })
        ]
      });
    });
    const input = f.Element("div", {
      children: [
        f.Element("input", {
          attributes: {
            name: "todo",
            onkeyup: e => {
              this.setState({ todo: e.target.value });
            }
          }
        }),
        f.Element("span", {
          attributes: {
            style: { margin: "0 0 0 50px" }
          },
          children: [this.state.todo]
        })
      ]
    });
    const form = f.Element("form", {
      attributes: {
        onsubmit: event => {
          event.preventDefault();
          this.state.todos.push(event.target.todo.value);
          this.setState({ todos: this.state.todos });
          event.target.todo.value = "";
        }
      },
      children: [input]
    });
    const list = f.Element("ul", { children: todos });
    return f.Element("div", { children: [list, form] });
  }
}

const todoList = new TodoList();

class App extends f.Component {
  constructor() {
    super();
    this.state.foo = 0;
  }

  render() {
    const Header = f.Element("h1", {
      attributes: {
        style: { color: this.state.foo % 2 === 0 ? "steelblue" : "gold" }
      },
      children: ["Hello World!"]
    });
    const Button = f.Element("button", {
      attributes: {
        onclick: () => {
          this.setState({ foo: this.state.foo + 1 });
        }
      },
      children: [`Clicked ${this.state.foo} times`]
    });
    const link = f.Element("a", {
      attributes: {
        href: "#!/foo"
      },
      children: ["foo"]
    });
    return f.Element("div", {
      children: [Header, todoList, Button, link]
    });
  }
}

f.routes(document.getElementById("root"), [
  {
    path: "/",
    component: new App()
  },
  {
    path: "/foo",
    component: new TodoList()
  }
]);

//f.mount(document.getElementById("root"), new App());
