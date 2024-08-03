import React from "react";
import styled from "styled-components";

const DEFAULT_IMAGE_PATH = "/profileimg.png";

const ActorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Avatar = styled.div<{ image: string }>`
  position: relative;
  box-shadow: 0px 2px 4.1px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  background: ${props => (props.image ? `url(${props.image})` : `url(${DEFAULT_IMAGE_PATH})`)} center center / cover no-repeat;
  width: 120px;
  height: 120px;
  z-index: 1; /* 이름이 아바타 위에 나타나도록 z-index 설정 */

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, black, transparent);
  }
`;

const Name = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #F0F0F0;
  margin-top: -30px; /* 아바타와 이름 사이의 간격 조정 */
  z-index: 2; /* 이름을 아바타 위에 나타나게 하기 위한 z-index 설정 */
  position: relative; /* z-index 적용을 위한 position 설정 */
`;

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
