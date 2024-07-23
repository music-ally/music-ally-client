// src/components/MusicalTicket.tsx

import React from 'react';
import styled from 'styled-components';

interface TicketProps {
  title: string;
  location: string;
  date: string;
  buyerName: string;
  time: string;
}

const Ticket = styled.div`
  display: flex;
  width: 1082px;
  height: 400px;
  background-color: black;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 20px 0 55px 0; /* 위쪽 여백 20px, 아래쪽 여백 55px 설정 */
`;

const Poster = styled.img`
  width: 282px;
  height: 400px;
  object-fit: cover;
  border-radius: 0;
`;

const DetailsContainer = styled.div`
  width: 800px;
  height: 400px;
  position: relative;
  overflow: hidden;
`;

const Details = styled.div`
  width: 120%; /* 블러 범위를 늘려서 전체를 커버 */
  height: 120%; /* 블러 범위를 늘려서 전체를 커버 */
  background-image: url('/musicalposter-1.jpeg');
  background-size: cover;
  background-position: center;
  filter: blur(4px); /* 블러 세기 조정 (4px로 약화) */
  position: absolute;
  top: -10%;
  left: -10%;
  z-index: 1;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 검정색 오버레이 */
  z-index: 2;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: 3;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 40px; /* 텍스트 상단과 상단 여백 설정 */
  left: 20px; /* 왼쪽 정렬을 위해 수정 */
  color: white;
  z-index: 4;
  text-align: left; /* 왼쪽 정렬 */
  padding: 20px;
  box-sizing: border-box;
  background-color: transparent;
  width: calc(100% - 40px); /* 왼쪽과 오른쪽 여백을 고려하여 너비 설정 */
`;

const Title = styled.h1`
  font-size: 47px;
  font-family: 'Inter', sans-serif;
  font-weight: 600; /* 세미볼드 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: #F2F2F2; /* 글자색 설정 */
  margin: 0;
`;

const Info = styled.p`
  font-size: 24px;  
  font-family: 'Inter', sans-serif;
  font-weight: 600; /* 세미볼드 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: #F1F1F1; /* 글자색 설정 */
  margin: 40px 0; /* 위아래 간격 설정 */
`;

const BuyerInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px; /* 오른쪽 여백 설정 */
  display: flex;
  justify-content: space-between; /* 왼쪽과 오른쪽 끝으로 정렬 */
  font-family: 'Inter', sans-serif;
  color: #888888; /* 텍스트 색상 설정 */
  font-size: 16px; /* 폰트 크기 설정 */
  font-weight: 600; /* 세미볼드 */
  z-index: 4;
`;

const BuyerName = styled.p`
  margin: 0; /* 여백 제거 */
`;

const Time = styled.p`
  margin: 0; /* 여백 제거 */
`;

const MusicalTicket: React.FC<TicketProps> = ({ title, location, date, buyerName, time }) => {
  return (
    <Ticket>
      <Poster src="/musicalposter-1.jpeg" alt="Poster" />
      <DetailsContainer>
        <Details />
        <DarkOverlay /> {/* 어두운 오버레이 추가 */}
        <GradientOverlay />
        <TextOverlay>
          <Title>{title}</Title>
          <Info>장 소 : {location}</Info>
          <Info>위치 : {date}</Info>
        </TextOverlay>
        <BuyerInfo>
          <BuyerName>예매자: {buyerName}</BuyerName>
          <Time>{time}</Time>
        </BuyerInfo>
      </DetailsContainer>
    </Ticket>
  );
};

// 현재 날짜와 시간 가져오는 함수
const getCurrentDateTime = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// 컴포넌트의 테스트를 위한 기본 값을 설정합니다
MusicalTicket.defaultProps = {
  title: '레미제라블',
  location: '백암아트홀',
  date: '',
  buyerName: '홍길동',
  time: getCurrentDateTime(), // 현재 날짜와 시간 설정
};

export default MusicalTicket;
