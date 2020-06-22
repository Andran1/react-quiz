import React, { Component } from "react";
import classes from "./Auth.module.css";
import Buttom from "../../components/UI/Button/Button";
import Input from "../../components/UI/input/Input";
import is from "is_js";
import axios from "axios"

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "enter correctly email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "enter correctly password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = async() => {
    const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true,
      };
  
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4manTOkXPfTObbO_VjJWEaQnYm5_y8ME",
          authData
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }

   
  };

  registerHandler = async() => {
    const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true,
      };
  
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4manTOkXPfTObbO_VjJWEaQnYm5_y8ME",
          authData
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }

  };

  submitHandler = (event) => {
    event.preventDefault();
  }

  validateControl (value, validation) {

    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    //   console.log(`${controlName}:`, event.target.value);

    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });
    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Buttom
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Sing in
            </Buttom>

            <Buttom
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Sing up
            </Buttom>
          </form>
        </div>
      </div>
    );
  }
}
