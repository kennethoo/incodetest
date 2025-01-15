import React, { Component } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";

import TopNavigation from "landing/TopNavigation";
import One from "recover/one";
import Two from "recover/two";
import Three from "recover/three";

let source;
source = meettumApi.CancelToken.source();
class Recorver extends Component {
  state = {
    step: 1,
    email: "",
  };
  updateEmail = (data) => {
    this.setState({
      email: data,
    });
  };
  move = (data) => {
    this.setState({
      step: data,
    });
  };
  openNav = (data) => {
    this.setState({
      nav: data,
    });
  };
  componentDidMount = () => {};
  handleChange = () => {};
  render() {
    return (
      <div id="container">
        <TopNavigation openNav={this.openNav} />
        <div className="div-hold-box">
          {this.state.step === 0 ? (
            ""
          ) : this.state.step === 1 ? (
            <One updateEmail={this.updateEmail} move={this.move} />
          ) : this.state.step === 2 ? (
            <Two email={this.state.email} move={this.move} />
          ) : (
            <Three email={this.state.email} />
          )}
        </div>
      </div>
    );
  }
}

export default Recorver;
