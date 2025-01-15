import React, { Component } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { Link } from "react-router-dom";

class Two extends Component {
  state = {
    code: "",
    loading: false,
    messageusername: "",
  };
  handleChange = (e) => {
    this.setState({
      code: e.target.value,
    });
  };
  handeSubmit = (e) => {
    e.preventDefault();
    if (this.state.code.length === 6) {
      let option = {
        email: this.props.email,
        code: parseInt(this.state.code),
      };
      this.setState({
        loading: true,
      });
      meettumApi
        .post(`/api/v1/validate-verification-code`, option)
        .then((result) => {
          if (result.data.succeeded) {
            this.props.move(3);
          } else {
          }
        });
    } else {
      this.setState({
        messageusername: "code need to be 6 digit",
      });
    }
  };

  componentDidMount = () => {};

  render() {
    return (
      <form onSubmit={this.handeSubmit} id="loginBox">
        <div className="sign">
          Enter the code
          <div className="hajfffu"></div>{" "}
        </div>

        <div className="smal-descritptpr">
          A code verification will be sent in your email , please enter the code
          to verifies your email{" "}
        </div>

        <div className="edit-box-profile">
          <label htmlFor="username">Code</label>
          <input
            onChange={this.handleChange}
            className="username-profile"
            type="number"
            name="code"
            placeholder="000000"
          />
        </div>
        <p className="error-message" id="message-username">
          {this.state.messageusername}
        </p>

        <input id="login" type="submit" name="submit" value="CHECK CODE" />
        <div id="agreement">
          <div className="warer-sin">
            <p>Remember your login?</p>
            <Link to="/login">Click here</Link>
          </div>
        </div>
      </form>
    );
  }
}

export default Two;
