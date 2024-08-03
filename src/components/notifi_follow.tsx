import React, { useState } from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-shadow: none;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
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
  bottom: 5px;
  left: 30px;
`;

const NotifiText = styled.div`
  color: #2c2c2c;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 800;
  line-height: 11.818px;
  letter-spacing: 0.45px;
  text-align: left;
`;

const FollowButton = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

interface NotificationFollowProps {
  follower_nickname: string;
  follower_id: string;
  follower_image: string;
  is_followed: boolean;
  create_at: string;
}

const NotificationFollow: React.FC<NotificationFollowProps> = ({
  follower_nickname,
  follower_id,
  follower_image,
  is_followed,
  create_at,
}) => {
  const [following, setFollowing] = useState(is_followed);

  const handleFollowToggle = async () => {
    try {
      if (following) {
        await fetch(`/profile/${follower_id}/follow`, { method: "DELETE" });
      } else {
        await fetch(`/profile/${follower_id}/follow`, { method: "POST" });
      }
      setFollowing(!following);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  return (
    <NotificationContainer>
      <ProfileImage src={follower_image} alt={follower_nickname} />
      <NotifiText>
        {follower_nickname}님이 회원님을 팔로우하기 시작했습니다.
      </NotifiText>
      <FollowButton
        src={
          following
            ? "/public/following_btn_full.svg"
            : "/public/follow_btn.svg"
        }
        alt={following ? "Unfollow" : "Follow"}
        onClick={handleFollowToggle}
      />
      <Timestamp>{new Date(create_at).toLocaleString()}</Timestamp>
    </NotificationContainer>
  );
};

export default NotificationFollow;
