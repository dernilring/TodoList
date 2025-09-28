import "./ToDo.css";
import React from "react";

export default class ToDo extends React.Component {
  render() {
    return (
      <div>
        <div className={this.props.done ? "done" : ""}>
          <input
            type="checkbox"
            checked={this.props.done}
            onChange={this.handleCheck}
          />
          {this.props.name}
          {this.props.id}
        </div>
        <button
          className="delete"
          onClick={() => this.handleDeleteTodo(this.props.id)}
        >
          delete
        </button>
      </div>
    );
  }

  handleCheck = (e) => {
    const done = e.target.checked;
    console.log("ToDo props:", this.props);
    this.props.onDone(done, this.props.id);
  };
  handleDeleteTodo = (id) => {
    this.props.onDelete(id);
  };
}
