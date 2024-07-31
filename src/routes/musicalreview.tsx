import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BasicReview from "../components/basicreview";
import BestReview from "../components/bestreview";
import Pagination from "../components/pagination";
import { useNavigate } from "react-router-dom";

// 전체 페이지 컨테이너 스타일
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

// 왼쪽 정렬을 위한 스타일
const LeftAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

// BestReview 제목 스타일
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

// BasicReview 제목 스타일
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

// WriteIcon 이미지 스타일
const WriteIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-left: auto;
  margin-right: 0px;
`;

// BasicReview와 Pagination 사이의 수직 간격 스타일
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
  const [bestReviews, setBestReviews] = useState<any[]>([]);
  const [allReviews, setAllReviews] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수 상태 추가
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    // 데이터를 가져오는 API 호출
    axios
      .get("/api/review") // 여기에 실제 API URL을 입력!!
      .then((response) => {
        const { best_review, all_review, total_pages } = response.data.data;
        setBestReviews(best_review);
        setAllReviews(all_review);
        setTotalPages(total_pages); // 전체 페이지 수 설정
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleWriteReviewClick = () => {
    navigate("/write-review");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지가 변경될 때 데이터를 새로 가져오는 경우 추가
    axios
      .get(`/api/review?page=${page}`) // 페이지에 맞는 데이터 요청
      .then((response) => {
        const { all_review } = response.data.data;
        setAllReviews(all_review);
      })
      .catch((error) => console.error("Error fetching page data:", error));
  };

  return (
    <AppContainer>
      <LeftAlignedContainer>
        <BestReviewTitle>Best Review</BestReviewTitle>
      </LeftAlignedContainer>
      <BestReview reviews={bestReviews} />
      <HorizontalLine />
      <LeftAlignedContainer>
        <BasicReviewTitle>ALL Review</BasicReviewTitle>
        <WriteIcon
          src="/write.png"
          alt="Write Icon"
          onClick={handleWriteReviewClick}
        />
      </LeftAlignedContainer>
      {allReviews.map((review, index) => (
        <VerticalSpacing key={review.review_id}>
          <BasicReview review={review} />{" "}
          {/* BasicReview 컴포넌트는 리뷰 하나를 prop으로 받는다고 가정 */}
        </VerticalSpacing>
      ))}
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </AppContainer>
  );
};

export default App;
