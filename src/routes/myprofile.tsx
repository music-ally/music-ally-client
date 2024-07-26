import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import profileimg from "/profileimg.png"
import axios from "axios";
import LeaveModal from "../components/leaveModal";
import MyFollowingModal from "../components/myFollowingModal";
import MyFollowerModal from "../components/myFollowerModal";
import ReviewCaroTest from "../components/myReviewCaroTest";
import MyReviewCaro from "../components/myReviewCaro";
import MyBookmarkCaro from "../components/myBookmarkCaro";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-bottom: 30px;
`

const PropfileWrapper = styled.div`
    height: 500px;
    //background-color: lightslategray;
    display: flex;
`
const ProfileImageWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ProfileInfoWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    //align-items: center;
    flex-direction: column;
`

const BtnWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    //align-items: center;
    flex-direction: column;
`

const NavBtn = styled.button`
    background: url(/arrow_right.png) no-repeat;
    height: 32px;
    background-size: contain;
    border: none;
    cursor: pointer;

    &:hover {
            opacity: 0.8;
    };
`


const ProfileImage = styled.img`
    width: 272px;
    height: 272px;
    border-radius: 50%;
    object-fit: cover;
`;

const Nickname = styled.h3`
    font-size: 34px;
    margin: 5px 0;
`

const Email = styled.h3`
    font-size: 20px;
    color: #BABABA;
`

const MyInfo = styled.div`
    font-size: 24px;
    font-weight: 600;
    display: flex;
    flex-direction: row;
`

const MyInfoName = styled.div`
    color: #BABABA;
    margin-right: 10px;
`

const MyInfoNum = styled.div`
    color: white;
    margin-right: 20px;
`

const CaroName = styled.div`
    font-family: 'Inter-SemiBold', sans-serif;
    font-weight: 600;
    font-size: 30px;
    margin: 20px 64px;
`

const DividerText = styled.span`
    display: inline-block; /* 블록 요소로 설정하여 가로 크기를 설정할 수 있게 함 */
    margin: 35px 10px; /* 좌우 마진 추가 */
    color: white;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        opacity: 0.8; /* 호버 시 약간 투명하게 */
    }
`

const Row = styled.div`
    display: flex;
    margin: 10px 0;
    justify-content: space-evenly;
`

const ModalWrapper = styled.div`
    cursor: pointer;
    margin: 0%;
    display: flex;
`

interface User {
    nickname: string;
    email: string;
    following_num: number;
    follower_num: number;
    review_num: number;
    bookmark_num: number;
    reviews: {
        reviews: Array<{
            review_id: string;
            poster_image: string;
        }>;
    };
    bookmarks: {
        musicals: Array<{
            musical_id: string;
            poster_image: string;
        }>;
    };
}

export default function MyPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        nickname: '닉네임',
        email: 'email',
        following_num: 0,
        follower_num: 0,
        review_num: 0,
        bookmark_num: 0,
        reviews: { 
            reviews: [
                { review_id: 'defaultReview_id', poster_image: '/empty.png' }
            ] 
        }, // 리뷰 초기값 추가
        bookmarks: { 
            musicals: [
                { musical_id: 'defaultBookmark_id', poster_image: '/empty.png' }
            ] 
        },
    });
    const [profile, setProfile] = useState<string>(profileimg);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/myPage`);
                setUser(response.data);
            } catch (error) {
                console.error("Fetch data error : ", error);
            }
        };
        fetchData();
    }, []);
/*
    // {userData.nickname} 등으로 불러오기~~
 */ 

    const onNavClick = () => {
        navigate('/mypage/edit');
    }

    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`);
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 실패: ', error);
        }
    };

    const handleLeave = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/auth/leave`);
            navigate('/login');
        } catch (error) {
            console.error('탈퇴 실패: ', error);
        }
    }

    const [followModal, setFollowModal] = useState<string|null>();

    const handleModalOpen = (content: string) => {
        setFollowModal(content);
    };

    const handleModalClose = () => {
        setFollowModal(null);
      };

    return (
        <Wrapper>
            <PropfileWrapper>
                <ProfileImageWrapper>
                    <ProfileImage src={ profileimg }/>
                </ProfileImageWrapper>
                <ProfileInfoWrapper>
                <Nickname> {user.nickname || '닉네임'} </Nickname>
                    <Email> {user.email || 'email@email.com'}</Email>
                    <MyInfo>
                        <ModalWrapper onClick={() => handleModalOpen('following')}>
                            <MyInfoName>팔로잉</MyInfoName>
                            <MyInfoNum>{user.following_num || '0'}</MyInfoNum>
                        </ModalWrapper>
                        <ModalWrapper onClick={() => handleModalOpen('follower')}>
                            <MyInfoName>팔로워</MyInfoName>
                            <MyInfoNum> {user.follower_num || '0'}</MyInfoNum>
                        </ModalWrapper>
                        {followModal === 'follower' && (
                            <MyFollowerModal onClose={handleModalClose} />
                        )}
                        {followModal === 'following' && (
                            <MyFollowingModal onClose={handleModalClose} />
                        )}

                        <MyInfoName>|</MyInfoName>
                        <MyInfoName>리뷰</MyInfoName>
                        <MyInfoNum>{user.review_num || '0'}</MyInfoNum>
                        <MyInfoName>찜</MyInfoName>
                        <MyInfoNum>{user.bookmark_num || '0'}</MyInfoNum>
                    </MyInfo>
                </ProfileInfoWrapper>
                <BtnWrapper>
                    <NavBtn onClick={onNavClick}/>
                </BtnWrapper>
            </PropfileWrapper>
            <CaroName> 내가 작성한 리뷰 </CaroName>
            <MyReviewCaro reviews={user.reviews?.reviews || [{review_id: '66a0e7348da2278779d22aba', poster_image: '/poster_basic.png'}]} />

            <CaroName> 내가 찜한 뮤지컬 </CaroName>
            {/* <ReviewCaroTest /> */}
            <MyBookmarkCaro musicals={user.bookmarks?.musicals || [{musical_id: '', poster_image: '/poster_basic.png'}, {},]}/>
            <Row>
                <DividerText onClick={ handleLogout }>로그아웃</DividerText>
                <DividerText onClick={() => setIsModalOpen(true)}>뮤지컬리 탈퇴하기</DividerText>
                {isModalOpen && (
                    <LeaveModal 
                        onConfirm = {handleLeave}
                        onCancel = {() => setIsModalOpen(false)}
                        
                    />
                )}
            </Row>
            
        </Wrapper>
    );
}