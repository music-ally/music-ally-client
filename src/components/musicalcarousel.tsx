import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DetailModal from '../components/detail-modal'; // Import your DetailModal component

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
  margin-bottom: 72px;
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
  overflow: hidden;
  width: 1100px; /* Adjust the width based on your design */
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20.5px;
  overflow: hidden;
  width: 275.2px;
  height: 389.3px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer; /* Add cursor style to indicate clickable */
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

interface Work {
  musical_id: string;
  poster_image: string;
}

interface MusicalCarouselProps {
  works: Work[];
}

const MusicalCarousel: React.FC<MusicalCarouselProps> = ({ works }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMusicalId, setSelectedMusicalId] = useState<string | null>(null);

  // works가 정의되어 있지 않을 경우를 대비하여 기본값 설정
  const validWorks = works || [];

  const handleLeftButtonClick = () => {
    setCurrentIndex(prevIndex => {
      // Move left with looping
      return prevIndex === 0
        ? validWorks.length > 4
          ? validWorks.length - 4
          : 0
        : prevIndex - 4;
    });
  };

  const handleRightButtonClick = () => {
    setCurrentIndex(prevIndex => {
      // Move right with looping
      return (prevIndex + 4) % validWorks.length;
    });
  };

  // Display only valid images with empty placeholders if needed
  const displayedImages = Array.from({ length: 4 }, (_, index) => {
    const actualIndex = currentIndex + index;
    if (actualIndex < validWorks.length) {
      return validWorks[actualIndex];
    }
    return { musical_id: `empty-${index}`, poster_image: '/empty.png' };
  });

  const handleImageClick = (musicalId: string) => {
    setSelectedMusicalId(musicalId);
  };

  const handleCloseModal = () => {
    setSelectedMusicalId(null);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <ContentWrapper>
          <Row>
            {validWorks.length > 4 && (
              <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            )}
            <ImageRow>
              {displayedImages.map((work, index) => (
                <ImageContainer key={work.musical_id}>
                  <Image 
                    src={work.poster_image || '/empty.png'} 
                    alt={`Poster ${index}`} 
                    onClick={() => handleImageClick(work.musical_id)}
                    onError={(e) => (e.currentTarget.src = '/empty.png')} // Handle image load error
                  />
                </ImageContainer>
              ))}
            </ImageRow>
            {validWorks.length > 4 && (
              <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
            )}
          </Row>
        </ContentWrapper>
      </Container>
      {selectedMusicalId && (
        <DetailModal musical_ID={selectedMusicalId} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default MusicalCarousel;
