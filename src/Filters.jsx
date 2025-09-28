import React from "react";

export default class Filters extends React.Component {
  render() {
    return (
      <section>
        <div>
          <input type="checkbox" onChange={this.handleUndoneFilterChange} />
          Is only undone
        </div>
        {/* <input value={substring} onChange={this.handleSetSubstring} /> */}
      </section>
    );
  }

  handleUndoneFilterChange = (e) => {
    this.props.onFilteredAdd("undone", (todo) =>
      e.target.checked ? !todo.done : true
    );

    // const f = (todo) => (e.target.checked ? !todo.done : true)
    // f.key = 'undone'
    // this.props.onFilterAdd(f)
  };

  // handleMyNewFilterChange = (e) => {
  //   this.props.onFilterAdd('mynew', (todo) => e.target.checked != 1)
  // }
}
