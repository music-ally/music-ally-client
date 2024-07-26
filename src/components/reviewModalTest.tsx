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

const Icon = styled.img`
    width: 19px;
    height: 19px;
`;

const Fear = styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
`

const FearIcons: React.FC<{ count: number }> = ({ count }) => {
    const totalIcons = 5; // 총 아이콘 수
    const fullIconsCount = count; // _full 아이콘 수
    const emptyIconsCount = totalIcons - count; // _empty 아이콘 수

    return (
        <>
            {Array.from({ length: fullIconsCount }, (_, index) => (
                <Icon key={`fear-full-${index}`} src="/fear_full.svg" alt="fear full" />
            ))}
            {Array.from({ length: emptyIconsCount }, (_, index) => (
                <Icon key={`fear-empty-${index}`} src="/fear_empty.svg" alt="fear empty" />
            ))}
        </>
    );
};

const Sensitivity = styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
`

const SensitivityIcons: React.FC<{ count: number }> = ({ count }) => {
    const totalIcons = 5; // 총 아이콘 수
    const fullIconsCount = count; // _full 아이콘 수
    const emptyIconsCount = totalIcons - count; // _empty 아이콘 수

    return (
        <>
            {Array.from({ length: fullIconsCount }, (_, index) => (
                <Icon key={`fear-full-${index}`} src="/sensitivity_full.svg" alt="violence full" />
            ))}
            {Array.from({ length: emptyIconsCount }, (_, index) => (
                <Icon key={`fear-empty-${index}`} src="/sensitivity_empty.svg" alt="violence empty" />
            ))}
        </>
    );
};

const Violence = styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
`

const ViolenceIcons: React.FC<{ count: number }> = ({ count }) => {
    const totalIcons = 5; // 총 아이콘 수
    const fullIconsCount = count; // _full 아이콘 수
    const emptyIconsCount = totalIcons - count; // _empty 아이콘 수

    return (
        <>
            {Array.from({ length: fullIconsCount }, (_, index) => (
                <Icon key={`violence-full-${index}`} src="/violence_full.svg" alt="violence full" />
            ))}
            {Array.from({ length: emptyIconsCount }, (_, index) => (
                <Icon key={`violence-empty-${index}`} src="/violence_empty.svg" alt="violence empty" />
            ))}
        </>
    );
};


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

const LoadingContainer = styled.div`
    /* 로딩 메시지 스타일 추가 */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
`;


interface ReviewModalProps {
    onClose: () => void;
    reviewId: string;
}

export default function ReviewModalTest({ reviewId, onClose }: ReviewModalProps) {
    const [stars, setStars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API 호출 (여기서는 더미 데이터를 사용)
        const fetchStars = async () => {
            // 더미 데이터
            const dummyStars = [
                {
                    review_id: "66a0e7348da2278779d22aba",
                    poster_image: Poster,
                    musical_name: "Musical One",
                    fear: 2,
                    sensitivity: 2,
                    violence: 2,
                    content: "리뷰 내용입니다",
                },
            ];

            setTimeout(() => {
                setStars(dummyStars);
                setLoading(false);
            }, 500);
        };

        fetchStars();

        // 배경 스크롤 금지
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'auto';
        };
    }, []);

    if (loading) {
        return (
            <Overlay>
                <Modal onClick={(e) => e.stopPropagation()}>
                    <LoadingContainer>Loading...</LoadingContainer>
                </Modal>
            </Overlay>
        ); // 로딩 중일 때 로딩 메시지 표시
    }

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}> {/* 클릭 이벤트 중지로 모달 닫히지 않도록 설정 */}
            
            <ModalContent>
                {stars.map((star) => (
                    <div key={reviewId}>
                        <PosterImg src={star.poster_image} alt={star.musical_name} />
                        <Review>
                            <Title>{star.musical_name}</Title>
                            <Stars>
                                <Fear>
                                    공포
                                    <FearIcons count={star.fear} />
                                </Fear>
                                <Sensitivity>
                                    선정성
                                    <SensitivityIcons count={star.sensitivity} />
                                </Sensitivity>
                                <Violence>
                                    폭력성
                                    <ViolenceIcons count={star.violence} />
                                </Violence>
                            </Stars>
                            <Contents>{star.content}</Contents>
                        </Review>
                </div>
                ))}
                
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
