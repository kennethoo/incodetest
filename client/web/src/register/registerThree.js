import { Component } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import strongPasswordChecker from "utility/strong_Password_Checker";
import LoadingSpin from "Components/Loadingspin";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import moment from "moment";
const buttonToSeePasswordStyle = {
  width: "40px",
  heigth: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  border: 0,
  fontSize: "20px",
};
class RegisterThree extends Component {
  state = {
    email: "",
    messagefullname: "",
    messageusername: "",
    messagepassword: "",
    messageeemail: "",
    loading: false,
    showPassword: false,
    partern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{7,}$/,
  };

  componentDidMount = () => {
    this.setState({});
  };

  handleRegister = async (e) => {
    e.preventDefault();
    if (this.props.data.username.length > 2) {
      this.setState({
        messageusername: "",
      });
    } else {
      this.setState({
        messageusername: "username is too short",
      });
    }

    if (this.props.data.email.length > 0) {
      this.setState({
        messageeemail: "",
      });
    } else {
      this.setState({
        messageeemail: "This email is not  valid",
      });
    }
    const { succeeded, errorMessage } = strongPasswordChecker(
      this.props.data.password,
    );
    if (!succeeded) {
      this.setState({
        messagepassword: errorMessage,
      });
    } else {
      this.setState({
        messagepassword: "",
      });
    }

    if (
      this.props.data.email.length > 0 &&
      this.props.data.username.length > 2 &&
      succeeded
    ) {
      const userData = {
        email: this.props.data.email.trim(),
        password: this.props.data.password,
        username: this.props.data.username
          .trim()
          .toLowerCase()
          .replace(/\s/g, ""),
        fullName: this.props.data.fullName,
      };

      this.setState({
        loading: true,
      });

      const { data } = await meettumApi.post("/api/register", userData);
      const { succeeded, errorMessage } = data;
      if (!succeeded) {
        this.setState({
          loading: false,
        });
        if (errorMessage === "username already exist") {
          this.setState({
            messageusername: "😅 Sorry this username is already taken",
          });
        } else {
          this.setState({
            messageusername: "",
          });
        }
        if (errorMessage === "Email already exist") {
          this.setState({
            messageeemail: "😅 Sorry this email is already taken",
          });
        } else {
          this.setState({
            messageeemail: "",
          });
        }
      } else {
        window.location.reload();
      }
    }
  };
  render() {
    return (
      <form id="registerbox" onSubmit={this.handleRegister}>
        <div className="dicccn">
          <div className="bulrr"></div>
        </div>
        <div className="sign">
          Almost done 🎉 🎉
          <div className="hajfffu"></div>{" "}
        </div>
        <div className="edit-box-profile">
          <input
            style={{ width: "calc(100% - 45px)" }}
            onChange={this.props.handleChange}
            className="username-profile"
            type="text"
            name="username"
            placeholder="Enter your username"
            autoComplete="off"
          />
        </div>
        <p className="messsage-error" id="message-username">
          {this.state.messageusername}
        </p>

        <div className="edit-box-profile">
          <input
            required
            className="username-profile"
            type="email"
            value={this.props.data.email}
            name="email"
            placeholder="Email"
            autoComplete="off"
          />
        </div>
        <p className="messsage-error" id="messagee-email">
          {this.state.messageeemail}
        </p>
        <div style={{ flexDirection: "row" }} className="edit-box-profile">
          <input
            style={{ width: "calc(100% - 45px)" }}
            onChange={this.props.handleChange}
            className="username-profile"
            type={this.state.showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter a powerful password"
            autoComplete="off"
          />
          <button
            onClick={() => {
              this.setState({
                showPassword: !this.state.showPassword,
              });
            }}
            style={buttonToSeePasswordStyle}
            className="se"
          >
            {this.state.showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>
        <p className="messsage-error" id="message-passowrd">
          {this.state.messagepassword}
        </p>

        {this.state.loading === false ? (
          <input id="register" type="submit" value="Join" />
        ) : (
          <button
            className={`next agreen   ${this.state.loading ? "loading" : ""}  `}
          >
            {this.state.loading ? <LoadingSpin /> : ""}
          </button>
        )}
        <div id="agreement">
          <div id="info-agree">
            <a href="#">
              By signing up, you agree to our Terms , Data Policy and Cookies
              Policy .
            </a>
          </div>
        </div>
      </form>
    );
  }
}

export default RegisterThree;
