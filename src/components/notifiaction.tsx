import React, { useEffect, useState } from 'react';

interface NotificationData {
  user: string;
  count?: number;
}

interface NotificationProps {
  type: 'review_like' | 'new_follower' | 'follow_confirmation';
  data: NotificationData;
}

// 알림 종류
const Notification: React.FC<NotificationProps> = ({ type, data }) => {
  switch (type) {
    case 'review_like':
      return <div>{data.user} 외 {data.count}명이 내 리뷰를 좋아합니다.</div>;
    case 'new_follower':
      return <div>{data.user}님이 회원님을 팔로우하기 시작했습니다.</div>;
    case 'follow_confirmation':
      return <div>{data.user}님을 팔로우하기 시작했습니다.</div>;
    default:
      return null;
  }
};

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://your-api-endpoint');
    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, newNotification]);
    };
    return () => socket.close();
  }, []);

  return (
    <div>
      {notifications.map((notif, index) => (
        <Notification key={index} type={notif.type} data={notif.data} />
      ))}
    </div>
  );
};
const NotificationToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleNotifications = () => {
    setIsEnabled(!isEnabled);
    fetch('http://your-api-endpoint/notifications/toggle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ enabled: !isEnabled }),
    });
  };

  return (
    <button onClick={toggleNotifications}>
      {isEnabled ? '알림 끄기' : '알림 켜기'}
    </button>
  );
};

const NotificationSystem: React.FC = () => {
  return (
    <div>
      <h2>알림</h2>
      <NotificationToggle />
      <NotificationList />
    </div>
  );
};

export default NotificationSystem;
