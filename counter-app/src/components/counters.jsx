import React, { Component } from 'react'
import Counter from "./counter"

class Counters extends Component {
  state = {
    // An array of counters for each object that stores some infor on each product
    counters: [
      { id: 1, value: 2, product: 'Bread' },
      { id: 2, value: 3, product: 'Jam' },
      { id: 3, value: 1, product: 'Spoons'},
      { id: 4, value: 9000, product: 'Freight train' },
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
    const counters = this.state.counters.map(c => {
      c.value = 0
      return c
    })
    this.setState({ counters: counters })
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
                                                          counter={counter}
                                                          />))}
        </div>
      </div>
    )
  }
}

export default Counters
