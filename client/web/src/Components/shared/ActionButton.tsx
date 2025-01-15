import LoadingSpin from "Components/Loadingspin";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  margin-top: 10px;
  align-items: center;
  width: 100%;

  & button {
    width: 100%;
    height: 40px;
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.5px;
    color: var(--text);
    font-size: 14px;
    font-weight: 600;
    background-color: var(--main-bg-cool-rgb);
    text-transform: uppercase;
    border: 0;
    border: 1px solid #6f56e5;
    color: white;
  }
`;
function ActionButton({ isCancelAction, isLoading, handleClick, label }) {
  return (
    <Container>
      <button
        style={{
          backgroundColor: !isLoading
            ? isCancelAction
              ? "rgba(192, 57, 43,0.8)"
              : "#6f56e5"
            : "",

          border: `1px solid ${isCancelAction ? "transparent" : "#6f56e5"}`,
        }}
        onClick={() => {
          if (isLoading) {
            return;
          }
          handleClick();
        }}
      >
        {isLoading ? <LoadingSpin /> : label}
      </button>
    </Container>
  );
}
export default ActionButton;
