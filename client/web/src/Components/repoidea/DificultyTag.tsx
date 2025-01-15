import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  padding: 2px 10px 2px 10px;
  margin-top: 5px;
  font-size: 15px;
  text-transform: capitalize;

  color: var(--text);
  border-radius: 30px;
`;

const map = {
  easy: {
    backgroundColor: "rgba(76, 175, 80, 0.3)", // Light green background
    color: "#4CAF50", // Bright green text
  },
  medium: {
    backgroundColor: "rgba(255, 152, 0, 0.3)", // Light orange background
    color: "#FF9800", // Bright orange text
  },
  hard: {
    backgroundColor: "rgba(244, 67, 54, 0.3)", // Light red background
    color: "#F44336", // Bright red text
  },
};

function DificultyTag({ level }) {
  const { backgroundColor, color } = map[level.toLowerCase()];
  return <Container style={{ backgroundColor, color }}>{level}</Container>;
}

export default DificultyTag;
