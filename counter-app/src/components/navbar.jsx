import React from 'react';

// As Navbar has no state it can be converted into a stateless functional component.

function Navbar (props) {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#1">
        Proto Shopping App
      </a>
      <a className="navbar-brand" href="#2">
        Total cost: $ <span className="badge badge-pill badge-secondary">{props.totalCount}</span>
      </a>
    </nav>
  )
}

/*
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#1">
          Proto Shopping App
        </a>
        <a className="navbar-brand" href="#2">
          Total cost: $ <span className="badge badge-pill badge-secondary">{this.props.totalCount}</span>
        </a>
      </nav>
    )
  }
}
*/

export default Navbar
