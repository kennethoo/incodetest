import { Component } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import LoadingSpin from "Components/Loadingspin";

class RegisterTwo extends Component {
  state = {
    code: "",
    message: "",
    loading: false,
  };
  handleChange = (e) => {
    if (e.target.value.trim().length > 0) {
      this.setState({
        code: e.target.value,
      });
    }
  };
  handleRegister = (e) => {
    e.preventDefault();
    if (this.state.code.length === 6) {
      this.setState({
        loading: true,
      });
      const option = {
        email: this.props.email,
        code: parseInt(this.state.code),
      };
      meettumApi
        .post(`/api/v1/validate-verification-code`, option)
        .then((result) => {
          if (result.data.succeeded) {
            this.props.handleNext(2);
          } else {
            this.setState({
              message: "This code does not match this email",
              loading: false,
            });
          }
        });
    } else {
      this.setState({
        message: "This code does not match this email",
      });
    }
  };
  render() {
    return (
      <form id="registerbox" onSubmit={this.handleRegister}>
        <div className="sign">
          Verification Code
          <div className="hajfffu"></div>{" "}
        </div>
        <div className="smal-descritptpr">
          A verification code will be sent in your email , please enter the code
          here
        </div>
        <div className="edit-box-profile">
          <input
            onChange={this.handleChange}
            required
            className="username-profile"
            type="number"
            name="code"
            placeholder="Enter code"
          />
        </div>
        <p className="messsage" id="message-username">
          {this.state.message}
        </p>
        {this.state.loading === false ? (
          <input id="login" type="submit" name="submit" value="CHECK CODE" />
        ) : (
          <button
            className={`next agreen   ${this.state.loading ? "loading" : ""}  `}
          >
            {this.state.loading ? <LoadingSpin /> : ""}
          </button>
        )}
      </form>
    );
  }
}

export default RegisterTwo;
