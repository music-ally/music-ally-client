import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NaverMap from '../api/naver-map';
// import axios from 'axios';

interface MusicalDetails {
  image_url: string;
  title: string;
  genre: string;
  date: string;
  place: string;
  cast: string[];
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
`;

const ModalContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  max-width: 1200px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
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
`;

const Subtitle = styled.p`
  margin: 10px 0;
  font-size: 1.2em;
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  color: #e3bf3d;
`;

const Cast = styled.p`
  margin: 10px 0;
  color: #e3bf3d;
`;

const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 20px;
`;

const BookmarkIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const ReviewSection = styled.div`
  margin-top: 20px;
`;

const ReviewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ReviewIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const DetailModal: React.FC<DetailModalProps> = ({ musical_ID, onClose }) => {
  const [musicalDetails, setMusicalDetails] = useState<MusicalDetails | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const musicalResponse = await axios.get(`/api/musical/${musical_ID}`);
  //       setMusicalDetails(musicalResponse.data.musical_details);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [musical_ID]);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleReviewClick = () => {
    console.log('리뷰 작성 버튼 클릭됨');
  };

  // 더미 데이터
  const dummyData: MusicalDetails = {
    image_url: "https://via.placeholder.com/400x600",
    title: "레미제라블",
    genre: "뮤지컬",
    date: "2023.11.30 ~ 2024.03.10",
    place: "서울특별시 종로구 동숭동 대학로 12길 64 유니플렉스 1관",
    cast: ["민우혁", "최재림", "김우형", "카이", "조정은", "린아", "임기홍", "김영주", "박지홍", "안시하", "조하훈"]
  };

  const details = musicalDetails || dummyData;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <InfoContainer>
          <Poster src={details.image_url} alt={`${details.title} Poster`} />
          <Info>
            <div>
              <TitleContainer>
                <br/>
                <Title>{details.title}</Title>
                <BookmarkButton onClick={handleBookmarkClick}>
                  <BookmarkIcon src={isBookmarked ? "tag-button-on.svg" : "tag-button-off.svg"} alt="Bookmark" />
                </BookmarkButton>
              </TitleContainer>
              <Subtitle>{details.genre}</Subtitle>
              <Section>
                <SectionTitle>공연 일정</SectionTitle>
                <p>{details.date}</p>
              </Section>
              {details.cast.length > 0 && (
                <Section>
                  <SectionTitle>캐스팅</SectionTitle>
                  <Cast>{details.cast.join(', ')}</Cast>
                </Section>
              )}
            </div>
          </Info>
        </InfoContainer>
        <Section>
          <SectionTitle>공연 장소</SectionTitle>
          <br/>
          <NaverMap />
          <p>{details.place}</p>
        </Section>
        <ReviewSection>
          <SectionTitle>Review</SectionTitle>
          <ReviewButton onClick={handleReviewClick}>
            <ReviewIcon src="review-write.svg" alt="Write Review" />
            리뷰 작성
          </ReviewButton>
        </ReviewSection>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DetailModal;
