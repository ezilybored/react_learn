import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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

  doSubmit = () => {
    // Call the server
    // Redirect user to a different page
    console.log("Submitted");
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
