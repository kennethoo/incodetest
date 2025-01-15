import React, { useState } from "react";
import { Link } from "react-router-dom";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { BiArrowBack } from "react-icons/bi";
import strongPasswordChecker from "utility/strong_Password_Checker";
import useUser from "hooks/useUser";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    active: true,
    succeeded: false,
  });
  const goBack = () => {
    navigate(-1);
  };

  const handleCurrent = (event) => {
    setState({
      ...state,
      currentPassword: event.target.value,
    });
  };
  const handlenew = (event) => {
    setState({
      ...state,
      newPassword: event.target.value,
    });
  };
  const handleConfirm = (event) => {
    setState({
      ...state,
      confirmPassword: event.target.value,
    });
  };
  const handlecheck = () => {
    if (state.loading === false) {
      const { succeeded, errorMessage } = strongPasswordChecker(
        state.newPassword,
      );
      if (state.currentPassword.length > 0) {
        if (state.newPassword === state.confirmPassword) {
          if (succeeded) {
            const option = {
              username: user.username,
              oldPassword: state.currentPassword,
              newPassword: state.newPassword,
            };
            meettumApi.post("/api/v1/change-password", option).then((res) => {
              if (res.data === "succeeded") {
                setState({
                  ...state,
                  succeeded: true,
                });
              } else {
                setState({
                  ...state,
                  oldPasswordm: "Sorry Password incorrect",
                });
              }
            });
          } else {
            setState({
              ...state,
              newPasswordm: errorMessage,
            });
          }
        } else {
          setState({
            ...state,
            confoimM: "sorry the passwords are not the same",
          });
        }
      } else {
        setState({
          ...state,
          oldPasswordm: "sorry Password incorrect",
        });
      }
    }
  };

  return (
    <div className="wrrapeerr-uoirjr-cham">
      <div className="title-edit">
        <div className="before-edit">
          <div onClick={goBack} className="close-that">
            <BiArrowBack />
          </div>
          <p>Change Password</p>
        </div>
      </div>
      <div style={{ marginTop: "10px" }} className="wraeprprrrr">
        <div className="wrpaer-divngjrj">
          <div className="edit-box-profile">
            <p>Current Password</p>
            <input
              onChange={handleCurrent}
              placeholder="Enter your current password"
              className="fullname-profile"
              type="text"
              name="username"
            />
          </div>

          <div className="wfjkwsnf-fjedj">
            <Link to={"/changepassword"}>Forget your Password?</Link>
          </div>
          <p className="error-message" id="message-password">
            {state.oldPasswordm}
          </p>
        </div>
        <div className="wrpaer-divngjrj">
          <div className="edit-box-profile">
            <p>New Password</p>
            <input
              onChange={handlenew}
              placeholder="Enter your new password"
              className="fullname-profile"
              type="text"
              name="username"
            />
          </div>
          <p className="error-message" id="message-password">
            {state.newPasswordm}
          </p>
          <div className="edit-box-profile">
            <p>Confirm Password</p>
            <input
              onChange={handleConfirm}
              placeholder="Confirm your new password"
              className="fullname-profile"
              type="text"
              name="username"
            />
          </div>
          <p className="error-message" id="message-password">
            {state.confoimM}
          </p>
        </div>
      </div>

      <div className={`save-option`}>
        <button
          onClick={handlecheck}
          className={`update-profile ${state.active ? "active" : ""}`}
        >
          {state.succeeded ? "PASSWORD CHANGE" : "SAVE CHANGE"}
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
