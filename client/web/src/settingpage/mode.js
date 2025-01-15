import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function Mode() {
  const [state, setState] = useState({
    theme: "",
  });

  const navigate = useNavigate();

  const loadTheme = (theme) => {
    const root = document.querySelector("#root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
    setState({
      theme: theme,
    });
  };
  const handleClick = (data) => {
    loadTheme(data);
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setState({
      ...state,
      theme: localStorage.getItem("mode"),
    });
  }, []);
  return (
    <div className="wrrapeerr-uoirjr-cham">
      <div className="title-edit">
        <div className="before-edit">
          <div onClick={goBack} className="close-that">
            <BiArrowBack />
          </div>
          <p>Theme</p>
        </div>
      </div>

      {/* <div
        onClick={() => {
          handleClick("light");
        }}
        className="them-selxteskskf"
      >
        <p>Light</p>
        <div
          className={`add-to-this-collection  ${
            state.theme === "light" ? "active" : ""
          }`}
        >
          <div className="savethat-ccolelti"></div>
        </div>
      </div> */}

      <div
        onClick={() => {
          handleClick("dark");
        }}
        className="them-selxteskskf"
      >
        <p>Dark</p>
        <div
          className={`add-to-this-collection  ${
            state.theme === "dark" ? "active" : ""
          }`}
        >
          <div className="savethat-ccolelti "></div>
        </div>
      </div>
    </div>
  );
}
export default Mode;
