import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const PosterImage = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  margin-bottom: 10px;
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
`;

const Timestamp = styled.div`
  margin-top: 8px;
  color: #888;
  font-size: 12px;
`;

interface User {
  nickname: string;
  profileImage: string;
}

interface LikeNotificationProps {
  posterImage: string;
  likes: User[];
}

const NotifiLike: React.FC<LikeNotificationProps> = ({ posterImage, likes }) => {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const currentDateTime = new Date();
    setTimestamp(currentDateTime.toLocaleString());
  }, []);

  if (likes.length === 0) return null;

  const LikeUser = likes[0];
  const additionalLikesCount = likes.length - 1;

  return (
    <NotificationWrapper>
      <PosterImage src={posterImage} alt="Poster" />
      {likes.length === 1 ? (
        <span>{LikeUser.nickname}님이 내 리뷰를 좋아합니다</span>
      ) : (
        <span>
          {LikeUser.nickname}님 외 {additionalLikesCount}명이 내 리뷰를 좋아합니다
        </span>
      )}
      <ProfileImages>
        <ProfileImage src={LikeUser.profileImage} alt="Profile" />
        {additionalLikesCount > 0 && likes[1] && (
          <ProfileImage src={likes[1].profileImage} alt="Profile" />
        )}
      </ProfileImages>
      <Timestamp>{timestamp}</Timestamp>
    </NotificationWrapper>
  );
};

export default NotifiLike;
