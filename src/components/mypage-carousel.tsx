import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import basicimg from "../assets/carousel_basic.png";
import axios from 'axios';

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
    // 기본 이미지 설정
    // 한번에 4개씩 보이니 기본은 기본 이미지로 설정
    // 정보가 0-3개일 때 정보 있는것만 사진, 아니면 기본 이미지
    // 넘어갈 때 한칸씩 넘어가므로 그 이상은 ㄴㄴ

    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMusicalID, setSelectedMusicalID] = useState<string>('');
    /* 
    const images = [
        basicimg,
        basicimg,
        basicimg,
        basicimg,
        basicimg,
    ]; */

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`);
                const reviewImg = response.data;

                const filledImages = [...reviewImg];
                while (filledImages.length < 4) {
                    filledImages.push(basicimg);
                }
                setImages(filledImages);
            } catch (error) {
                console.error('Error fetching images: ', error);

                setImages([basicimg, basicimg, basicimg, basicimg]);
            }
        };
        fetchImages();
    }, []);

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
              {images.map((image, index) => {
                const displayIndex = (index + currentIndex) % images.length;
                return (
                  <Image
                    key={image.id}
                    src={images[displayIndex].url}
                    onClick={() => handleImageClick(images[displayIndex].id)} 
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
        {isModalOpen && <DetailModal musical_ID={selectedMusicalID} onClose={handleCloseModal} />}
      </Container>
    </>
  );
};

export default Component;
