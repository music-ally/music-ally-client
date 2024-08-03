import axios from "axios";
import React from "react";
import styled from "styled-components";
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from "react-router-dom";
import profileimg from "/profileimg.png"


const Card = styled.div`
    //height: 90px;
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

const ProfileImg = styled.img`
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin: 0 15px;
    background-color: white;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 247px;
`;

const Nickname = styled.div`
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    line-height: 35.2px;
    text-align: left;
    color: #F0F0F0;
`;

const Email = styled.div`
    font-family: Inter;
    font-size: 11.73px;
    font-weight: 600;
    text-align: left;
    color: #888888;
`;

const Button = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    width: 103px;

    &:hover {
        opacity: 0.8;
    }

    margin: 0 15px;
`;

const ButtonImage = styled.img<{ src: string }>`
    width: 100%;
    height: 100%;
`;

interface ProfileCardProps {
    profile_image?: string;
    nickname?: string;
    email?: string;
    userId: string;
    is_following: string;
    onFollowStatusChange: (userId: string, isFollowing: string) => void;
}

export default function ProfileCard(
{
    profile_image = '/profileimg.png',
    nickname = '닉네임',
    email = '이메일',
    userId,
    is_following,
    onFollowStatusChange,
} : ProfileCardProps) {
    const navigate = useNavigate();

    const onCardClick = () => {
        if(is_following === '본인') {
            navigate(`/mypage`);
        } else {
            navigate(`/profile/${userId}`);
        }
    };

    const handleFollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
            //const accessToken = Cookies.get("access_token"); // 쿠키에서 access_token 가져오기
            const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기

            if(is_following === '팔로잉'){
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}/follow`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                },
            });
                onFollowStatusChange(userId, '팔로우');

            } else if(is_following === '팔로우'){
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}/follow`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                },
            });
                onFollowStatusChange(userId, '팔로잉');

            } else {
                console.log('본인');
            }
        } catch (error) {
            console.error("Error updating follow status:", error);
        }
    }
    return (
        <Card onClick={onCardClick}>
            <ProfileImg src={profile_image || profileimg}  />
                <Info>
                    <Nickname>{nickname}</Nickname>
                    <Email>{email}</Email>
                </Info>
                {is_following !== '본인' && (
                    <Button onClick={ handleFollowClick }>
                        <ButtonImage 
                            src={is_following === '팔로잉' ? "/following_btn_full.svg" : "/follow_btn.svg"} 
                            alt="Follow Button" />
                    </Button>
                )}
        </Card>
    );
};