import React, { Component } from "react";

//Extend Component to inherit methiods from Component
class Counter extends Component {
  // looks at the previous state of the component
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    // Can use this to compare to the current state and make an AJAX server call if there is a change
    if (prevProps.counter.value !== this props.counter.value) {
      // Make AJAX call
    }
  }

  // Called before a component is removed from the DOM
  // E.g. when a counter component is deleted using the delete button
  componentWillUnmount() {

  }

  state = {};
  // 3 ways of CSS styling. Inline, as an object, or as a separate file
  styles = {
    fontSize: 20,
    fontWeight: "bold"
  };

  render() {
    return (
      <React.Fragment>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          style={{ fontSize: 20, fontWeight: "bold" }}
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-primary btn-sm m-2"
        >
          {this.props.counter.product}
        </button>
        <span style={this.styles} className="btn btn-info btn-sm m-2">
          $ {this.props.counter.cost}
        </span>
        <button
          style={{ fontSize: 20, fontWeight: "bold" }}
          onClick={() => this.props.onRemoveOne(this.props.counter)}
          className="btn btn-primary btn-sm m-2"
        >
          Remove Item
        </button>
        <button
          style={{ fontSize: 20, fontWeight: "bold" }}
          onClick={() => this.props.onClear(this.props.counter)}
          className="btn btn-warning btn-sm m-2"
        >
          Clear
        </button>
        {/* onClick={ () => this.props.onDelete(this.props.id) } this passes the ID of the product to remove back to the parent when the call is made */}
        <button
          style={{ fontSize: 20, fontWeight: "bold" }}
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  // Setting the colour of the cart number
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    // Appends either warning or primary to the end of classes depending on its value === 0 or not
    classes += this.props.counter.value === 0 ? "secondary" : "default";
    return classes;
  }

  formatCount() {
    // Stores the count value from this.state as a new const count
    const { value } = this.props.counter;
    // If this.state.count is 0 show Zero. If not then show the value of this.state.count
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
