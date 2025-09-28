import "./ToDo.css";
import React from "react";

export default class ToDo extends React.Component {
  render() {
    return (
      <div className="todo">
        <div className={this.props.done ? "done" : ""}>
          <input
            type="checkbox"
            checked={this.props.done}
            onChange={this.handleCheck}
          />
          {this.props.name}
          {this.handleFormatTime(this.props.id)}
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

    this.props.onDone(done, this.props.id);
  };
  handleDeleteTodo = (id) => {
    this.props.onDelete(id);
  };
  handleFormatTime = (timestamp) => {
    const [hours, minutes, seconds] = new Date(timestamp)
      .toTimeString()
      .split(" ")[0]
      .split(":");
    return `  ${hours}:${minutes}:${seconds}`;
  };
}
