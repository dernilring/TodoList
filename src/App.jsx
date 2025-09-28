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
      isDeleted: false,
    };
    this.debounceTimer = null;
  }

  handleSetName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleForm = (e) => {
    e.preventDefault();
    this.setState({ changeColor: true });
    this.handleAddTODO();
  };

  handleAddTODO = () => {
    this.setState({
      name: "",
      todos: [
        ...this.state.todos,
        {
          name: this.state.name,
          done: false,
          id: Date.now(),
        },
      ],
    });
  };

  handleSetDone = (done, id) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, done } : todo
      ),
    });
  };

  handleSetSubstring = (e) => {
    let searchValue = e.target.value;
    this.setState({
      substring: searchValue,
    });
    this.handleUseDebounce(searchValue);
    this.handleFilterAdd("substring", (todo) => {
      if (!searchValue) return true;
      return todo.name.toLowerCase().includes(searchValue.toLowerCase());
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

  handleSetOnlyUndone = (e) => {
    this.setState({ isOnlyUndone: e.target.checked });
  };

  handleSearch = (searchValue, todos) => {
    return todos.filter((todo) =>
      todo.name.toLowerCase().includes(searchValue.target.value.toLowerCase())
    );
  };

  handleDeleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  handleUseDebounce = (searchValue) => {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      console.log("Debounced search completed for:", searchValue);
    }, 300);
  };

  handleFormatTime = (timestamp) => {
    const [hours, minutes, seconds] = new Date(timestamp)
      .toTimeString()
      .split(" ")[0]
      .split(":");
    return `  ${hours}:${minutes}:${seconds}`;
  };

  render() {
    const { todos, name, isOnlyUndone, substring, filters } = this.state;

    const filteredTodos = todos.filter((todo) =>
      filters
        .toSorted((a, b) => (a.priority || 0) - (b.priority || 0))
        .every((f) => f.fn(todo))
    );
    return (
      <div>
        <Filters onFilteredAdd={this.handleFilterAdd} />

        <div>
          <input
            type="text"
            value={substring}
            onChange={this.handleSetSubstring}
            placeholder="Поиск задач..."
          />
        </div>
        <div className="enter">
          <input value={this.state.name} onChange={this.handleSetName} />
          <button
            className={this.state.changeColor ? "subActive" : "submit"}
            onClick={this.handleForm}
          >
            submit
          </button>
        </div>

        {filteredTodos.map((todo) => (
          <ToDo
            key={todo.id}
            name={todo.name}
            done={todo.done}
            id={todo.id}
            onDone={this.handleSetDone}
            onDelete={this.handleDeleteTodo}
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

// Пример добавления нового фильтра
// handleSetFilteredName = (e) => {
//   const type = 'важная'
//   this.handleAddFilter('filtertype', (todo) =>
//     type ? todo.type == type : true
//   )
// }
