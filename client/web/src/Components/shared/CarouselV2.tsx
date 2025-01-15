import React, { useEffect, useState } from "react";
import useCarouselV2 from "embla-carousel-react";
import styled from "styled-components";
import useColor from "hooks/useColor";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
`;
const Wraper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;
const Button = styled.button`
  position: absolute;
  height: 40px;
  width: 40px;
  border: 0;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: var(--text);
  -webkit-backdrop-filter: blur(100px);
  backdrop-filter: blur(100px);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
`;

export function CarouselV2({ listOfData }) {
  const [emblaRef, emblaApi] = useCarouselV2({ loop: false });
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorTemplate = useColor();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? listOfData.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === listOfData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  function getCurrentIndex() {
    const currentIndex = emblaApi?.selectedScrollSnap();
    setCurrentIndex(currentIndex);
    return currentIndex;
  }
  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", getCurrentIndex);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(currentIndex);
    }
  }, [currentIndex, emblaApi]);

  return (
    <Wraper>
      <Container ref={emblaRef}>
        <SlideContainer>
          {listOfData?.map((item, index) => {
            return <Slide key={index}>{item}</Slide>;
          })}
        </SlideContainer>
      </Container>
      {listOfData?.length > 1 && (
        <>
          {currentIndex > 0 && (
            <Button
              style={{
                left: "5px",
                color: !colorTemplate.isDarkMode ? "white" : "#191919",
              }}
              onClick={handlePrev}
            >
              <IoIosArrowBack />
            </Button>
          )}
          {currentIndex < listOfData.length - 1 && (
            <Button
              style={{
                right: "5px",
                color: !colorTemplate.isDarkMode ? "white" : "#191919",
              }}
              onClick={handleNext}
            >
              <IoIosArrowForward />
            </Button>
          )}
        </>
      )}
    </Wraper>
  );
}
