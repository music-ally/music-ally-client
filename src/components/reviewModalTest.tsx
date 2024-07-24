import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileCard from "./profileCard";
import Poster from "/poster_basic.png"
import axios from "axios";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex; /* 중앙 정렬을 위해 추가 */
    justify-content: center; /* 중앙 정렬을 위해 추가 */
    align-items: center; /* 중앙 정렬을 위해 추가 */
`;

const Modal = styled.div`
    position: relative; /* 스크롤을 적용하기 위해 relative로 변경 */
    width: 712px;
    height: 90vh; /* 화면의 90% 높이로 설정 */
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    background: #161616;
    z-index: 1000;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto; 
    width: 100%;

    /* 스크롤바 스타일 */
    &::-webkit-scrollbar {
        width: 8px; /* 스크롤바의 너비 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888; /* 스크롤바의 색상 */
        border-radius: 10px; /* 스크롤바의 모서리 둥글기 */
    }

    /* 스크롤바가 보이지 않도록 설정 */
    &::-webkit-scrollbar-track {
        background: transparent; /* 스크롤바 트랙 배경 */
    }

`;

const PosterImg = styled.img`
    width: 100%;
    height: 1012.64px;
    background-size: cover; /* 배경 이미지 크기 조정 */
    background-position: center; /* 배경 이미지 위치 조정 */
    border-radius: 0 0 20px 20px; /* 모달의 아래쪽 모서리 둥글게 설정 */
`

const Review = styled.div`
    margin: 40px 48px 0 48px;
`

const Title = styled.div`
    font-family: Inter;
    font-size: 32px;
    font-weight: 700;
    line-height: 43.1px;
    letter-spacing: 0.05em;
    text-align: left;

`;

const Stars = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    font-size: 17px;
    color: #E5DDAB;
    justify-content: space-evenly;
`

const Fear = styled.div`
    
`

const Sensitivity = styled.div`

`

const Violence = styled.div`
    
`

const Contents = styled.div`
    font-family: Inter;
    font-size: 16px;
    text-align: left;
    color: #D0D0D0;
    margin: 30px 0;

`

const Button = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 30px 0;
    justify-content: space-evenly;
`

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    img {
        width: 30px;
        height: 30px;
    }
`;


interface ReviewModalProps {
    onClose: () => void;
    reviewId: string;
}

export default function ReviewModalTest({ reviewId, onClose }: ReviewModalProps) {
    const [followers, setFollowers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 배경 스크롤 금지
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}> {/* 클릭 이벤트 중지로 모달 닫히지 않도록 설정 */}
            
            <ModalContent>
                <PosterImg src={Poster}/>
                <Review>
                    <Title>몬테크리스토 : 더뮤지컬라이브</Title>
                    <Stars>
                        <Fear>
                            공포
                        </Fear>
                        <Sensitivity>
                            선정성
                        </Sensitivity>
                        <Violence>
                            폭력성
                        </Violence>
                    </Stars>
                    <Contents>
                    나름 꽤 재밌는 뮤지컬이었어요! 다음에도 또 볼 생각 있습니다. 김준현 나온다길래 본건데 고뢔? 김준현이 아니더라고요 동명이인이 많은 연예계는 신기합니다. 카이가 잘생겼더라고요.
                    </Contents>
                </Review>
                <Button>
                    <DeleteButton onClick={onClose}> 
                        <img src="/Modify_btn.svg" />
                    </DeleteButton>
                    <DeleteButton onClick={onClose}> 
                        <img src="/Delete_btn.svg" />
                    </DeleteButton>
                </Button>
            </ModalContent>
            </Modal>
        </Overlay>
    );
}
