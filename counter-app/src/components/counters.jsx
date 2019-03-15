import React, { Component } from 'react'
import Counter from "./counter"

class Counters extends Component {

  // All state control and asscociated  fucntions moved to app.js

  render() {
    return(
      <div className="mainbox">
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ this.props.onReset }
          className="btn btn-secondary btn-sm m-2">Resest all
        </button>
        <div className="counters">
          {/* Map is used to insert the counters for each product into the page. data is passed in through object keys */}
          {/* This is used to pass a reference to the function to the child as a prop */}
          {/* The whole counter object can be passed using counter={counter} */}
          {/* This process now bubbles up the event from the child to the parent */}
          { this.props.counters.map(counter => (<Counter  key={counter.id}
                                                          onDelete={this.props.onDelete}
                                                          onIncrement={this.props.onIncrement}
                                                          onClear={this.props.onClear}
                                                          onRemoveOne={this.props.onRemoveOne}
                                                          counter={counter}
                                                          />))}
        </div>
      </div>
    )
  }
}

export default Counters
