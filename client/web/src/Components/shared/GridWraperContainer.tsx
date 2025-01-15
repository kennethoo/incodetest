import { useRef } from "react";

import styled from "styled-components";
import testser from "testdata/userInRoom";
import useResizeObserver from "hooks/layout/useResizeObserver";

// This function determines the number of columns based on the number of children
function calculateOptimalWidth(
  containerWidth,
  numberOfItems,
  resolutionPercentage,
) {
  const targetWidth = containerWidth * (resolutionPercentage / 100);
  const maxColumns = Math.floor(containerWidth / targetWidth);
  const optimalWidth = containerWidth / maxColumns;

  return optimalWidth;
}

const Grid = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  height: 100%;
  justify-content: center;
  justify-items: center;
  flex-wrap: wrap;
`;

const Box = styled.div`
  background-color: black;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const mapStyleToResolution = {
  "1": 100,
  "2": 56.25,
};

const Item = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
`;
const ItemContainer = styled.div<{ resolution }>`
  width: 100%;

  &:before {
    content: "";
    display: block;
  }
`;

const calulateWidth = ({ numberOfBox, resolution }) => {
  console.log("return the  a google with");
};

function GridWraperContainer({ data }) {
  const resolution = "2";
  const container = useRef();
  const { dimensions } = useResizeObserver(container);
  const width = calculateOptimalWidth(dimensions?.width, testser.length, 56);
  return (
    <Grid ref={container}>
      {testser.map((item) => {
        return (
          <Box style={{ width }}>
            <ItemContainer resolution={1}>
              <Item></Item>
            </ItemContainer>
          </Box>
        );
      })}
    </Grid>
  );
}

export default GridWraperContainer;

//ok check is out , i am creating at video grid platform
//what i want is that i hava a compoent in which i can change the asperation
//of each items. then when people join the layout is responzise and try to fill the space
// the if the space is small the it is goin to be 1 item per rom but it will keep rezixing the height and with of each item
//it order to make it fit the entire page or section it is inside of
