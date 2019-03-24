import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }
  };
  // Use the hook componentDidMount and ref to set focus when the page loads
  // This could be done by setting the autoFocus attribute on the <input> tag
  username = React.createRef();

  componentDidMount() {
    this.username.current.focus();
  }

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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            {/* value={this.state.account.username}  This binds the value of the input field to the object found in state */}
            <input
              value={account.username}
              onChange={this.handleChange}
              ref={this.username}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              id="password"
              name="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
