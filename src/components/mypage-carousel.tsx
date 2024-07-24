import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ModalTest from './modalTest';
import basicimg from "../assets/carousel_basic.png";
import ReviewModalTest from './reviewModalTest';

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
  cursor: pointer; /* 커서 포인터 추가 */
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

const Carousel4: React.FC<Props> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const images = [
    basicimg,
    basicimg,
    basicimg,
    basicimg,
    basicimg,
    basicimg,
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

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Container>
        <ContentWrapper>
          <Row>
            {displayImages.length > 4 && (
              <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            )}
            <ImageRow>
              {displayImages.slice(currentIndex, currentIndex + 4).map((image, index) => (
                <Image key={index} src={image} onClick={() => handleImageClick(image)} />
              ))}
            </ImageRow>
            {displayImages.length > 4 && (
              <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
            )}
          </Row>
        </ContentWrapper>
        {isModalOpen && <ReviewModalTest reviewId='' onClose={handleCloseModal} />}
      </Container>
    </>
  );
};

export default Carousel4;
