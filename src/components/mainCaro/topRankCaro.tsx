import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import DetailModal from '../detail-modal';

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
  gap: 17px; 
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

interface Musical {
  musical_id: string;
  poster_image: string;
}

const TopRankCaro: React.FC = () => {
  const [musicals, setMusicals] = useState<Musical[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string>('');

  useEffect(() => {
    const fetchMusicals = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/musical/topRank`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        if (response.data.success) {
          setMusicals(response.data.data);
        }
      } catch (error) {
        console.error('뮤지컬 데이터를 가져오는 데 실패했습니다: ', error);
      }
    };

    fetchMusicals();
  }, []);

  useEffect(() => {
    const newImages = musicals.map(musical => musical.poster_image);
    // 찜이 없거나 poster_image가 없는 경우 처리
    if (newImages.length === 0 || newImages.every(image => !image)) {
      setDisplayImages(Array(4).fill("/empty.png"));
      return;
    }

    // const remainder = newImages.length % 4;
    // if (remainder !== 0) {
    //   const emptySlots = 4 - remainder;
    //   for (let i = 0; i < emptySlots; i++) {
    //     newImages.push("/empty.png");
    //   }
    // }
    
    setDisplayImages(newImages);
  }, [musicals]);

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1; // 한 칸씩 왼쪽으로 이동
      return newIndex;
    });
  };
  
  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1; // 한 칸씩 오른쪽으로 이동
      return newIndex;
    });
  };  

  const handleImageClick = (musicalId: string) => {
    setSelectedReviewId(musicalId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const displayedImages = [...displayImages, ...displayImages, ...displayImages].slice(currentIndex, currentIndex + 4);


  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <Container>
        <ContentWrapper>
          <Row>
            {displayedImages.length > 0 && (
              <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
            )}
            <ImageRow>
              {displayedImages.map((image, index) => (
                <Image
                key={index}
                src={image}
                onClick={() => handleImageClick(musicals[currentIndex + index].musical_id)}
              />
              ))}
            </ImageRow>
            {displayImages.length > 4 && (
              <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
            )}
          </Row>
        </ContentWrapper>
        {isModalOpen && <DetailModal musical_ID={selectedReviewId} onClose={handleCloseModal} />}
      </Container>
    </>
  );
};

export default TopRankCaro;
