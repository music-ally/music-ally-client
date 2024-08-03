import React from 'react';
import styled from 'styled-components';

// 배우 정보 인터페이스
interface Actor {
  actor_id: string;
  profile_image: string;
  actor_name: string;
  birthday: string;
  debut: string;
  agency: string;
  job: string;
  physical: string;
  works_count: number;
}

// 스타일링을 위한 컴포넌트들
const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 138px auto;
  padding: 0 px;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 275px;
  height: 389px;
  object-fit: cover;
  margin-right: 32px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const ActorName = styled.h2`
  font-size: 40px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #EBEBEB;
  margin: 30px 0 19px;
`;

const Divider = styled.hr`
  width: 850px;
  border: 0;
  border-top: 1px solid #ddd;
  margin-bottom: 38px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const InfoLabel = styled.span`
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #A0A0A0;
  margin-right: 10px;
`;

const InfoValue = styled.p`
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #EBEBEB;
  margin: 0;
`;

// 기본값을 제공하는 유틸리티 함수
const defaultValue = (value: string | undefined | null) => value ? value : '-';

// Actorprofile 컴포넌트
const Actorprofile: React.FC<{ actor?: Actor }> = ({ actor }) => {
  if (!actor) {
    return <div>Loading...</div>; // or return an error component
  }

  return (
    <ProfileContainer>
      <Image src={actor.profile_image || '/empty.png'} alt={`${actor.actor_name} 프로필 이미지`} />
      <InfoContainer>
        <ActorName>{defaultValue(actor.actor_name)}</ActorName>
        <Divider />
        <InfoItem>
          <InfoLabel>생년월일</InfoLabel>
          <InfoValue>{defaultValue(new Date(actor.birthday).toLocaleDateString())}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>데뷔</InfoLabel>
          <InfoValue>{defaultValue(actor.debut)}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>소속사</InfoLabel>
          <InfoValue>{defaultValue(actor.agency)}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>직업</InfoLabel>
          <InfoValue>{defaultValue(actor.job)}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>신체조건</InfoLabel>
          <InfoValue>{defaultValue(actor.physical)}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>출연작</InfoLabel>
          <InfoValue>{actor.works_count ? `${actor.works_count}개` : '-'}</InfoValue>
        </InfoItem>
      </InfoContainer>
    </ProfileContainer>
  );
};

export default Actorprofile;
