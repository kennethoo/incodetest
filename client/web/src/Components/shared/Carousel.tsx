import { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useResizeObserver from "hooks/layout/useResizeObserver";
import styled from "styled-components";
import useColor from "hooks/useColor";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  transition: all 1s ease;
`;

const Item = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  min-width: 100%;
  display: flex;
  transition: all 0.5s ease;
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
interface CarouselProps {
  listOfData?: any;
  section?: any;
}

function Carousel({ listOfData }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselWraperRef = useRef();
  const carouselRef = useRef();
  const colorTemplate = useColor();
  const { dimensions } = useResizeObserver(carouselWraperRef, currentIndex);
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

  useEffect(() => {
    if (carouselWraperRef.current) {
      const parent: any = carouselWraperRef.current;

      // Assuming each slide has the same width as the parent
      const slideWidth = parent.offsetWidth;
      const newScrollPosition = slideWidth * currentIndex;

      parent.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex, dimensions]);

  useEffect(() => {
    if (currentIndex >= listOfData.length) {
      setCurrentIndex(Math.max(0, listOfData.length - 1));
    }
  }, [currentIndex, listOfData.length]);

  return (
    <Container ref={carouselRef}>
      <Wrapper ref={carouselWraperRef}>
        {listOfData?.map((item, index) => {
          return (
            <Item
              id={index === currentIndex ? "currentActiveSlide" : ""}
              key={index}
              style={{ opacity: index === currentIndex ? "1" : "0" }}
            >
              {item}
            </Item>
          );
        })}
      </Wrapper>
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
    </Container>
  );
}

export default Carousel;
