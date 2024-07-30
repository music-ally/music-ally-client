import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import BasicReview from '../components/basicreview';
import Carousel from '../components/reviewcarousel';
import Pagination from '../components/pagination';
import Actorprofile from '../components/actorprofile';

interface Musical {
  id: number;
  title: string;
  posterUrl: string;
}

interface Actor {
  name: string;
  birthDate: string;
  physicalCondition: string;
  agency: string;
  works: number;
  profileImage: string;
  musicals: Musical[];
}

interface Review {
  id: number;
  content: string;
  author: string;
  rating: number;
}

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
const VerticalSpacing = styled.div<{ topMargin?: number; bottomMargin?: number }>`
  margin-top: ${({ topMargin }) => topMargin || 45}px; /* BasicReview 위 간격 설정 */
  margin-bottom: ${({ bottomMargin }) => bottomMargin || 55}px; /* BasicReview 아래 간격 설정 */
`;

const HorizontalLine = styled.hr`
  width: 1131px; /* 가로줄 길이 */
  border-top: 1px solid #D1D1D1; /* 두께는 1px */
  margin: 75px 0; /* 가로줄 위아래 간격을 75px로 조정 */
`;

const App: React.FC = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const [actor, setActor] = useState<Actor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // 배우 정보 가져오기
    fetch(`/api/actor/${actorId}`)
      .then((response) => response.json())
      .then((data) => setActor(data))
      .catch((error) => console.error('Error fetching actor data:', error));

    // 리뷰 정보 가져오기
    fetch(`/api/musical/${actorId}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching actor reviews:', error));
  }, [actorId]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <AppContainer>
      <Actorprofile actor={actor} />
      <LeftAlignedContainer>
        <Title>출연작</Title>
      </LeftAlignedContainer>
      <VerticalSpacing topMargin={30}>
        <Carousel actor={actor} />
      </VerticalSpacing>
    </AppContainer>
  );
};

export default App;

//<HorizontalLine />
//<BasicReview reviews={reviews} />
//<VerticalSpacing topMargin={30} bottomMargin={0}>
//</VerticalSpacing>
//{reviews.map(review => (
  //<VerticalSpacing key={review.id}>
    //<BasicReview review={review} />
  //</VerticalSpacing>
//))}
//<Pagination />
