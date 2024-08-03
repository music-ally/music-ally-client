import React from "react";
import styled from "styled-components";

const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-shadow: none;
  position: relative;
`;

const PosterImage = styled.img`
  width: 60px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: absolute;
  left: 30px;
`;

const ProfileImages = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: -8px;
  border: 2px solid white;
  position: absolute;
  top: 30px;
  left: 320px;
`;

const Timestamp = styled.div`
  color: #989898;
  font-family: Inter;
  font-size: 9px;
  font-style: normal;
  font-weight: 600;
  line-height: 18.909px;
  letter-spacing: 0.27px;
  position: absolute;
  bottom: 20px;
  left: 75px;
`;
const MusicalName = styled.h2`
  display: relative;
  width: 69px;
  height: 18.306px;
  font-size: 15px;
  flex-shrink: 0;
  color: #2c2c2c;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position: absolute;
  top: 20px;
  left: 75px;
  text-align: left;
`;

const NotifiText = styled.span`
  color: #4e4e4e;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 11.818px;
  letter-spacing: 0.36px;
  position: absolute;
  top: 44px;
  left: 75px;
`;
interface User {
  nickname: string;
  profileImage: string;
  musical_name: string;
}

interface LikeNotificationProps {
  posterImage: string;
  likes: User[];
  create_at: string;
}

const NotifiLike: React.FC<LikeNotificationProps> = ({
  posterImage,
  likes,
  create_at,
}) => {
  if (likes.length === 0) return null;

  const LikeUser = likes[0];
  const additionalLikesCount = likes.length - 1;

  return (
    <NotificationWrapper>
      <PosterImage src={posterImage} alt="Poster" />
      <MusicalName>{LikeUser.musical_name}</MusicalName>
      {likes.length === 1 ? (
        <NotifiText>{LikeUser.nickname}님이 내 리뷰를 좋아합니다</NotifiText>
      ) : (
        <NotifiText>
          {LikeUser.nickname}님 외 {additionalLikesCount}명이 내 리뷰를
          좋아합니다
        </NotifiText>
      )}
      <ProfileImages>
        <ProfileImage src={LikeUser.profileImage} alt="Profile" />
        {additionalLikesCount > 0 && likes[1] && (
          <ProfileImage src={likes[1].profileImage} alt="Profile" />
        )}
      </ProfileImages>
      <Timestamp>{new Date(create_at).toLocaleString()}</Timestamp>
    </NotificationWrapper>
  );
};

export default NotifiLike;
