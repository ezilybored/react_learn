import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }
  };
  // Use the hook componentDidMount and ref to set focus when the page loads
  // This could be done by setting the autoFocus attribute on the <input> tag
  /*
  username = React.createRef();

  componentDidMount() {
    this.username.current.focus();
  }
  */

  handleSubmit = e => {
    e.preventDefault();
    // Call the server
    // Redirect user to a different page
    console.log("Submitted");
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account: account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1 className="login-text">Login</h1>
        <form className="login-box" onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
