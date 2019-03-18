import React, { Component } from "react";

class Like extends Component {
  render() {
    return (
      <React.Fragment>
        <i
          className={this.isLiked()}
          aria-hidden="true"
          onClick={() => this.props.onClick(this.props.movie)}
          style={{ cursor: "pointer" }}
        />
      </React.Fragment>
    );
  }

  isLiked() {
    let checked = "fa fa-heart";
    if (!this.props.liked) checked += "-o";
    return checked;
  }
}

export default Like;
