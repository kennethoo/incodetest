import { useRef, useEffect } from "react";
import styled from "styled-components";
import GridWraperContainer from "Components/shared/GridWraperContainer";
import useResizeObserver from "hooks/layout/useResizeObserver";

const Item = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function AudioGridSectionColumn({
  defaultResolution,
  data,
}: {
  defaultResolution?: number;
  data: any;
}) {
  return (
    <Container>
      {data.map((item, index) => {
        return <Item key={index}>{item}</Item>;
      })}
    </Container>
  );
}
export default AudioGridSectionColumn;
