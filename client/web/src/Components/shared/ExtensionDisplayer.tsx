import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: var(--text);
  height: 100%;

  padding-left: 10px;
  padding-right: 10px;
  background-color: transparent;
  text-transform: uppercase;
`;

const map = {
  js: { backgroundColor: "rgba(247, 223, 30, 0.3)", color: "#F7DF1E" }, // JavaScript: Yellow
  java: { backgroundColor: "rgba(66, 133, 244, 0.3)", color: "#4285F4" }, // Java: Blue
  py: { backgroundColor: "rgba(53, 114, 165, 0.3)", color: "#3572A5" }, // Python: Blue
  ruby: { backgroundColor: "rgba(224, 17, 95, 0.3)", color: "#E0115F" }, // Ruby: Red/Pink
  csharp: { backgroundColor: "rgba(157, 0, 255, 0.3)", color: "#9D00FF" }, // C#: Purple
  cpp: { backgroundColor: "rgba(0, 0, 255, 0.3)", color: "#00599C" }, // C++: Blue
  php: { backgroundColor: "rgba(79, 93, 149, 0.3)", color: "#4F5D95" }, // PHP: Dark Blue
  swift: { backgroundColor: "rgba(255, 69, 0, 0.3)", color: "#FF4500" }, // Swift: Orange
  go: { backgroundColor: "rgba(0, 173, 216, 0.3)", color: "#00ADD8" }, // Go: Cyan
  rust: { backgroundColor: "rgba(222, 77, 41, 0.3)", color: "#DE4D29" }, // Rust: Orange/Brown
  kotlin: { backgroundColor: "rgba(255, 87, 34, 0.3)", color: "#FF5722" }, // Kotlin: Orange/Red
  typescript: { backgroundColor: "rgba(0, 122, 204, 0.3)", color: "#007ACC" }, // TypeScript: Blue
  html: { backgroundColor: "rgba(227, 76, 38, 0.3)", color: "#E34C26" }, // HTML: Orange
  css: { backgroundColor: "rgba(21, 114, 182, 0.3)", color: "#1572B6" }, // CSS: Blue
};
const getStyle = (language) => {
  const style = map[language];
  if (style) {
    return style;
  } else {
    return { backgroundColor: "rgba(110, 195, 244, 0.3)", color: "#6ec3f4" };
  }
};
function ExtensionDisplayer({ language }) {
  const { color } = getStyle(language);
  return <Container style={{ color }}>{language}</Container>;
}

export default ExtensionDisplayer;
