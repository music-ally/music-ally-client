import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NaverMap from "../api/naver-map";
import ReviewComponent from "./review";
import token from "./token";

interface MusicalDetails {
  poster_image: string;
  musical_name: string;
  genre: string;
  start_at: string;
  theater_address: string;
  castings: string[];
  reviews: string[];
}

interface DetailModalProps {
  musical_ID: string;
  onClose: () => void;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 1001;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
`;

const Poster = styled.img`
  width: 400px;
  height: 600px;
  border-radius: 10px;
  margin-top: 50px;
  margin-left: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Info = styled.div`
  padding: 0 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 171px;
  margin-left: 71px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5em;
  color: #e3bf3d;
  flex-grow: 1;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  margin: 10px 0;
  font-size: 1.2em;
  margin-bottom: 33px;
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  color: #e3bf3d;
  margin-bottom: 33px;
`;

const Cast = styled.p`
  margin: 10px 0;
  color: #fffff;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
`;

const BookmarkIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const ReviewSection = styled.div`
  margin-top: 20px;
`;

const ReviewcomponentSection = styled.div`
  margin-left: 20px;
  & > div {
    margin-bottom: 18px;
  }
`;

const ReviewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  margin-left: -180px;
`;

const ReviewIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-top: -65px;
  margin-left: 1100px;
`;

const DetailModal: React.FC<DetailModalProps> = ({ musical_ID, onClose }) => {
  const [musicalDetails, setMusicalDetails] = useState<MusicalDetails | null>(
    null
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching details for musical ID: ${musical_ID}`);
        const musicalDetails = await token.get(`/musical/${musical_ID}`);
        console.log("Musical details:", musicalDetails.data.data);
        setMusicalDetails(musicalDetails.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [musical_ID]);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleReviewClick = () => {
    console.log("리뷰 작성 버튼 클릭됨");
  };

  if (!musicalDetails) {
    return <div>Loading...</div>;
  }

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <InfoContainer>
          <Poster
            src={musicalDetails.poster_image}
            alt={`${musicalDetails.musical_name} Poster`}
          />
          <Info>
            <div>
              <TitleContainer>
                <br />
                <Title>{musicalDetails.musical_name}</Title>
                <BookmarkButton onClick={handleBookmarkClick}>
                  <BookmarkIcon
                    src={
                      isBookmarked ? "tag-button-on.svg" : "tag-button-off.svg"
                    }
                    alt="Bookmark"
                  />
                </BookmarkButton>
              </TitleContainer>
              <Subtitle>{musicalDetails.genre}</Subtitle>
              <Section>
                <SectionTitle>공연 일정</SectionTitle>
                <p>{musicalDetails.start_at}</p>
              </Section>
              {musicalDetails.castings.length > 0 && (
                <Section>
                  <SectionTitle>캐스팅</SectionTitle>
                  <Cast>{musicalDetails.castings.join(", ")}</Cast>
                </Section>
              )}
            </div>
          </Info>
        </InfoContainer>
        <Section>
          <SectionTitle>공연 장소</SectionTitle>
          <br />
          <NaverMap />
          <p>{musicalDetails.theater_address}</p>
        </Section>
        <ReviewSection>
          <SectionTitle>Review</SectionTitle>
          <ReviewButton onClick={handleReviewClick}>
            <ReviewIcon src="review-write.svg" alt="리뷰작성" />
          </ReviewButton>
          <ReviewcomponentSection>
            {musicalDetails.reviews.map((review, index) => (
              // <ReviewComponent key={index} review={review} />
              <ReviewComponent />
            ))}
          </ReviewcomponentSection>
        </ReviewSection>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DetailModal;
