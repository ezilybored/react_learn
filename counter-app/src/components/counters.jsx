import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  // All state control and asscociated  fucntions moved to app.js

  render() {
    // Destructuring this.props. When passing properties to counter no longer need this.props
    // E.g. onDelete={this.props.onDelete} is now onDelete={onDelete}
    const { onDelete, onIncrement, onClear, onRemoveOne, counter } = this.props;

    return (
      <div className="mainbox">
        <div className="titles">
          <h1 className="total">Total</h1>

          <h1 className="price">Price</h1>
        </div>
        <div className="counters">
          {/* Map is used to insert the counters for each product into the page. data is passed in through object keys */}
          {/* This is used to pass a reference to the function to the child as a prop */}
          {/* The whole counter object can be passed using counter={counter} */}
          {/* This process now bubbles up the event from the child to the parent */}
          {this.props.counters.map(counter => (
            <Counter
              key={counter.id}
              onDelete={onDelete}
              onIncrement={onIncrement}
              onClear={onClear}
              onRemoveOne={onRemoveOne}
              counter={counter}
            />
          ))}
        </div>
        <button
          style={{ fontSize: 20, fontWeight: "bold" }}
          onClick={this.props.onReset}
          className="btn btn-danger btn-sm m-2"
        >
          Resest all
        </button>
      </div>
    );
  }
}

export default Counters;
