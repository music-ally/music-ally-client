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

// 스타일 컴포넌트들 정의
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
  gap: 17px; /* 이미지 간 간격 조절 */
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20.5px;
  overflow: hidden;
  width: 275.2px;
  height: 389.3px;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  z-index: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageText = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-family: 'Inter-SemiBold', sans-serif; /* 'Inter-SemiBold' 폰트 사용 */
  font-size: 18pt;
  color: #FAFAFA;
  z-index: 2;
`;

const Button = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
`;

const LeftButton = styled(Button)`
  left: -25px;
`;

const RightButton = styled(Button)`
  right: -25px;
`;

interface ImageProps {
  src: string;
  name: string;
}

interface ComponentProps {
  actorId: any;
}

const Component: React.FC<ComponentProps> = ({ actorId }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // actorId를 이용해 이미지를 fetch
    fetch(`/api/actor/${actorId}/musicals`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedImages: ImageProps[] = data.musicals.map((musical: any) => ({
          src: musical.posterUrl,
          name: musical.title,
        }));
        setImages(fetchedImages);
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, [actorId]);

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

  if (!images.length) {
    return <Container>No images available</Container>;
  }

  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Container>
        <ContentWrapper>
          <Row>
            {images.length > 1 && ( // 이미지가 1개 이상일 때 버튼을 보여줌
              <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            )}
            <ImageRow>
              <ImageContainer>
                <Image src={images[currentIndex].src} alt={`Poster ${currentIndex}`} />
                <GradientOverlay />
                <ImageText>{images[currentIndex].name}</ImageText>
              </ImageContainer>
            </ImageRow>
            {images.length > 1 && ( 
              <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
            )}
          </Row>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Component;
