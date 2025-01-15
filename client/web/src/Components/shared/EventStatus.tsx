import styled from "styled-components";
const Status = styled.div`
  position: absolute;

  border-radius: 30px;
  font-size: 16px;
  padding: 2px 10px 2px 10px;
  text-transform: capitalize;
  text-align: start;

  background-color: var(--main-bg-cool-rgb);
  -webkit-backdrop-filter: blur(100px);
  backdrop-filter: blur(100px);
  max-width: calc(100% - 10px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: white;
`;

const mapStateToColor = {
  cancelled: "rgba(192, 57, 43,0.5",
  ended: "#5a5b5d",
  started: "rgb(40, 180, 99,0.5)",
  active: "rgb(40, 180, 99,0.5)",
  inactive: "gray",
  confirm: "rgb(40, 180, 99,0.5)",
};

const getBackgroundColor = (label) => {
  if (typeof label !== "string") return "";
  const backgroundColor = mapStateToColor[label];
  if (backgroundColor) {
    return backgroundColor;
  } else {
    return "";
  }
};

export default function EventStatus({
  label,
  styled = { top: "5px", right: "5px" },
}: {
  label: any;
  styled?: any;
}) {
  return (
    <Status style={{ backgroundColor: getBackgroundColor(label), ...styled }}>
      {label}
    </Status>
  );
}
