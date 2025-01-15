import { useState, useEffect } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import useLogger from "hooks/useLogger";
import TopNavigation from "landing/TopNavigation";
import LoadingSpin from "Components/Loadingspin";
import GoogleLoginAuth from "Components/auth/GoogleLoginAuth";
import Initial from "Components/syncAudioRoomV3/Initial";
import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const BackButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 35px;
  min-width: 35px;
  max-width: 35px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const LoginWithEmail = () => {
  const [username, setUsername] = useState("kgandonou@linkedin.com");
  const [password, setPassword] = useState("LIlupiip19$#");
  const logger = useLogger();
  const [messageUsername, setMessageUsername] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginLogic();
  };

  const loginLogic = async () => {
    try {
      if (username.length > 0 && !loading) {
        setMessageUsername("");
      } else {
        setMessageUsername("Username cannot be empty");
      }

      if (password.length > 0) {
        setMessagePassword("");
      } else {
        setMessagePassword("Password cannot be empty");
      }

      if (username.length > 0 && password.length > 0) {
        setLoading(true);

        const userData = {
          email: username.toLowerCase(),
          password: password,
          region: "",
          city: "",
        };
        const result = await meettumApi.post("/api/login", userData);
        const { succeeded } = result.data;
        if (!succeeded) {
          setLoading(false);
          setMessagePassword("Sorry 😅 Invalid email or password");
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      logger({
        isErrorMessage: true,
        message: error.message,
        fileName: "Login.tsx",
      });
    }
  };

  useEffect(() => {
    loginLogic()
  }, []);

  const handleChange = (e) => {
    if (e.target.name.includes("username")) {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <Container id="container">
      <form
        style={{ border: "0" }}
        onSubmit={(e) => e.preventDefault()}
        id="loginBox"
      >
        <div style={{ border: "0", padding: "0" }} className="wrappgngnngpr">
          <div className="edit-box-profile">
            <input
              onChange={handleChange}
              className="username-profile"
              required
              type="email"
              name="username"
              placeholder="Enter your email example@gmail.com"
            />
          </div>
          <p className="error-message" id="message-username">
            {messageUsername}
          </p>
          <div style={{ flexDirection: "row" }} className="edit-box-profile">
            <input
              style={{ width: "calc(100% - 45px)" }}
              onChange={handleChange}
              className="username-profile"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
            />
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              style={buttonToSeePasswordStyle}
              className="se"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <p className="error-message" id="message-password">
            {messagePassword}
          </p>
          {loading === false ? (
            <input
              onClick={handleSubmit}
              id="login"
              type="submit"
              name="submit"
              value="Login"
            />
          ) : (
            <button className={`next agreen   ${loading ? "loading" : ""}  `}>
              {loading ? <LoadingSpin /> : ""}
            </button>
          )}

          <div id="agreement">
            <div className="warer-sin">
              <p>Forget your password?</p>
              <Link to="/changepassword">Click here</Link>
            </div>
          </div>

          <div className="exter-messge">
            <div className="warer-sin">
              <p>Dont' have a account ?</p>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default LoginWithEmail;
