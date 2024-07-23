import React from 'react';
import styled from 'styled-components';

// 미리 설정된 이미지 경로와 이름
const IMAGE_PATH = '/testprofile-actor.png';
const ACTOR_NAME = '홍광호';

const ProfileContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0; /* 그라데이션을 아래쪽에만 적용하도록 설정 */
  left: 0;
  width: 100%;
  height: 50%; /* 그라데이션 범위를 하단 50%로 설정 */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  pointer-events: none; /* 그라데이션이 클릭 이벤트를 방지하도록 설정 */
`;

const Name = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600; /* 세미볼드 */
  color: #FFFFFF; /* 텍스트 색상, 필요에 따라 조정 */
  text-align: center;
  z-index: 1; /* 이름이 그라데이션과 이미지 위에 표시되도록 설정 */
`;

const ActorProfile: React.FC = () => {
  return (
    <ProfileContainer>
      <ProfileImage src={IMAGE_PATH} alt={`${ACTOR_NAME}'s profile`} />
      <GradientOverlay />
      <Name>{ACTOR_NAME}</Name>
    </ProfileContainer>
  );
};

export default ActorProfile;
