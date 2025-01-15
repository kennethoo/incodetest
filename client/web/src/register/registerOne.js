import { Component } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import GoogleSignUpAuth from "Components/auth/GoogleSignUpAuth";
import LoadingSpin from "Components/Loadingspin";
import styled from "@emotion/styled";

const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
`;
const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  color: white;
  font-size: 14px;
  position: relative;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid var(--main-bg-cool-rgb);
  border-radius: 10px;
  padding: 10px;
`;
class RegisterOne extends Component {
  state = {
    message: "",
    loading: false,
  };

  handleRegister = (e) => {
    e.preventDefault();
    let option = {
      email: this.props.email,
    };

    this.setState({
      loading: true,
    });

    meettumApi
      .post(`/api/v1/requestverificationcode`, option)
      .then((result) => {
        if (result.data.succeeded) {
          this.props.handleNext(1);
        }
      });
  };
  render() {
    return (
      <Container>
        <LoginTitle>
          <div className="sign">Welcome</div>
        </LoginTitle>
        <GoogleSignUpAuth />
        <form
          style={{ border: "0" }}
          id="registerbox"
          onSubmit={this.handleRegister}
        >
          <Divider>
            <span>OR</span>
          </Divider>
          <div className="edit-box-profile">
            <input
              onChange={this.props.handleChange}
              required
              className="username-profile"
              type="email"
              name="email"
              placeholder="Enter your email "
              autoComplete="off"
            />
          </div>
          <p className="messsage" id="message-username">
            {this.state.message}
          </p>
          {this.state.loading === false ? (
            <input id="register" type="submit" value="CONTINUE" />
          ) : (
            <button
              className={`next agreen   ${
                this.state.loading ? "loading" : ""
              }  `}
            >
              {this.state.loading ? <LoadingSpin /> : ""}
            </button>
          )}
        </form>
      </Container>
    );
  }
}
export default RegisterOne;
