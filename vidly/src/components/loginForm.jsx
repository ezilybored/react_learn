import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router-dom";
import authService, { login } from "../services/authService";

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
      await login(data.username, data.password);

      // Gets the information on where the user came from to this page
      const { state } = this.props.location;
      // Directs back to the last page they were at before being asked to login
      window.location = state ? state.from.pathname : "/";
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
    if (authService.getCurrentUser()) return <Redirect to="/" />;
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
