import styled from "styled-components";
import profileimg from "../assets/profileimg.png"
import { useState } from "react";

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    z-index: 1000;
`

const ModalContent = styled.div`
    width: 536px;
    display: flex;
    flex-direction: column;
`

const ProfileImage = styled.img`
    width: 185px;
    height: 185px;
    border-radius: 50%;
    object-fit: cover;
    align-self: center;
`;

const Nickname = styled.div`
    align-self: center;
    font-size: 24px;
    font-weight: 600;
    margin: 30px 0;
`

const Info1 = styled.div`
    align-self: self-start;
    font-size: 16px;
    font-weight: 600;
`

const Info2 = styled.div`
    align-self: self-start;
    font-size: 12px;
    font-weight: 600;
    color: #989898;
    margin-top: 10px;
`

const ChekboxContainer = styled.div`
    align-self: self-end;
    display: flex;
    margin: 10px 0;
`

const Checkbox = styled.input`
    height: 17px;
`

const CheckText = styled.div`
    font-size: 12px;
    margin: 0;
`

const BtnContainer = styled.div`
    align-self: self-end;
    display: flex;
    margin: 0;
    width: 189px;
    justify-content: space-between
`

const Button = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    &:hover {
            opacity: 0.8;
    };

    &:disabled {
        cursor: default;
        opacity: 1;
    };
`

const ButtonImage = styled.img`
    width: 100%;
    height: 100%;
    //border-radius: 12.99px;
`;

interface LeaveModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function LeaveModal({ onConfirm, onCancel } : LeaveModalProps) {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    } 
    
    return(
        <Modal>
            <ModalContent>
                <ProfileImage src={profileimg}/>
                <Nickname>닉네임님, 뮤지컬리를 탈퇴하시겠습니까? </Nickname>
                <Info1>계정을 탈퇴하면 </Info1>
                <Info2>- 더 이상 현재 계정으로 로그인 할 수 없습니다.</Info2>
                <Info2>- 최대 5년간 기록물이 보관됩니다.</Info2>
                <ChekboxContainer>
                    <Checkbox 
                        type="checkbox"
                        checked= {isChecked}
                        onChange={handleCheckbox}
                    />
                    <CheckText>동의 후 탈퇴합니다.</CheckText>
                </ChekboxContainer>
                
                <BtnContainer>
                    <Button onClick={onConfirm} disabled={!isChecked}>
                        <ButtonImage src="/btn_yes.svg" />
                    </Button>
                    <Button onClick={onCancel}>
                        <ButtonImage src="/btn_no.svg"/>
                    </Button>
                </BtnContainer>
            </ModalContent>
        </Modal>
    )
}