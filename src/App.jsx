import "./App.css";
import ToDo from "./ToDo";
import React from "react";
import Filters from "./Filters";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      changeColor: false,
      todos: [],
      isOnlyUndone: false,
      substring: "",
      filterTodo: () => true,
      filters: [],
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
    this.setState({
      name: "",
      todos: [...this.state.todos, { name: this.state.name, done: false }],
    });
  };

  handleSetDone = (done, name) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.name === name ? { name, done } : todo
      ),
    });
  };
  handleSetSubstring = (e) => {
    this.setState({
      substring: e.target.value,
    });
  };

  handleFilterAdd = (key, fn) => {
    this.setState({
      filters: [
        ...this.state.filters.filter((f) => f.key !== key),
        { key, fn },
      ],
    });
  };
  render() {
    const { todos, name, isOnlyUndone, substring, filters } = this.state;
    return (
      <div>
        <Filters onFilteredAdd={this.handleFilterAdd} />
        <div>
          <input value={this.state.name} onChange={this.handleSetName} />
          <button
            className={this.state.changeColor ? "subActive" : "submit"}
            onClick={this.handleForm}
          >
            submit
          </button>
        </div>

        {todos
          .filter((todo) =>
            filters
              .toSorted((a, b) => a.priorirty - b.priority)
              .every((f) => f.fn(todo))
          )
          .map((todo) => (
            <ToDo
              key={index}
              name={todo.name}
              done={todo.done}
              onDone={this.handleSetDone}
            />
          ))}
      </div>
    );
  }
}

export default App;

//{} - интерполяция
// onChange{()=>{}} - атрибут , которой передает функцтю
// setState()
