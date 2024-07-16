import React, { useState } from 'react';
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

const Component: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/musicalposter-1.jpeg", "/musicalposter-2.jpeg", "/musicalposter-3.jpeg", "/musicalposter-4.jpeg", "/musicalposter-5.jpeg", "/musicalposter-6.jpeg"];

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Container>
        <ContentWrapper>
          <Row>
            <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            <ImageRow>
              {images.map((image, index) => {
                const displayIndex = (index + currentIndex) % images.length;
                return (
                  <Image
                    key={index}
                    src={images[displayIndex]}
                    style={{
                      display: index < 4 ? 'block' : 'none',
                    }}
                  />
                );
              })}
            </ImageRow>
            <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
          </Row>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Component;


/* 이미지를 백에서 가져오는 경우 

const Component: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // 백엔드에서 이미지 URL을 가져오는 함수 (임시로 지정. fetchImagesFromBackend 함수는 백엔드 API로부터 이미지 URL을 가져오는 로직으로 대체해야 함)
    fetchImagesFromBackend()
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const handleLeftButtonClick = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleRightButtonClick = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <GlobalStyle /> 
      <Container>
        <ContentWrapper>
          <Title>믿고 보는 배우 ㅇㅇㅇ의 출연작</Title>
          <Row>
            <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            <ImageRow>
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  style={{ display: index < 4 ? 'block' : 'none' }}
                />
              ))}
            </ImageRow>
            <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
          </Row>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Component; */