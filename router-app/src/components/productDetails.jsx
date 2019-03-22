import React, { Component } from "react";

class ProductDetails extends Component {
  handleSave = () => {
    // Navigate to /products (when save button clicked) using functions found in the History object
    this.props.history.push("/products");
    // Navigation back can be blocked using this.props.history.replace("/products");
    // This does not add the current page to the history object. Often used to block navigation back to login pages
  };

  render() {
    return (
      <div>
        <h1>Product Details - {this.props.match.params.id}</h1>
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default ProductDetails;
