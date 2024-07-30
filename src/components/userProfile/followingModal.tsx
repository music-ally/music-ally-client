import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileCard from "../profileCard";

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
    flex-direction: column;
    //justify-content: center;
    //background-color: aliceblue;
    background: #212121;
    z-index: 1000;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* 세로 스크롤 활성화 */
    max-height: calc(100% - 60px); /* Divider와 Header를 고려한 최대 높이 */
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

    /* 스크롤할 때만 스크롤바를 보이도록 설정 */
    &:hover {
        &::-webkit-scrollbar {
            width: 8px; /* 스크롤바가 나타날 때 너비 */
        }
    }

    /* 스크롤하지 않을 때 스크롤바 숨기기 */
    &:not(:hover) {
        &::-webkit-scrollbar {
            width: 0; /* 스크롤바가 숨겨질 때 너비 */
        }
    }
`;


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
    width: 100%;
    height: 1.5px;
    background-color: #707070;
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 가운데 정렬 */
`

const LoadingContainer = styled.div`
    /* 로딩 메시지 스타일 추가 */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
`;

interface Following {
    user_id: string; // 실제 타입에 맞게 수정
    nickname: string;
    email: string;
    is_following: string; // '팔로잉' 또는 '팔로우'와 같은 문자열
}

interface FollowingModalProps {
    onClose: () => void;
    userId: string;
}

export default function FollowingModal ({userId, onClose} : FollowingModalProps) {
    const [followings, setFollowings] = useState<Following[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // api 호출
        const fetchFollowings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}/following`);
                setFollowings(response.data.follow_list);
            } catch (error) {
                console.error("Error fetching followings: ", error);
            }
            // finally {
            //     setLoading(false);
            // }
        };
        fetchFollowings();

        // 배경스크롤 금지
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [userId]);
      
    return(
        <Overlay onClick={onClose}>
            <Modal>
                <Header>
                    <Title>팔로잉</Title>
                    <CloseButton onClick={onClose}>
                        <img src="/x_icon.svg"/>
                    </CloseButton>
                </Header>
                <Divider />
                <ModalContent>
                    <ProfileCard />
                    {loading ? (
                        <LoadingContainer>Loading...</LoadingContainer>
                    ):(
                        followings && followings.map((following) => (
                            <ProfileCard
                                key={following.user_id}
                                // profileImage=""
                                nickname={following.nickname}
                                email={following.email}
                                is_following={following.is_following}
                                onFollowStatusChange={(userId, isFollowing) => {
                                    // 팔로우 상태 변경 로직
                                    const updatedFollowers = followings.map((f) => 
                                        f.user_id === userId ? { ...f, is_following: isFollowing } : f // isFollowing을 직접 사용
                                    );
                                    setFollowings(updatedFollowers);
                                }}
                            />
                        ))
                    )}
                </ModalContent>
            </Modal>
        </Overlay>
    )
}