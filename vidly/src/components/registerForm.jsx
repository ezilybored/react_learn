import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { emailAddress: "", password: "", name: "" },
    errors: {}
  };

  // The Joi schema for validation
  schema = {
    emailAddress: Joi.string()
      .required()
      .email()
      .label("Email address"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      // Sets the web token using the custom header returned from the server
      localStorage.setItem("token", response.headers["x-auth-token"]);
      // Directs to the home page via a full page reload
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.emailAddress = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="login-text">Register</h1>
        <form className="login-box" onSubmit={this.handleSubmit}>
          {this.renderInput("emailAddress", "Email address")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
