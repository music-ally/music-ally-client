// src/components/App.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BasicReview from "../components/basicreview";
import BestReview from "../components/bestreview";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// Review 타입 정의
interface Review {
  review_id: string;
  reviewer_profile_image: string | null;
  reviewer_nickname: string;
  reviewer_email: string;
  create_at: string;
  like_num: number;
  is_like: boolean;
  fear: number;
  sensitivity: number;
  violence: number;
  content: string;
}

// 스타일 정의
const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 162px 74px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const BestReviewTitle = styled.h2`
  font-size: 75px;
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const BasicReviewTitle = styled.h2`
  font-size: 75px;
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const WriteIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-left: auto;
  cursor: pointer;
`;

const VerticalSpacing = styled.div`
  margin-top: 45px;
  margin-bottom: 55px;
`;

const HorizontalLine = styled.hr`
  width: 1131px;
  border-top: 1px solid #d1d1d1;
  margin: 75px 0;
`;

const App: React.FC = () => {
  const [bestReviews, setBestReviews] = useState<Review[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 쿠키에서 토큰 가져오기
        const accessToken = Cookies.get("access_token");

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
          },
        });

        console.log(response.data); // 응답 데이터 확인

        const { best_review, all_review } = response.data.data;

        // 데이터 검증
        if (Array.isArray(best_review) && Array.isArray(all_review)) {
          setBestReviews(best_review);
          setAllReviews(all_review);
        } else {
          console.error("Unexpected data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleWriteReviewClick = () => {
    navigate("/write-review");
  };

  return (
    <AppContainer>
      <LeftAlignedContainer>
        <BestReviewTitle>Best Review</BestReviewTitle>
      </LeftAlignedContainer>
      {bestReviews.map((review) => (
        <VerticalSpacing key={review.review_id}>
          <BestReview review={review} />
        </VerticalSpacing>
      ))}
      <HorizontalLine />
      <LeftAlignedContainer>
        <BasicReviewTitle>ALL Review</BasicReviewTitle>
        <WriteIcon
          src="/write.png"
          alt="Write Icon"
          onClick={handleWriteReviewClick}
        />
      </LeftAlignedContainer>
      {allReviews.map((review) => (
        <VerticalSpacing key={review.review_id}>
          <BasicReview review={review} />
        </VerticalSpacing>
      ))}
    </AppContainer>
  );
};

export default App;
