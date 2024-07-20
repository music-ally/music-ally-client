import { useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 531px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    //background-color: aliceblue;
    background: #212121;
    z-index: 1000;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* 세로 스크롤 활성화 */
    max-height: 480px; /* 최대 높이 설정 */
    width: 100%; 
`

const Header = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.div`
    //color: black;
    color: #F0F0F0;
    font-size: 24.44px;
    font-weight: 600;
    text-align: center;
    margin: 15px 0;
    padding-left: 200px;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding-left: 164px;
    img {
        width: 100%;
        height: 100%;
    }
`

const Divider = styled.div`
    width: 480px;
    height: 1.5px;
    background-color: #707070;
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 가운데 정렬 */
`

interface FollowingModalProps {
    onClose: () => void;
}

export default function FollowingModal ({onClose} : FollowingModalProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);
      
    return(
        <Overlay onClick={onClose}>
            <Modal>
                <ModalContent>
                    <Header>
                        <Title>팔로잉</Title>
                        <CloseButton onClick={onClose}>
                            <img src="/x_icon.svg"/>
                        </CloseButton>
                    </Header>
                    <Divider />
                </ModalContent>
            </Modal>
        </Overlay>
    )
}