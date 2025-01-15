import { useSelector } from "react-redux";
const darkLabel = "dark";
const darkModeColor = {
  isDarkMode: true,
  text: "white",
  backgroundColor: "#1f2125",
  fadedBackgroundColor: "rgba(255,255,255,0.2)",
};
const whiteMode = {
  isDarkMode: false,
  text: "#191919",
  backgroundColor: "#f4f2ee",
  fadedBackgroundColor: "rgba(0,0,0,0.2)",
};

function useColor() {
  const mode = useSelector((state: any) => state.mode);
  const isDarkModeOn = mode === darkLabel;
  return isDarkModeOn ? darkModeColor : whiteMode;
}
export default useColor;
