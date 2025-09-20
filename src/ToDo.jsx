import "./ToDo.css";
import React from "react";

export default class ToDo extends React.Component {
  render() {
    return (
      <div className={this.props.done ? "done" : ""}>
        <input
          type="checkbox"
          checked={this.props.done}
          onChange={this.handleCheck}
        />
        {this.props.name}
      </div>
    );
  }

  handleCheck = (e) => {
    const done = e.target.checked;
    this.props.onDone(done, this.props.name);
  };
}
