// src/components/ReviewCarousel.tsx

import React, { useEffect, useState } from 'react';
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

  body {
    font-family: 'Inter-SemiBold', sans-serif;
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
  gap: 17px;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 20.5px;
  overflow: hidden;
  cursor: pointer;
  width: 275.2px;
  height: 389.3px;

  &:hover .gradient {
    opacity: 0.8;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  opacity: 0.6;
  transition: opacity 0.3s ease;
`;

const ImageText = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  color: #FAFAFA;
  font-size: 23pt;
  z-index: 1;
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

interface ReviewCarouselProps {
  musicalID: number;
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ musicalID }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMusicalID, setSelectedMusicalID] = useState<string>('');
  const [actors, setActors] = useState<Array<{ id: string; url: string; name: string }>>([]);

  useEffect(() => {
    // fetch call to backend to get actors for the musicalID
    // fetch(`/actors/musical/${musicalID}`)
    //   .then(response => response.json())
    //   .then(data => setActors(data));

    // 더미데이터
    const dummyActors = [
      { id: '1', url: '/actor-1.jpeg', name: 'Actor 1' },
      { id: '2', url: '/actor-2.jpeg', name: 'Actor 2' },
      { id: '3', url: '/actor-3.jpeg', name: 'Actor 3' },
      { id: '4', url: '/actor-4.jpeg', name: 'Actor 4' },
      { id: '5', url: '/actor-5.jpeg', name: 'Actor 5' },
      { id: '6', url: '/actor-6.jpeg', name: 'Actor 6' },
    ];

    setActors(dummyActors);
  }, [musicalID]);

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? actors.length - 1 : prevIndex - 1));
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === actors.length - 1 ? 0 : prevIndex + 1));
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
              {actors.slice(currentIndex, currentIndex + 4).map((actor) => (
                <ImageWrapper key={actor.id} onClick={() => handleImageClick(actor.id)}>
                  <Image src={actor.url} alt={actor.name} />
                  <GradientOverlay className="gradient" />
                  <ImageText>{actor.name}</ImageText>
                </ImageWrapper>
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

export default ReviewCarousel;
