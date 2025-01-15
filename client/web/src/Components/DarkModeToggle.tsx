import { useState, useEffect } from "react";
import Toggle from "Components/shared/Toggle";
import { useDispatch } from "react-redux";
const darkLabel = "dark";
function DarkModeToggle() {
  const dispatch = useDispatch();
  const [isDarkModeOn, setIsDarkModeOn] = useState(
    localStorage.getItem("mode") === darkLabel,
  );
  const loadTheme = (theme) => {
    const root = document.querySelector("#root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
    setIsDarkModeOn(theme === darkLabel);
    dispatch({ type: "UPDATE_MODE", value: theme });
  };

  useEffect(() => {
    if (isDarkModeOn) {
      loadTheme(darkLabel);
    } else {
      loadTheme("light");
    }
  }, [isDarkModeOn]);

  return <Toggle setToggle={setIsDarkModeOn} value={isDarkModeOn} />;
}
export default DarkModeToggle;
