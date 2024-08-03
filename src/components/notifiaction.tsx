import React, { useState, useEffect } from "react";
import styled from "styled-components";
import token from "./token";
import NotifiLike from "./notifi_like";
import NotificationFollow from "./notifi_follow";
import ToggleButton from "./notifi-toggle";

const NotificationContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const NotifiTitle = styled.h2`
  color: #2c2c2c;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 40.741px;
  letter-spacing: 0.54px;
  text-shadow: none;
`;

const Notification: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  const toggleNotifications = () => {
    setIsEnabled((prev) => !prev);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await token.get("/notification/");
        if (response.data.success) {
          setNotifications(response.data.data.notifications);
        }
      } catch (error) {
        console.error("알림 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <NotificationContainer>
      <Header>
        <NotifiTitle>NOTIFICATION</NotifiTitle>
        <ToggleButton
          isEnabled={isEnabled}
          toggleNotifications={toggleNotifications}
        />
      </Header>
      {isEnabled && (
        <>
          {notifications.map((notification) => {
            if (notification.type === "리뷰") {
              const reviewLikeImages = notification.review_like_image || [];
              return (
                <NotifiLike
                  key={notification.notification_id}
                  posterImage={notification.poster_image}
                  likes={[
                    {
                      nickname: notification.review_like_nickname,
                      profileImage: reviewLikeImages[0] || "",
                      musical_name: notification.musical_name,
                    },
                  ]}
                  create_at={notification.create_at}
                />
              );
            } else if (notification.type === "팔로우") {
              return (
                <NotificationFollow
                  key={notification.notification_id}
                  follower_nickname={notification.follower_nickname}
                  follower_id={notification.follower_id}
                  follower_image={notification.follower_image}
                  is_followed={notification.is_followed}
                  create_at={notification.create_at}
                />
              );
            } else {
              return null;
            }
          })}
        </>
      )}
    </NotificationContainer>
  );
};

export default Notification;
