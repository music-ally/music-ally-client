import React from 'react';
import styled from 'styled-components';

// 기본 값
const DEFAULT_IMAGE_PATH = '/profileimg.png';

// 스타일 컴포넌트
const ActorContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px; /* 필요에 따라 조정 */
`;

const Avatar = styled.div<{ image: string }>`
  box-shadow: 0px 2px 4.1px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  background: ${props => (props.image ? `url(${props.image})` : `url(${DEFAULT_IMAGE_PATH})`)} center center / cover no-repeat;
  width: 54.6px;
  height: 54.6px;
  margin-right: 8.7px;
`;

const Name = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

// Actorcircle 컴포넌트
interface ActorProps {
  profile_image: string;
  actor_name: string;
}

const Actorcircle: React.FC<ActorProps> = ({ profile_image, actor_name }) => {
  return (
    <ActorContainer>
      <Avatar image={profile_image} />
      <Name>{actor_name}</Name>
    </ActorContainer>
  );
};

export default Actorcircle;
