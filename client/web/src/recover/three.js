import React, { useState } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { Link } from "react-router-dom";
import strongPasswordChecker from "utility/strong_Password_Checker";
import { useNavigate } from "react-router-dom";
function Three({ email }) {
  const [state, setState] = useState({
    messagePassword: "",
    password: "",
    repassword: "",
    messageusername: "",
    loading: true,
  });
  const navigate = useNavigate();
  const handeSubmit = (e) => {
    e.preventDefault();
    const { succeeded, errorMessage } = strongPasswordChecker(state.password);
    if (state.password !== state.repassword) {
      setState({
        ...state,
        messagePassword: "Password must be the same",
      });
      return;
    }

    if (!succeeded) {
      setState({
        ...state,
        messagePassword: errorMessage,
      });
      return;
    }
    const option = {
      email,
      newPassword: state.password,
    };

    meettumApi.post("/api/v1/update-password", option).then((result) => {
      if (result.data.succeeded) {
        navigate("/login");
      }
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setState({
        ...state,
        password: e.target.value,
      });
    } else {
      setState({
        ...state,
        repassword: e.target.value,
      });
    }
  };

  return (
    <form onSubmit={handeSubmit} id="loginBox">
      <div className="sign">
        Change Password
        <div className="hajfffu"></div>{" "}
      </div>
      <div className="smal-descritptpr">
        Alright now you can change your Password
      </div>
      <div className="edit-box-profile">
        <label htmlFor="username">New Password</label>
        <input
          onChange={handleChange}
          autoComplete="off"
          className="username-profile"
          type="password"
          name="password"
          placeholder=""
        />
      </div>
      <p className="error-message" id="message-username">
        {state.messageusername}
      </p>

      <div className="edit-box-profile">
        <label htmlFor="username">Retype Password</label>
        <input
          onChange={handleChange}
          autoComplete="off"
          className="username-profile"
          type="password"
          name="repassword"
          placeholder=""
        />
      </div>
      <p className="error-message" id="message-username">
        {state.messagePassword}
      </p>
      <input id="login" type="submit" name="submit" value="CHANGE PASSWORD" />
      <div id="agreement">
        <div className="warer-sin">
          <p>Remember your login?</p>
          <Link to="/login">Click here</Link>
        </div>
      </div>
    </form>
  );
}

export default Three;
