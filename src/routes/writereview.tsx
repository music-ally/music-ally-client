import React from 'react';
import styled from 'styled-components';
import WriteReview from '../components/wirtereview';
import MusicalTicket from '../components/musicalticket';
import Actor from '../components/actorcircle';

// 전체 페이지 컨테이너 스타일
const AppContainer = styled.div`
  background-image: url('/reviewpage.png'); /* 배경 이미지 경로 */
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

// search 아이콘 스타일
const SearchIcon = styled.img`
  width: 80px; /* 아이콘 너비 */
  height: 80px; /* 아이콘 높이 */
`;

// search 아이콘 스타일
const SearchIcon2 = styled.img`
  width: 50px; /* 아이콘 너비 */
  height: 50px; /* 아이콘 높이 */
`;

// confirm 아이콘 스타일
const ConfirmIcon = styled.img`
  width: 30px; /* 아이콘 너비 */
  height: 29px; /* 아이콘 높이 */
`;

// 제목 스타일
const MainTitle = styled.h1`
  font-size: 75px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59; /* 글자색 설정 */
  background: linear-gradient(to right, #E8E1B1, #BB9D59); /* 그라데이션 배경 */
  -webkit-background-clip: text; /* 텍스트만 그라데이션 적용 */
  background-clip: text; /* 텍스트만 그라데이션 적용 */
  -webkit-text-fill-color: transparent; /* 텍스트 색상 투명으로 */
  margin: 6px 0; /* 상하 간격 추가 */
  display: flex; /* Flex 설정 추가 */
  align-items: center; /* 수직 가운데 정렬 */
  margin-left: 20px; /* 왼쪽 열에 맞게 위치 조정 */
  font-weight: 300; /* 글꼴 두께를 얇게 조정 */
`;

// 제목 스타일
const Title = styled.h2`
  font-size: 52px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59; /* 글자색 설정 */
  background: linear-gradient(to right, #E8E1B1, #BB9D59); /* 그라데이션 배경 */
  -webkit-background-clip: text; /* 텍스트만 그라데이션 적용 */
  background-clip: text; /* 텍스트만 그라데이션 적용 */
  -webkit-text-fill-color: transparent; /* 텍스트 색상 투명으로 */
  margin: 6px 0; /* 상하 간격 추가 */
  display: flex; /* Flex 설정 추가 */
  align-items: center; /* 수직 가운데 정렬 */
  margin-left: 20px; /* 왼쪽 열에 맞게 위치 조정 */
  font-weight: 300; /* 글꼴 두께를 얇게 조정 */
`;

// BasicReview와 Pagination 사이의 수직 간격 스타일
const VerticalSpacing = styled.div`
  margin-top: 20px; /* BasicReview 위 간격 설정 */
  margin-bottom: 30px; /* BasicReview 아래 간격 설정 (줄임) */
`;

// ConfirmIcon을 오른쪽으로 이동시키기 위한 컨테이너
const RightAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 20px; /* 위쪽 간격 추가 */
  margin-left: -80px; /* 왼쪽으로 50px 이동 */
`;

// RightAlignedContainer의 내부를 위한 컨테이너
const RightAlignedContent = styled.div`
  display: flex;
  align-items: center;
`;

// Actor를 왼쪽으로 조정하기 위한 컨테이너
const LeftAlignedActorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 30px; 
  margin-bottom: 50px; /* 타이틀과 다음 컴포넌트 사이 간격 조정 */
  gap: 32px; /* Actor 컴포넌트 사이의 간격 */
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <LeftAlignedContainer>
        <MainTitle>
          MUSICAL
        </MainTitle>
        <SearchIcon src="/search.png" alt="Search Icon" /> 
      </LeftAlignedContainer>
      <MusicalTicket />
      <LeftAlignedContainer>
        <Title>
          ACTOR
        </Title>
        <SearchIcon2 src="/search.png" alt="Search Icon" /> 
      </LeftAlignedContainer>
      <LeftAlignedActorContainer>
        <Actor />
        <Actor />
        <Actor />
      </LeftAlignedActorContainer>
      <LeftAlignedContainer>
        <Title>
          REVIEW
        </Title>
      </LeftAlignedContainer>
      <VerticalSpacing>
        <WriteReview />
      </VerticalSpacing>
      <RightAlignedContainer>
        <RightAlignedContent>
          <ConfirmIcon src="/confirm.png" alt="Confirm Icon" /> 
        </RightAlignedContent>
      </RightAlignedContainer>
    </AppContainer>
  );
};

export default App;
