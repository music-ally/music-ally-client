import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NaverMap from '../api/naver-map';

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
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  max-width: 800px;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const DetailModal: React.FC<DetailModalProps> = ({ musical_ID, onClose }) => {
  const [musicalDetails, setMusicalDetails] = useState<MusicalDetails | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicalResponse = await axios.get(`/api/musical/${musical_ID}`);
        setMusicalDetails(musicalResponse.data.musical_details);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [musical_ID]);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleReviewClick = () => {
    console.log('리뷰 작성 버튼 클릭됨');
  };

  if (!musicalDetails) {
    return <div>Loading...</div>;
  }

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <div className="detail-modal">
          <div className="poster">
            <img src={musicalDetails.image_url} alt={`${musicalDetails.title} Poster`} />
            <div className="info">
              <h1>{musicalDetails.title}</h1>
              <p>{musicalDetails.genre}</p>
              <h2>공연일정</h2>
              <p>{musicalDetails.date}</p>
              {musicalDetails.cast.length > 0 && (
                <>
                  <h2>캐스팅</h2>
                  <p>{musicalDetails.cast.join(', ')}</p>
                </>
              )}
              <div className="bookmark">
                <button onClick={handleBookmarkClick} className="bookmark-button">
                  <img src={isBookmarked ? "filled-bookmark-url" : "empty-bookmark-url"} alt="Bookmark" />
                </button>
              </div>
            </div>
          </div>
          <div className="map">
            <h2>공연 장소</h2>
            <NaverMap />
            <p>{musicalDetails.place}</p>
          </div>
          <div className='Review'>
            <h2>Review</h2>
            <button onClick={handleReviewClick} className="review-button">
              <img src="write-review-button-url" alt="Write Review" />
            </button>
          </div>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DetailModal;
