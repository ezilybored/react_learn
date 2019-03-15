import React, { Component } from 'react'

//Extend Component to inherit methiods from Component
class Counter extends Component {
  state = {

  }
  // 3 ways of CSS styling. Inline, as an object, or as a separate file
  styles = {
    fontSize: 20,
    fontWeight: 'bold',
  }

  render() {

    return (
      <React.Fragment>
        <span
          style={ this.styles }
          className={this.getBadgeClasses()}>{this.formatCount()}
        </span>
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ () => this.props.onIncrement(this.props.counter) }
          className="btn btn-secondary btn-sm m-2">{ this.props.counter.product }
        </button>
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ () => this.props.onRemoveOne(this.props.counter) }
          className="btn btn-secondary btn-sm m-2">Remove Item
        </button>
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ () => this.props.onClear(this.props.counter) }
          className="btn btn-danger btn-sm m-2">Clear
        </button>
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
    classes += (this.props.counter.value === 0) ? "warning" : "primary"
    return classes
  }

  formatCount() {
    // Stores the count value from this.state as a new const count
    const { value } = this.props.counter
    // If this.state.count is 0 show Zero. If not then show the value of this.state.count
    return value === 0 ? 'Zero' : value
  }
}

export default Counter
