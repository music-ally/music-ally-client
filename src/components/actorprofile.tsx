import React from 'react';
import styled from 'styled-components';

// 배우 정보 인터페이스
interface Actor {
  name: string;
  birthDate: string;
  physicalCondition: string;
  agency: string;
  works: number;
}

// 스타일링을 위한 컴포넌트들
const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 1300px; /* 최대 폭을 1200px로 설정 */
  margin: 138px auto; /* 위아래 간격을 138px로 설정, 중앙 정렬 */
  padding: 0 64px; /* 좌우 간격을 64px로 설정 */
  box-sizing: border-box; /* padding이 포함된 박스 크기 계산 */
`;

const Image = styled.img`
  width: 275px; /* 이미지 폭 설정 */
  height: 389px; /* 이미지 높이 설정 */
  object-fit: cover; /* 이미지 비율 유지하며 자르기 */
  margin-right: 32px; /* 이미지와 정보 사이 간격 설정 */
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const ActorName = styled.h2`
  font-size: 40px;
  font-family: 'Inter', sans-serif;
  font-weight: 600; /* 세미볼드 설정 */
  color: #EBEBEB; /* 글자색 설정 */
  margin: 64px 0 19px; /* 위쪽 여백을 64px, 아래쪽 여백을 19px로 설정 */
`;

const Divider = styled.hr`
  width: 850px;
  border: 0;
  border-top: 1px solid #ddd;
  margin-bottom: 38px; /* 구분선 아래 간격을 38px로 조정 */
`;

const InfoItem = styled.div`
  display: flex; /* 레이블과 값을 수평으로 배치 */
  align-items: center; /* 레이블과 값을 세로 중앙 정렬 */
  margin-bottom: 15px; /* 각 항목 사이의 간격을 15px로 조정 */
`;

const InfoLabel = styled.span`
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 600; /* 세미볼드 설정 */
  color: #A0A0A0; /* 글자색 설정 */
  margin-right: 10px; /* 레이블과 값 사이 간격 설정 */
`;

const InfoValue = styled.p`
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 600; /* 세미볼드 설정 */
  color: #EBEBEB; /* 글자색 설정 */
  margin: 0; /* 아래 여백을 없앰 */
`;

// Actorprofile 컴포넌트
const Actorprofile: React.FC = () => {
  const actor: Actor = {
    name: '홍광호',
    birthDate: '2001.01.01',
    physicalCondition: '185cm, 66kg, A형',
    agency: 'SM',
    works: 120,
  };

  return (
    <ProfileContainer>
      <Image src="/testprofile-actor.png" alt={`${actor.name} 프로필 이미지`} />
      <InfoContainer>
        <ActorName>{actor.name}</ActorName>
        <Divider />
        <InfoItem>
          <InfoLabel>생년월일</InfoLabel>
          <InfoValue>{actor.birthDate}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>신체조건</InfoLabel>
          <InfoValue>{actor.physicalCondition}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>소속사</InfoLabel>
          <InfoValue>{actor.agency}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>출연작</InfoLabel>
          <InfoValue>{actor.works}개</InfoValue>
        </InfoItem>
      </InfoContainer>
    </ProfileContainer>
  );
};

export default Actorprofile;
