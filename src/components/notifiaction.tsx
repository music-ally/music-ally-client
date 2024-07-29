import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Notifion from '../assets/Notifi_on.svg';
import Notifioff from '../assets/Notifi_off.svg';

const Notifica = styled.div`
  width: 400px;
`;

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const NotificationImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ToggleButton = styled.button<{ isEnabled: boolean }>`
  background: url(${props => (props.isEnabled ? Notifion : Notifioff)}) no-repeat center/contain;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 10px 0;
`;

interface NotificationData {
  user: string;
  count?: number;
  image_url?: string;
  profileimage?: string;
}

interface NotificationProps {
  type: 'review_like' | 'new_follower';
  data: NotificationData;
}

const Notification: React.FC<NotificationProps> = ({ type, data }) => {
  return (
    <NotificationContainer>
      {type === 'review_like' && <NotificationImage src={data.image_url} alt="content" />}
      {type === 'new_follower' && <ProfileImage src={data.profileimage} alt="profile" />}
      <div>
        {type === 'review_like'
          ? `${data.user} 외 ${data.count}명이 내 리뷰를 좋아합니다.`
          : `${data.user}님이 회원님을 팔로우하기 시작했습니다.`}
      </div>
    </NotificationContainer>
  );
};

const NotificationList: React.FC<{ notifications: NotificationProps[] }> = ({ notifications }) => {
  return (
    <div>
      {notifications.map((notif, index) => (
        <Notification key={index} type={notif.type} data={notif.data} />
      ))}
    </div>
  );
};

const NotificationToggle: React.FC<{ isEnabled: boolean; toggleNotifications: () => void }> = ({
  isEnabled,
  toggleNotifications,
}) => {
  return (
    <ToggleButton onClick={toggleNotifications} isEnabled={isEnabled} />
  );
};

const Notifi: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const [isEnabled, setIsEnabled] = useState(() => {
    const savedState = localStorage.getItem('notificationsEnabled');
    return savedState === null ? true : JSON.parse(savedState);
  });

  useEffect(() => {
    if (!isEnabled) return; // 알림이 꺼져 있으면 새로운 알림을 추가하지 않음

    const interval = setInterval(() => {
      const dummyNotification: NotificationProps = {
        type: 'review_like',
        data: {
          user: '사용자1',
          count: Math.floor(Math.random() * 10) + 1,
          image_url: 'https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg',
        },
      };
      setNotifications((prev) => {
        const newNotifications = [...prev, dummyNotification];
        localStorage.setItem('notifications', JSON.stringify(newNotifications));
        return newNotifications;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isEnabled]);

  const toggleNotifications = () => {
    setIsEnabled((prev) => {
      const newState = !prev;
      localStorage.setItem('notificationsEnabled', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <Notifica>
      <h2>알림</h2>
      <NotificationToggle isEnabled={isEnabled} toggleNotifications={toggleNotifications} />
      <NotificationList notifications={notifications} />
    </Notifica>
  );
};

export default Notifi;
