import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import token from "./token";
import { AxiosError } from "axios";

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
  font-family: "Inter-SemiBold", sans-serif;
  font-size: 16pt;
  color: #f2f2f2;
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
  src: string | null;
  name: string;
  id: string;
}

interface ActorCarouselProps {
  actorId: string[];
}

const ActorCarousel: React.FC<ActorCarouselProps> = ({ actorId }) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const allImages = await Promise.all(
          actorId.map((id) =>
            token.get(`/actor/${id}`).then((response) => ({
              src: response.data.data.profile_image || "/empty.png",
              name: response.data.data.actor_name,
              id: response.data.data.actor_id,            }))
          )
        );
        setImages(allImages);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(
          "Error fetching images:",
          axiosError.response ? axiosError.response.data : axiosError.message
        );
      }
    };

    fetchImages();
  }, [actorId]);

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 4 : prevIndex - 4
    );
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % images.length);
  };

  const handleImageClick = (actorID: string) => {
    navigate(`/actor/${actorID}`);
  };

  const displayedImages = [...images, ...images, ...images].slice(
    currentIndex,
    currentIndex + 4
  );

  return (
    <>
      <GlobalStyle />
      <Container>
        <ContentWrapper>
          <Row>
            {images.length > 4 && (
              <LeftButton
                src="/carouselbutton-left.png"
                alt="Left Button"
                onClick={handleLeftButtonClick}
              />
            )}
            <ImageRow>
              {displayedImages.map((image, index) => (
                <ImageContainer key={index}>
                  <Image
                    src={image.src || "/empty.png"}
                    alt={`Poster ${index}`}
                    onClick={() => handleImageClick(image.id)}
                    onError={(e) => (e.currentTarget.src = "/empty.png")} // Handle image load error
                  />
                  <GradientOverlay />
                  <ImageText>{image.name}</ImageText>
                </ImageContainer>
              ))}
            </ImageRow>
            {images.length > 4 && (
              <RightButton
                src="/carouselbutton-right.png"
                alt="Right Button"
                onClick={handleRightButtonClick}
              />
            )}
          </Row>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default ActorCarousel;