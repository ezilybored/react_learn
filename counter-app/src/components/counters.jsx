import React, { Component } from 'react'
import Counter from "./counter"

class Counters extends Component {
  state = {
    // An array of counters for each object that stores some infor on each product
    counters: [
      { id: 1, value: 0, cost: 2, product: 'Bread' },
      { id: 2, value: 0, cost: 1, product: 'Jam' },
      { id: 3, value: 0, cost: 3, product: 'Spoons'},
      { id: 4, value: 0, cost: 9000, product: 'Freight train' },
    ]
  }

  // counterID sets the product to delete from the list
  handleDelete = (counterId) => {
    console.log('Event Handler Called on ', counterId)
    // Creates a new array filtering out any entries where the id is the same as the id passed from the child
    const counters = this.state.counters.filter(c => c.id !== counterId)
    // Sets the value of counters in the state object with the value in the counters constant just set
    this.setState({ counters: counters })
  }

  // Resets all values to 0 when the reset button is pressed
  handleReset = () => {
    console.log('reset button pressed')
    /*
    const counters = this.state.counters
    console.log(counters)
    this.setState({ counters: counters })
    */

    const counters = this.state.counters.map(c => {
      c.value = 0
      return c
    })
    this.setState({ counters: counters })
    

  }

  // Event handlers
  // Add in an argument called product. Thsi could be from an object containing a list of products
  handleIncrement = counter => {
    // The state of the component is changed indirectly using setState
    // Use spread operator to clone the counters array
    const counters = [...this.state.counters]
    // Find the index of the counter passed in by the child on the event click
    const index = counters.indexOf(counter)
    counters[index] = {...counter}
    counters[index].value = counters[index].value + counters[index].cost
    this.setState({ counters: counters })
  }

  // An event to handle the emptying of a purchase amount
  handleClear = counter => {
    const counters = [...this.state.counters]
    // Find the index of the counter passed in by the child on the event click
    const index = counters.indexOf(counter)
    counters[index] = {...counter}
    counters[index].value = 0
    this.setState({ counters: counters })

  }

  // An event to handle the removal of a single item
  handleRemoveOne= counter => {
    const counters = [...this.state.counters]
    // Find the index of the counter passed in by the child on the event click
    const index = counters.indexOf(counter)
    counters[index] = {...counter}
    if (counters[index].value > 0){
      counters[index].value = counters[index].value - counters[index].cost
      this.setState({ counters: counters })
    }
  }


  render() {
    return(
      <div>
        <button
          style={{ fontSize: 20, fontWeight: 'bold' }}
          onClick={ this.handleReset }
          className="btn btn-secondary btn-sm m-2">Resest all
        </button>
        <div className="counters">
          {/* Map is used to insert the counters for each product into the page. data is passed in through object keys */}
          {/* This is used to pass a reference to the function to the child as a prop */}
          {/* The whole counter object can be passed using counter={counter} */}
          { this.state.counters.map(counter => (<Counter  key={counter.id}
                                                          onDelete={this.handleDelete}
                                                          onIncrement={this.handleIncrement}
                                                          onClear={this.handleClear}
                                                          onRemoveOne={this.handleRemoveOne}
                                                          counter={counter}
                                                          />))}
        </div>
      </div>
    )
  }
}

export default Counters
