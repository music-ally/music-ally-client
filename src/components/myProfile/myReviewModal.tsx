import { useEffect, useState } from "react";
import styled from "styled-components";
import Poster from "/poster_basic.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.div`
    position: relative;
    width: 712px;
    height: 90vh;
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

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const PosterImg = styled.img`
    width: 100%;
    height: 1012.64px;
    background-size: cover;
    background-position: center;
    border-radius: 0 0 20px 20px;
`;

const Review = styled.div`
    margin: 40px 48px 0 48px;
`;

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
`;

const Icon = styled.img`
    width: 19px;
    height: 19px;
`;

const Fear = styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
`;

const FearIcons: React.FC<{ count: number }> = ({ count }) => {
    const totalIcons = 5;
    const fullIconsCount = count;
    const emptyIconsCount = totalIcons - count;

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
`;

const SensitivityIcons: React.FC<{ count: number }> = ({ count }) => {
    const totalIcons = 5;
    const fullIconsCount = count;
    const emptyIconsCount = totalIcons - count;

    return (
        <>
            {Array.from({ length: fullIconsCount }, (_, index) => (
                <Icon key={`sensitivity-full-${index}`} src="/sensitivity_full.svg" alt="sensitivity full" />
            ))}
            {Array.from({ length: emptyIconsCount }, (_, index) => (
                <Icon key={`sensitivity-empty-${index}`} src="/sensitivity_empty.svg" alt="sensitivity empty" />
            ))}
        </>
    );
};

const Violence = styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
`;

const ViolenceIcons: React.FC<{ count: number }> = ({ count }) => {
    const totalIcons = 5;
    const fullIconsCount = count;
    const emptyIconsCount = totalIcons - count;

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
`;

const Button = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 30px 0;
    justify-content: space-evenly;
`;

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

interface ReviewData {
    review_id: string,
    poster_image: string,
    musical_name: string,
    fear: number,
    sensitivity: number,
    violence: number,
    content: string,
}

export default function MyReviewModal({ reviewId, onClose }: ReviewModalProps) {
    const [reviews, setReviews] = useState<ReviewData>({
        review_id: "66a0e7348da2278779d22aba",
        poster_image: Poster,
        musical_name: "Musical One",
        fear: 2,
        sensitivity: 2,
        violence: 2,
        content: "리뷰 내용입니다",
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/myPage/review/${reviewId}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setReviews(response.data.data);
            } catch (error) {
                console.error("내 리뷰 모달창 불러오기 Error : ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [reviewId]);

    if (loading) {
        return (
            <Overlay onClick={onClose}>
                <Modal onClick={(e) => e.stopPropagation()}>
                    <LoadingContainer>Loading...</LoadingContainer>
                </Modal>
            </Overlay>
        );
    }

    const onModify = async () => {
        // 리뷰 수정 페이지로 이동.
        // reviewId 가져가기
        navigate(`/fix-review/${reviewId}`);
        onClose();
    }

    const onDelete = async () => {
        const confirmDelete = window.confirm(`${reviews.musical_name || 'Musical One'} 리뷰를 삭제하시겠습니까?`);
        if (confirmDelete) {
            try {
                const accessToken = localStorage.getItem("access_token");
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/myPage/review/${reviewId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                alert(`${reviews.musical_name || 'Musical One'} 리뷰 삭제가 완료되었습니다`);
                onClose();
                window.location.reload();
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('리뷰 삭제에 실패했습니다.');
            }
        }
    };

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <ModalContent>
                    {reviews && reviews.review_id === reviewId && (
                        <div key={reviews.review_id || '66a0e7348da2278779d22aba'}>
                            <PosterImg src={reviews.poster_image || Poster} alt={reviews.musical_name || 'Musical One'} />
                            <Review>
                                <Title>{reviews.musical_name || 'Musical One'}</Title>
                                <Stars>
                                    <Fear>
                                        공포
                                        <FearIcons count={reviews.fear || 2} />
                                    </Fear>
                                    <Sensitivity>
                                        선정성
                                        <SensitivityIcons count={reviews.sensitivity || 2} />
                                    </Sensitivity>
                                    <Violence>
                                        폭력성
                                        <ViolenceIcons count={reviews.violence || 2} />
                                    </Violence>
                                </Stars>
                                <Contents>{reviews.content || '초기 리뷰 내용입니다.'}</Contents>
                            </Review>
                        </div>
                    )}
                    <Button>
                        <DeleteButton onClick={onModify}>
                            <img src="/Modify_btn.svg" />
                        </DeleteButton>
                        <DeleteButton onClick={onDelete}>
                            <img src="/Delete_btn.svg" />
                        </DeleteButton>
                    </Button>
                </ModalContent>
            </Modal>
        </Overlay>
    );
}
