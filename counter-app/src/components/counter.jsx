import React, { Component } from 'react'

//Extend Component to inherit methiods from Component
class Counter extends Component {
  state = {
    // State is used to store data
    // Value is the current value of that item
    //The actual value is taken from the props passed in from the parent
    //value: this.props.value,
    value: 0
  }
  // 3 ways of CSS styling. Inline, as an object, or as a separate file
  styles = {
    fontSize: 20,
    fontWeight: 'bold',
  }

  // Use an arrow function as these inherit the binding of this from parents
  // Event handler
  // Add in an argument called product. Thsi could be from an object containing a list of products
  handleIncrement = () => {
    // The state of the component is changed indirectly using setState
    const value = this.state.value + this.props.counter.value
    this.setState({ value: value })
  }

  // An event to handle the emptying of a purchase amount
  handleClear = () => {
    // The state of the component is changed indirectly using setState
    const value =  0
    this.setState({ value: value })
  }

  // An event to handle the removal of a single item
  handleRemoveOne= () => {
    // The state of the component is changed indirectly using setState
    if (this.state.value > 0){
      const value = this.state.value - this.props.counter.value
      this.setState({ value: value })
    }
  }

  render() {

    return (
      // Use React.Fragment in place of <div> as <div> ends up doing some strange double <div> thing
      <React.Fragment>
        { /* className used instead of class. Using bootstrap classes here */ }
        <span style={ this.styles } className={this.getBadgeClasses()}>{this.formatCount()}</span>
        { /* Adding onClick event. Note when implementing the method without parameters skip the () at the end */}
        { /* When passing a parameter in write an inline function to handle this with the arguments passed in here */}
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ this.handleIncrement }
          className="btn btn-secondary btn-sm m-2">{ this.props.counter.product }
        </button>
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ this.handleRemoveOne }
          className="btn btn-secondary btn-sm m-2">Remove Item
        </button>
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ this.handleClear }
          className="btn btn-danger btn-sm m-2">Clear
        </button>
        {/* The handleDelete function will be handled by the counters component */}
        {/* onClick={ () => this.props.onDelete(this.props.id) } this passes the ID of the product to remove back to the parent when the call is made */}
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ () => this.props.onDelete(this.props.counter.id) }
          className="btn btn-danger btn-sm m-2">Delete
        </button>
        </React.Fragment>
    )
  }

  // Setting the colour of the cart number
  getBadgeClasses() {
    let classes = "badge m-2 badge-"
    // Appends either warning or primary to the end of classes depending on its value === 0 or not
    classes += (this.state.value === 0) ? "warning" : "primary"
    return classes
  }

  formatCount() {
    // Stores the count value from this.state as a new const count
    const { value } = this.state
    // If this.state.count is 0 show Zero. If not then show the value of this.state.count
    return value === 0 ? 'Zero' : value
  }
}

export default Counter
