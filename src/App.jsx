import "./App.css";
import ToDo from "./ToDo";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      changeColor: false,
      todos: [],
    };
  }

  handleSetName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleForm = (e) => {
    e.preventDefault();
    this.setState({ changeColor: true });
    this.handleAddTODO();
    console.log("form is sent");
  };

  handleAddTODO = () => {
    const todo = {
      name: this.state.name,
      done: false,
    };
    this.setState({
      name: "",
      todos: this.state.todos.concat([todo]),
    });
  };

  handleSetDone = (done, name) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.name === name ? { name, done } : todo
      ),
    });
  };
  render() {
    return (
      <div>
        <input value={this.state.name} onChange={this.handleSetName} />
        <button
          className={this.state.changeColor ? "subActive" : "submit"}
          onClick={this.handleForm}
        >
          submit
        </button>
        <div>
          {this.state.todos.map((todo, index) => (
            <ToDo
              key={index}
              name={todo.name}
              done={todo.done}
              onDone={this.handleSetDone}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

//{} - интерполяция
// onChange{()=>{}} - атрибут , которой передает функцтю
// setState()
