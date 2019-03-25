import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };
  // Use the hook componentDidMount and ref to set focus when the page loads
  // This could be done by setting the autoFocus attribute on the <input> tag
  /*
  username = React.createRef();

  componentDidMount() {
    this.username.current.focus();
  }
  */

  // The basic form validation function
  validate = () => {
    const errors = {};

    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required.";

    if (account.password.trim() === "")
      errors.password = "Password is required.";

    // If the number of keys in the error object is 0 then return null, if not then return the errors object
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    // Calls a function to update errors and then set them in the state
    const errors = this.validate();
    // If there are no errors return an empty object (not null)
    this.setState({ errors: errors || {} });
    // If there are errors then don't call the server
    if (errors) return;

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
    const { account, errors } = this.state;
    return (
      <div>
        <h1 className="login-text">Login</h1>
        <form className="login-box" onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
