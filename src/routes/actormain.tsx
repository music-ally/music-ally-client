import React from 'react';
import styled from 'styled-components';
import BasicReview from '../components/basicreview';
import Carousel from '../components/reviewcarousel';
import Pagination from '../components/pagination';
import Actorprofile from '../components/actorprofile';

// 전체 페이지 컨테이너 스타일
const AppContainer = styled.div`
  background-image: url('/actorpage.png'); /* 배경 이미지 경로 */
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

// 제목 스타일
const Title = styled.h2`
  font-size: 34px;
  font-family: 'Inter', sans-serif;
  color: #EBEBEB; /* 글자색 설정 */
  margin: 0 74px; /* 좌우 간격 추가 */
  display: flex; /* Flex 설정 추가 */
  align-items: center; /* 수직 가운데 정렬 */
`;

// BasicReview와 Pagination 사이의 수직 간격 스타일
const VerticalSpacing = styled.div<{ topMargin?: number, bottomMargin?: number }>`
  margin-top: ${({ topMargin }) => topMargin || 45}px; /* BasicReview 위 간격 설정 */
  margin-bottom: ${({ bottomMargin }) => bottomMargin || 55}px; /* BasicReview 아래 간격 설정 */
`;

const HorizontalLine = styled.hr`
  width: 1131px; /* 가로줄 길이 */
  border-top: 1px solid #D1D1D1; /* 두께는 1px */
  margin: 75px 0; /* 가로줄 위아래 간격을 75px로 조정 */
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Actorprofile />
      <LeftAlignedContainer>
        <Title>
          출연작
        </Title>
      </LeftAlignedContainer>
      <VerticalSpacing topMargin={30}>
        <Carousel />
      </VerticalSpacing>
      <HorizontalLine />
      <LeftAlignedContainer>
        <Title>
          연관리뷰
        </Title>
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
      <Pagination />
    </AppContainer>
  );
};

export default App;
