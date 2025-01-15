import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure this is imported correctly

function GoogleLoginAuth() {
  const [errorMessage, setErrorMessage] = useState("");

  function handleCallBackResponse(response) {
    const user_object = jwtDecode(response.credential);
    loginWithGoogle(user_object);
  }

  useEffect(() => {
    /* global google */
    google?.accounts.id.initialize({
      client_id:
        "1004404733917-5fjd4q41sre1ebkbhdc1vp9fr25ovggu.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    // Render the standard Google Sign-In button
    google?.accounts.id.renderButton(document.getElementById("google-signin"), {
      theme: "filled_blue",
      size: "large",
      shape: "circle", // Set shape to circle
    });
  }, []);

  function loginWithGoogle(user_object) {
    const payload = {
      email: user_object.email,
      isGoogleAccount: true,
      username: user_object.name,
    };
    axios
      .post("/api/login", payload, { withCredentials: true })
      .then((result) => {
        const { data } = result;
        if (data.succeeded) {
          window.location.reload();
        } else {
          setErrorMessage("This account does not exist");
        }
      })
      .catch(() => {
        setErrorMessage("An error occurred during login");
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Placeholder for the Google Sign-In button */}
      <div id="google-signin" style={{ marginBottom: "5px" }}></div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
}

export default GoogleLoginAuth;
