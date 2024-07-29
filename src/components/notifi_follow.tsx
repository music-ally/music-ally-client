import React, { useState } from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const FollowButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Timestamp = styled.div`
  margin-top: 8px;
  color: #888;
  font-size: 12px;
`;

interface NotificationFollowProps {
  user: string;
  userId: string;
  profileImage: string;
  isFollowing: boolean;
  timestamp: string; // timestamp 추가
}

const NotificationFollow: React.FC<NotificationFollowProps> = ({ user, userId, profileImage, isFollowing, timestamp }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollowToggle = async () => {
    try {
      // if (following) {
      //   await fetch(`/profile/${userId}/follow`, { method: 'DELETE' });
      // } else {
      //   await fetch(`/profile/${userId}/follow`, { method: 'POST' });
      // }
      setFollowing(!following);
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  return (
    <NotificationContainer>
      <ProfileImage src={profileImage} alt="profile" />
      <div>
        {user}님이 회원님을 팔로우하기 시작했습니다.
      </div>
      <FollowButton
        src={following ? '/public/following_btn_full.svg' : '/public/follow_btn.svg'}
        alt={following ? 'Unfollow' : 'Follow'}
        onClick={handleFollowToggle}
      />
      <Timestamp>{timestamp}</Timestamp>
    </NotificationContainer>
  );
};

export default NotificationFollow;
