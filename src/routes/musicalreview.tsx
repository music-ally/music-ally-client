import React from 'react';
import styled from 'styled-components';
import BasicReview from '../components/basicreview';
import BestReview from '../components/bestreview';
import Pagination from '../components/pagination';
import { useNavigate } from 'react-router-dom';


// 전체 페이지 컨테이너 스타일
const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh; /* 최소 화면 높이 */
  padding: 162px 74px 100px; /* 상단 162px, 좌우 74px 여백, 하단 100px 여백 */
  box-sizing: border-box; /* padding을 포함한 전체 박스 크기 설정 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 모든 컴포넌트들을 수직 방향 중앙 정렬 */
`;

// 왼쪽 정렬을 위한 스타일
const LeftAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center; /* 세로 중앙 정렬 */
  margin-bottom: 20px; /* 타이틀과 다음 컴포넌트 사이 간격 조정 */
`;

// BestReview 제목 스타일
const BestReviewTitle = styled.h2`
  font-size: 75px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59; /* 글자색 설정 */
  background: linear-gradient(to right, #E8E1B1, #BB9D59); /* 그라데이션 배경 */
  -webkit-background-clip: text; /* 텍스트만 그라데이션 적용 */
  background-clip: text; /* 텍스트만 그라데이션 적용 */
  -webkit-text-fill-color: transparent; /* 텍스트 색상 투명으로 */
  margin: 0 0px; /* 좌우 간격 추가 */
  display: flex; /* Flex 설정 추가 */
  align-items: center; /* 수직 가운데 정렬 */
  font-weight: 300; /* 글꼴 두께를 얇게 조정 */
`;

// BasicReview 제목 스타일
const BasicReviewTitle = styled.h2`
  font-size: 75px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59; /* 글자색 설정 */
  background: linear-gradient(to right, #E8E1B1, #BB9D59); /* 그라데이션 배경 */
  -webkit-background-clip: text; /* 텍스트만 그라데이션 적용 */
  background-clip: text; /* 텍스트만 그라데이션 적용 */
  -webkit-text-fill-color: transparent; /* 텍스트 색상 투명으로 */
  margin: 0 0px; /* 좌우 간격 추가 */
  display: flex; /* Flex 설정 추가 */
  align-items: center; /* 수직 가운데 정렬 */
  font-weight: 300; /* 글꼴 두께를 얇게 조정 */
`;

// WriteIcon 이미지 스타일
const WriteIcon = styled.img`
  width: 50px; /* 아이콘 너비 */
  height: 50px; /* 아이콘 높이 */
  margin-left: auto; /* 왼쪽 여백을 auto로 설정하여 오른쪽으로 이동 */
  margin-right: 0px; /* 오른쪽 여백 추가 */
`;

// BasicReview와 Pagination 사이의 수직 간격 스타일
const VerticalSpacing = styled.div`
  margin-top: 45px; /* BasicReview 위 간격 설정 */
  margin-bottom: 55px; /* BasicReview 아래 간격 설정 */
`;

const HorizontalLine = styled.hr`
  width: 1131px; /* 가로줄 길이 */
  border-top: 1px solid #D1D1D1; /* 두께는 1px */
  margin: 75px 0; /* 가로줄 위아래 간격을 75px로 조정 */
`;

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleWriteReviewClick = () => {
    navigate('/write-review');
  };

  return (
    <AppContainer>
      <LeftAlignedContainer>
        <BestReviewTitle>
          Best Review
        </BestReviewTitle>
      </LeftAlignedContainer>
      <BestReview />
      <HorizontalLine />
      <LeftAlignedContainer>
        <BasicReviewTitle>
          ALL Review
        </BasicReviewTitle>
        <WriteIcon src="/write.png" alt="Write Icon" onClick={handleWriteReviewClick} />
      </LeftAlignedContainer>
      <VerticalSpacing>
        <BasicReview />
      </VerticalSpacing>
      <VerticalSpacing>
        <BasicReview />
      </VerticalSpacing>
      <VerticalSpacing>
        <BasicReview />
      </VerticalSpacing>
      <VerticalSpacing>
        <BasicReview />
      </VerticalSpacing>
      <Pagination />
    </AppContainer>
  );
};

export default App;