import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter-SemiBold';
    src: url('/Inter-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  margin: 0 5px 15px 5px;
  display: inline-block;
  word-break: break-word;
  font-family: 'Inter-SemiBold', sans-serif;
  font-weight: 800;
  font-size: 34px;
  letter-spacing: 1px;
  line-height: 1.5;
  background: linear-gradient(90deg, #E8E1B1, #BB9D59);
  color: transparent;
  background-clip: text;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 17px; /* 이미지 간격 조절 */
`;

const Image = styled.img`
  border-radius: 20.5px;
  width: 275.2px;
  height: 389.3px;
`;

const Button = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const LeftButton = styled(Button)`
  left: -25px;
`;

const RightButton = styled(Button)`
  right: -25px;
`;

interface Props {}

const Component: React.FC<Props> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  const images = [
    "/musicalposter-1.jpeg",
    "/musicalposter-2.jpeg",
    "/musicalposter-3.jpeg",
    "/musicalposter-4.jpeg",
    "/musicalposter-5.jpeg",
    "/musicalposter-6.jpeg",
  ];

  useEffect(() => {
    const newImages = [...images];
    const remainder = newImages.length % 4;
    if (remainder !== 0) {
      const emptySlots = 4 - remainder;
      for (let i = 0; i < emptySlots; i++) {
        newImages.push("/empty.png");
      }
    }
    setDisplayImages(newImages);
  }, [images]);

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? displayImages.length - 4 : prevIndex - 4;
      return newIndex;
    });
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === displayImages.length - 4 ? 0 : prevIndex + 4;
      return newIndex;
    });
  };

  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Container>
        <ContentWrapper>
          <Title>믿고 보는 배우 ㅇㅇㅇ의 출연작</Title>
          <Row>
            {displayImages.length > 4 && (
              <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            )}
            <ImageRow>
              {displayImages.slice(currentIndex, currentIndex + 4).map((image, index) => (
                <Image key={index} src={image} />
              ))}
            </ImageRow>
            {displayImages.length > 4 && (
              <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
            )}
          </Row>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Component;
