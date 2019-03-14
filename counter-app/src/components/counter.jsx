import React, { Component } from 'react'

//Extend Component to inherit methiods from Component
class Counter extends Component {
  state = {
    // State is used to store data
    count: 0,
  }
  // 2 ways of CSS styling. Inline, as an object, or as a separate file
  styles = {
    fontSize: 20,
    fontWeight: 'bold'
  }
  render() {
    return (
      // Use React.Fragment in place of <div> as <div> ends up doing some strange double <div> thing
      // Javascript expressions live between { }
      // className used instead of class. Using bootstrap classes here
      <React.Fragment>
        <span style={ this.styles } className="badge badge-primary m-2">{this.formatCount()}</span>
        <button style={{ fontSize: 20, fontWeight: 'bold' }} className="btn btn-secondary btn-sm">Increment</button>
      </React.Fragment>
    )
  }

  formatCount() {
    // Stores the count value from this.state as a new const count
    const { count } = this.state
    // If this.state.count is 0 show Zero. If not then show the value of this.state.count
    return count === 0 ? 'Zero' : count
  }
}

export default Counter
