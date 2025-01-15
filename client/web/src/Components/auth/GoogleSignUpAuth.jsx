import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Container = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
};

const ErrorMessageStyle = {
  color: "red",
  marginTop: "10px",
};

function GoogleSignUpAuth() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function handleCallBackResponse(response) {
    const user_object = jwtDecode(response.credential);
    registerWithGoogle(user_object);
  }

  function registerWithGoogle(user_object) {
    const payload = {
      email: user_object.email,
      isGoogleAccount: true,
      username: user_object.name,
    };

    axios
      .post("/api/register", payload, { withCredentials: true })
      .then((result) => {
        const { data } = result;

        if (data.succeeded) {
          navigate("/app/home");
        } else {
          setErrorMessage(data.errorMessage);
        }
      })
      .catch(() => {
        setErrorMessage("An error occurred during registration.");
      });
  }

  useEffect(() => {
    /* global google */
    google?.accounts.id.initialize({
      client_id:
        "1004404733917-5fjd4q41sre1ebkbhdc1vp9fr25ovggu.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    // Render the round Google Sign-Up button
    google?.accounts.id.renderButton(document.getElementById("google-signup"), {
      theme: "filled_blue",
      size: "large", // Button size
      shape: "circle", // Makes the button round
    });
  }, []);

  return (
    <div style={Container}>
      {/* Placeholder for the Google Sign-Up button */}
      <div id="google-signup" style={{ marginBottom: "5px" }}></div>
      {errorMessage && <div style={ErrorMessageStyle}>{errorMessage}</div>}
    </div>
  );
}

export default GoogleSignUpAuth;
