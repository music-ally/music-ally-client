import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DetailModal from './detail-modal';

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
  margin-bottom : 72px;
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
  gap: 17px;
`;

const Image = styled.img`
  border-radius: 20.5px;
  width: 275.2px;
  height: 389.3px;
  cursor: pointer; 
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMusicalID, setSelectedMusicalID] = useState<string>('');
  const images = [
    { id: '1', url: '/musicalposter-1.jpeg' },
    { id: '2', url: '/musicalposter-2.jpeg' },
    { id: '3', url: '/musicalposter-3.jpeg' },
    { id: '4', url: '/musicalposter-4.jpeg' },
    { id: '5', url: '/musicalposter-5.jpeg' },
    { id: '6', url: '/musicalposter-6.jpeg' },
  ];

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleImageClick = (musicalID: string) => {
    setSelectedMusicalID(musicalID);
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
            <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            <ImageRow>
              {images.slice(currentIndex, currentIndex + 4).map((image) => (
                <Image
                  key={image.id}
                  src={image.url}
                  onClick={() => handleImageClick(image.id)} 
                />
              ))}
            </ImageRow>
            <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
          </Row>
        </ContentWrapper>
        {isModalOpen && <DetailModal musical_ID={selectedMusicalID} onClose={handleCloseModal} />}
      </Container>
    </>
  );
};

export default Component;
