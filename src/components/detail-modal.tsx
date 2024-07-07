import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NaverMap from '../api/naver-map';

interface MusicalDetails {
  image_url: string;
  title: string;
  sub_title: string;
  genre: string;
  date: string;
  place: string;
  age_limit: string;
  runtime: string;
  website: string;
  cast: string[];
}

interface DetailModalProps {
  musical_ID: string;
}

const DetailModal: React.FC<DetailModalProps> = ({ musical_ID }) => {
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
    <div className="detail-modal">
      <div className="poster">
        <img src={musicalDetails.image_url} alt={`${musicalDetails.title} Poster`} />
        <div className="info">
          <h1>{musicalDetails.title}</h1>
          <p>{musicalDetails.sub_title}</p>
          <p>{musicalDetails.genre}</p>
          <p>{musicalDetails.date}</p>
          <p>{musicalDetails.place}</p>
          <p>{musicalDetails.age_limit}</p>
          <p>{musicalDetails.runtime}</p>
          {musicalDetails.website && <p><a href={musicalDetails.website}>Website</a></p>}
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
      </div>
      <div className='Review'>
      <h2>Review</h2>
      <button onClick={handleReviewClick} className="review-button">
        <img src="write-review-button-url" alt="Write Review" />
      </button>
      </div>
    </div>
  );
};

export default DetailModal;
