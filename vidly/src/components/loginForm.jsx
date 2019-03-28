import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  // The Joi schema for validation
  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Email address"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      // Call the server
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      // Store the JSON webtoken returned from the authorisation server in local storage
      localStorage.setItem("token", jwt);
      // Directs to the home page via a full page reload
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    // Redirect user to a different page
  };

  render() {
    return (
      <div>
        <h1 className="login-text">Login</h1>
        <form className="login-box" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Email address")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
