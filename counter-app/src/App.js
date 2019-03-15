import React, { Component } from 'react';
import './App.css';
import Counters from "./components/counters"
import Navbar from "./components/navbar"

class App extends Component {

    // All pasted code that previously resided in counters.jsx. Moved so that other components can access the state
    state = {
      // An array of counters for each object that stores some infor on each product
      counters: [
        { id: 1, value: 0, cost: 2, product: 'Bread' },
        { id: 2, value: 0, cost: 1, product: 'Jam' },
        { id: 3, value: 0, cost: 3, product: 'Spoons'},
        { id: 4, value: 0, cost: 9000, product: 'Freight train' },
      ],

      total: 0
    }

    // counterID sets the product to delete from the list
    handleDelete = (counterId) => {
      console.log('Event Handler Called on ', counterId)
      // Creates a new array filtering out any entries where the id is the same as the id passed from the child
      const counters = this.state.counters.filter(c => c.id !== counterId)
      // Sets the value of counters in the state object with the value in the counters constant just set
      this.setState({ counters: counters })

      const total = 0
      this.setState({ total: total })
    }

    // Resets all values to 0 when the reset button is pressed
    handleReset = counter => {

      const counters = this.state.counters.map(c => {
        c.value = 0
        return c
      })
      this.setState({ counters: counters })

      const countersreset = [...this.state.counters]
      // Find the index of the counter passed in by the child on the event click
      const index = countersreset.indexOf(counter)
      countersreset[index] = {...counter}
      const total = 0
      this.setState({ total: total })
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

      const total = this.state.total + counters[index].cost
      this.setState({ total: total })
    }

    // An event to handle the emptying of a purchase amount
    handleClear = counter => {
      const counters = [...this.state.counters]
      // Find the index of the counter passed in by the child on the event click
      const index = counters.indexOf(counter)
      counters[index] = {...counter}
      const total = this.state.total - counters[index].value
      this.setState({ total: total })
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

        const total = this.state.total - counters[index].cost
        this.setState({ total: total })
      }
    }

  render() {
    return (
      <React.Fragment>
      {/* Passes the total number of items to the Navbar. Filters out any with values of 0 */}
        <Navbar totalCount={this.state.total}/>
          <main className="container">
            <Counters onDelete={this.handleDelete}
                      onIncrement={this.handleIncrement}
                      onClear={this.handleClear}
                      onRemoveOne={this.handleRemoveOne}
                      onReset={this.handleReset}
                      counters={this.state.counters}
            />
          </main>
      </React.Fragment>
    );
  }
}

export default App;
