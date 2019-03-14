import React, { Component } from 'react'
import Counter from "./counter"

class Counters extends Component {
  state = {
    // An array of counters for each object that stores some infor on each product
    counters: [
      { id: 1, value: 2, product: 'Bread' },
      { id: 2, value: 0, product: 'Jam' },
      { id: 3, value: 1, product: 'Spoons'},
      { id: 4, value: 9000, product: 'Freight train' },
    ]
  }
  render() {
    return(
      <div>
        {/* Map is used to insert the counters for each product into the page. data is passed in through object keys */}
        { this.state.counters.map(counter => (
          <Counter key={counter.id} value={counter.value} product={counter.product} id={counter.id}>
            {/* Additional code can be placed within the Counter tags and be passed to the children via props.children  */}
            <h4>Amount of {counter.product} in your cart</h4>
          </Counter>
        ))}
      </div>
    )
  }
}

export default Counters
