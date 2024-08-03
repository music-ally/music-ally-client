import React from "react";
import styled from "styled-components";
import token from "./token";
import Notifion from "../assets/Notifi_on.svg";
import Notifioff from "../assets/Notifi_off.svg";

interface ToggleButtonProps {
  isEnabled: boolean;
  toggleNotifications: (enabled: boolean) => void;
}

const Button = styled.button<{ isEnabled: boolean }>`
  background: url(${(props) => (props.isEnabled ? Notifion : Notifioff)})
    no-repeat center/contain;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 10px 0;
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isEnabled,
  toggleNotifications,
}) => {
  const handleToggle = async () => {
    try {
      const response = await token.patch("/notification/onoff", {
        enabled: !isEnabled,
      });

      if (response.status === 200) {
        toggleNotifications(!isEnabled);
      }
    } catch (error) {
      console.error("알림 상태 변경 중 오류 발생:", error);
    }
  };

  return <Button isEnabled={isEnabled} onClick={handleToggle} />;
};

export default ToggleButton;
