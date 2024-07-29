import axios from "axios";
import React from "react";
import styled from "styled-components";

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
    profileImage?: string;
    nickname?: string;
    email?: string;
    userId: string;
    is_following: boolean;
    onFollowStatusChange: (userId: string, isFollowing: boolean) => void;
}

export default function ProfileCard(
{
    profileImage = '/profileimg.png',
    nickname = '닉네임',
    email = '이메일',
    userId,
    is_following,
    onFollowStatusChange,
} : ProfileCardProps) {
    const handleFollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
            if(is_following){
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}/follow`);
                onFollowStatusChange(userId, false);
            } else {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}/follow`);
                onFollowStatusChange(userId, true);
            }
        } catch (error) {
            console.error("Error updating follow status:", error);
        }
    }
    return (
        <Card>
            <ProfileImg src={profileImage}  />
                <Info>
                    <Nickname>{nickname}</Nickname>
                    <Email>{email}</Email>
                </Info>
                <Button onClick={ handleFollowClick }>
                    <ButtonImage src={is_following ? "/following_btn_full.svg" : "/follow_btn.svg"} />
                </Button>
        </Card>
    );
}

// defaultProps 사용
ProfileCard.defaultProps = {
    profileImage: '/profileimg.png',
    nickname: '닉네임',
    email: '이메일',
    is_following: true,
    userId: 'abc',
    onFollowStatusChange: (userId: string, isFollowing: boolean) => {
        console.log(`User ID: ${userId}, Following: ${isFollowing}`);
    },
};
