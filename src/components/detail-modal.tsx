import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NaverMap from "../api/naver-map";
import ReviewComponent from "./review";
import token from "./token";

interface MusicalDetails {
  poster_image: string;
  musical_name: string;
  musical_genre: string;
  start_at: string;
  end_at: string;
  theater_address: string;
  theater_name: string;
  castings: string[];
  reviews: string[];
  is_bookmark: boolean;
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
  background-color: rgba(0, 0, 0, 0.7); /* Darker and more opaque background */
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

const HorizontalLine = styled.hr`
  width: 980px; /* Adjust the width as needed */
  border-top: 1px solid #a0a0a0; /* Darker shade of gray */
  margin: 75px auto; /* Center-aligns the line */
  border-radius: 5px; /* Optional: Add some border-radius for a rounded look */
  /* Optionally add a box-shadow for a subtle 3D effect */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;


const Poster = styled.img`
  width: 360px;
  height: 530px;
  border-radius: 10px;
  margin-top: 80px;
  margin-left: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Info = styled.div`
  padding: 0 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 130px;
  margin-left: 70px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 52px;
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0px 0;
  display: flex;
  align-items: center;
  font-weight: 700; /* Adjust the weight here */
`;


const Subtitle = styled.p`
  margin: 10px 0;
    color:#e8e1b1;
  font-size: 20px;
    margin-top: 17px;
  margin-bottom: 33px;
`;

const Section = styled.div`
  margin-top: 25px;
  margin-bottom: 40px;
    font-size: 16px;
      color: #EBEBEB;

`;

const SectionTitle = styled.h2`
  font-size: 25px;
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-weight: 700; /* Adjust the weight here */
`;

const SectionTitle2 = styled.h2`
  font-size: 40px;
  font-family: sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-weight: 700; /* Adjust the weight here */
`;

const SectionTitle3 = styled.h2`
  font-size: 50px;
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  font-weight: 700; /* Adjust the weight here */
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
  width: 50px;
  height: 50px;
  margin-left: 200px;
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
  width: 40px;
  height: 40px;
  margin-top: -65px;
  margin-left: 1080px;
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
        const response = await token.get(`/musical/${musical_ID}`);
        const musicalDetails = response.data.data;
        console.log("Musical details:", musicalDetails);
        setMusicalDetails(musicalDetails);
        setIsBookmarked(musicalDetails.is_bookmark);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [musical_ID]);

  const handleBookmarkClick = async () => {
    try {
      await token.post(`/musical/${musical_ID}/bookmark`);
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      console.error("Error updating bookmark status:", error);
    }
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
              <Subtitle>▎{musicalDetails.musical_genre}</Subtitle>
              <Section>
                <SectionTitle>공연 일정</SectionTitle>
                <p>
                  {musicalDetails.start_at} - {musicalDetails.end_at}
                </p>
              </Section>
              <Section>
                <SectionTitle>공연 극장</SectionTitle>
                <p>{musicalDetails.theater_name}</p>
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
        <HorizontalLine/>
          <SectionTitle2>공연 장소</SectionTitle2>
          <NaverMap theater_address={musicalDetails.theater_address} />
          <p>{musicalDetails.theater_address}</p>
        </Section>
        <ReviewSection>
          <SectionTitle3>REVIEW</SectionTitle3>
          <ReviewButton onClick={handleReviewClick}>
            <ReviewIcon src="review-write.svg" alt="리뷰작성" />
          </ReviewButton>
          <ReviewcomponentSection>
            {musicalDetails.reviews.map((review, index) => (
              <ReviewComponent key={index} review={review} />
            ))}
          </ReviewcomponentSection>
        </ReviewSection>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DetailModal;


