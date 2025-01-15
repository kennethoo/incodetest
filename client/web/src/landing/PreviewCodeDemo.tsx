import React, { useRef } from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  height: 650px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 650px;
    object-fit: contain;
    background-color: var(--main-bg-pagebox);
  }
`;

const PreviewCodeDemo = (): JSX.Element => {
  return (
    <Container>
      {/* <video
        src={
          "https://meettumdev.s3.us-east-2.amazonaws.com/5ff73480-29bc-4779-a664-47af4fc469c0.mp4"
        }
        autoPlay={true}
        playsInline={true}></video> */}
      <img
        alt="Demo"
        src="https://meettumdev.s3.amazonaws.com/ac9878e4-1c10-4eef-8276-9f216fb7ae45.png"
      />
    </Container>
  );
};

export default PreviewCodeDemo;
