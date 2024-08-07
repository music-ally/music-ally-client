import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import DetailModal from './detail-modal';

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

interface Musical {
  id: number;
  title: string;
  posterUrl: string;
}

interface Actor {
  name: string;
  birthDate: string;
  physicalCondition: string;
  agency: string;
  works: number;
  profileImage: string;
  musicals: Musical[];
}

interface CarouselProps {
  actorId: number;
}

const Carousel: React.FC<CarouselProps> = ({ actorId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<Musical[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [actor, setActor] = useState<Actor | null>(null);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const response = await axios.get(`/api/actor/${actorId}`);
        setActor(response.data);
      } catch (error) {
        console.error('Error fetching actor data:', error);
      }
    };

    fetchActorData();
  }, [actorId]);

  useEffect(() => {
    if (actor) {
      const musicals = actor.musicals;
      const newImages = [...musicals];
      const remainder = newImages.length % 4;
      if (remainder !== 0) {
        const emptySlots = 4 - remainder;
        for (let i = 0; i < emptySlots; i++) {
          newImages.push({ id: -1, title: 'empty', posterUrl: '/empty.png' });
        }
      }
      setDisplayImages(newImages);
    }
  }, [actor]);

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
      <GlobalStyle />
      <Container>
        <ContentWrapper>
          <Row>
            {displayImages.length > 4 && (
              <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            )}
            <ImageRow>
              {displayImages.slice(currentIndex, currentIndex + 4).map((musical, index) => (
                <Image
                  key={index}
                  src={musical.posterUrl}
                  alt={musical.title}
                  onClick={() => handleImageClick(musical.posterUrl)}
                />
              ))}
            </ImageRow>
            {displayImages.length > 4 && (
              <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
            )}
          </Row>
        </ContentWrapper>
        {isModalOpen && <DetailModal image={selectedImage} onClose={handleCloseModal} />}
      </Container>
    </>
  );
};

export default Carousel;
