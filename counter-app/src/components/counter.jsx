import React, { Component } from 'react'

//Extend Component to inherit methiods from Component
class Counter extends Component {
  state = {
    // State is used to store data
    count: 0,
    tags: ['tag1', 'tag2', 'tag3']
  }
  // 3 ways of CSS styling. Inline, as an object, or as a separate file
  styles = {
    fontSize: 20,
    fontWeight: 'bold'
  }

  // Conditionally rendering tags to the lis
  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no elements in this list</p>
    // If there are tags then use the render method that was previously in the jsx
    // Each item in the list needs a unique key. Here it is given by the string as in each item the text is different.
    // It could be the id field from an object
    return <ul>{ this.state.tags.map(tag => <li key={tag}>{tag}</li>) }</ul>
  }

  render() {

    return (
      // Use React.Fragment in place of <div> as <div> ends up doing some strange double <div> thing
      <React.Fragment>
        { /* className used instead of class. Using bootstrap classes here */ }
        <span style={ this.styles } className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button style={{ fontSize: 20, fontWeight: 'bold' }} className="btn btn-secondary btn-sm">Increment</button>
        { /* { this.state.tags.map(tag => <li key={tag}>{tag}</li>) } is used to render a list from an array defined in the state object*/ }
        <ul>
          { this.renderTags() }
        </ul>

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
