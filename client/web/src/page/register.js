import React, { Component } from "react";

import RegisterOne from "register/registerOne";
import RegisterTwo from "register/registerTwo";
import RegisterThree from "register/registerThree";
import TopNavigation from "landing/TopNavigation";
import { Link } from "react-router-dom";
class Register extends Component {
  state = {
    fullName: "",
    username: "",
    password: "",
    email: "",
    messagefullname: "",
    messageusername: "",
    messagepassword: "",
    messageeemail: "",
    age: "",
    dateofBirth: "",
    step: 0,
    locationDetail: null,
  };
  constructor(props) {
    super(props);
  }

  handleNext = (data) => {
    this.setState({
      step: data,
    });
  };

  openNav = (data) => {
    this.setState({
      nav: data,
    });
  };

  handleChange = (e) => {
    if (e.target.name === "password") {
      this.setState({
        password: e.target.value,
      });
    }

    if (e.target.name === "email") {
      this.setState({
        email: e.target.value.trim(),
      });
    }
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value.trim(),
      });
    }
  };

  componentDidMount = () => {};
  render() {
    return (
      <div id="container">
        <TopNavigation openNav={this.openNav} />
        <div className="div-hold-box">
          <div className="wrapjrijrr">
            {this.state.step === 0 ? (
              <RegisterOne
                email={this.state.email}
                handleNext={this.handleNext}
                handleChange={this.handleChange}
              />
            ) : this.state.step === 1 ? (
              <RegisterTwo
                email={this.state.email}
                handleNext={this.handleNext}
              />
            ) : (
              <RegisterThree
                data={this.state}
                handleNext={this.handleNext}
                handleChange={this.handleChange}
              />
            )}
          </div>
          <div className="exter-messge">
            <div className="warer-sin">
              <p>Already have a account ?</p>
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
