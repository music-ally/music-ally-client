import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ModalTest from '../modalTest';
import basicimg from "../assets/carousel_basic.png";
import ReviewModalTest from '../reviewModalTest';
import MyReviewModal from './myReviewModal';

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

// reviews array 불러오기
interface Review {
  review_id: string;
  poster_image: string;
}

interface Props {
  reviews: Review[];
}

const MyReviewCaro: React.FC<Props> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedReviewId, setSelectedReviewId] = useState<string>('');


  useEffect(() => {
    const newImages = [...reviews.map(review => review.poster_image)];
    // 리뷰가 없거나 poster_image가 없는 경우 처리
    if (newImages.length === 0 || newImages.every(image => !image)) {
      setDisplayImages(Array(4).fill("/empty.png"));
      return;
  }
    const remainder = newImages.length % 4;
    if (remainder !== 0) {
      const emptySlots = 4 - remainder;
      for (let i = 0; i < emptySlots; i++) {
        newImages.push("/empty.png");
      }
    }
    setDisplayImages(newImages);
  }, [reviews]);

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

const handleImageClick = (reviewId: string) => {
    setSelectedReviewId(reviewId);
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
                <Image key={index} src={image} onClick={() => handleImageClick(reviews[currentIndex + index].review_id)} />
              ))}
            </ImageRow>
            {displayImages.length > 4 && (
              <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
            )}
          </Row>
        </ContentWrapper>
        {/* 백엔드 연결하는 리뷰모달 MyReviewModal 만들기 */}
        {isModalOpen && <MyReviewModal reviewId={selectedReviewId} onClose={handleCloseModal} />}
        {/* {isModalOpen && <ReviewModalTest reviewId={selectedReviewId} onClose={handleCloseModal} />} */}
      </Container>
    </>
  );
};

export default MyReviewCaro;
