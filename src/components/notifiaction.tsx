import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import NotifiLike from './notifi_like';
import NotificationFollow from './notifi_follow'; 
import ToggleButton from './notifi-toggle'; 

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
  color: #2C2C2C;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 40.741px;
  letter-spacing: 0.54px;
  text-shadow: none;
`;

interface NotificationProps {
  type: 'like' | 'follow';
  data: any; 
}

const Notification: React.FC<NotificationProps> = ({ type, data }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  const toggleNotifications = () => {
    setIsEnabled(prev => !prev);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notification/');
        setNotifications(response.data);
      } catch (error) {
        console.error('알림 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <NotificationContainer>
      <Header>
        <NotifiTitle>NOTIFICATION</NotifiTitle>
        <ToggleButton isEnabled={isEnabled} toggleNotifications={toggleNotifications} />
      </Header>
      {isEnabled && (
        <>
          {type === 'like' && <NotifiLike {...data} />}
          {type === 'follow' && <NotificationFollow {...data} />}
        </>
      )}
    </NotificationContainer>
  );
};

export default Notification;
