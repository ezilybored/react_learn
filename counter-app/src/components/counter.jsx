import React, { Component } from 'react'

//Extend Component to inherit methiods from Component
class Counter extends Component {
  state = {
    // State is used to store data
    count: 0,
  }
  // 3 ways of CSS styling. Inline, as an object, or as a separate file
  styles = {
    fontSize: 20,
    fontWeight: 'bold'
  }

  // Create a class to be able to bind the keyword this to the Counter object
  /*
  constructor() {
    super()
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  // Event handler
  handleIncrement() {
    console.log('Increment Clicked', this)
  }
  */

  // Alternative method for binding keyword this to the counter object
  // Use an arrow function as these inherit the binding of this from parents
  // Event handler
  handleIncrement = () => {
    // The state of the component is changed indirectly using setState
    this.setState({ count: this.state.count + 1 })
  }

  render() {

    return (
      // Use React.Fragment in place of <div> as <div> ends up doing some strange double <div> thing
      <React.Fragment>
        { /* className used instead of class. Using bootstrap classes here */ }
        <span style={ this.styles } className={this.getBadgeClasses()}>{this.formatCount()}</span>
        { /* Adding onClick event. Note when implementing the method skip the () at the end */}
        <button style={{ fontSize: 20, fontWeight: 'bold' }} onClick={this.handleIncrement} className="btn btn-secondary btn-sm">Increment</button>
      </React.Fragment>
    )
  }

  // Setting the colour of the cart number
  getBadgeClasses() {
    let classes = "badge m-2 badge-"
    // Appends either warning or primary to the end of classes depending on its value === 0 or not
    classes += (this.state.count === 0) ? "warning" : "primary"
    return classes
  }

  formatCount() {
    // Stores the count value from this.state as a new const count
    const { count } = this.state
    // If this.state.count is 0 show Zero. If not then show the value of this.state.count
    return count === 0 ? 'Zero' : count
  }
}

export default Counter
