import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createGlobalStyle, styled } from "styled-components";
import profileimg from "/profileimg.png"
import axios from "axios";
import LeaveModal from "../components/leaveModal";
import MyFollowingModal from "../components/myProfile/myFollowingModal";
import MyFollowerModal from "../components/myProfile/myFollowerModal";
import ReviewCaroTest from "../components/myProfile/myReviewCaroTest";
import MyReviewCaro from "../components/myProfile/myReviewCaro";
import MyBookmarkCaro from "../components/myProfile/myBookmarkCaro";
import Cookies from 'js-cookie'

const GlobalStyle = createGlobalStyle`
  font-family: 'Inter';
`;

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

const Row1 = styled.div`
    display: flex;
    flex-direction: row;
`

// 로그인 경로 이미지
const Path = styled.img`
    height: 20px;
    background-color: white;
    margin: 5px;
    border-radius: 4px;
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
    margin: 15px 0;
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
    signup_method: string;
    profile_image: string | null;
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
        signup_method: '이메일',
        profile_image: '/profileimg.png',
    });
    const [profile, setProfile] = useState<string>(profileimg);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = Cookies.get("access_token"); // 쿠키에서 access_token 가져오기
                //const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/myPage`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                    },
                });
                setUser(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error("Fetch data error : ", error);
            }
        };
        fetchData();
    }, []);

    let iconPath = '';
    switch (user.signup_method) {
        case '구글':
            iconPath = '/google-logo.svg';
            break;
        case '카카오':
            iconPath = '/kakaotalk-logo.svg';
            break;
        default:
            iconPath = '/email-icon.svg';
            break;
    }

    const onNavClick = () => {
        navigate('/mypage/edit');
    };

    const handleLogout = async () => {
        try {
            //const accessToken = Cookies.get("access_token"); // 쿠키에서 access_token 가져오기
            const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                },
            });
            //Cookies.remove("access_token");
            //Cookies.remove("refresh_token");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 실패: ', error);
        }
    };

    const handleLeave = async () => {
        try {
            //const accessToken = Cookies.get("access_token"); // 쿠키에서 access_token 가져오기
            const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/auth/leave`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                },
            });
            alert(`${user.nickname} 님 탈퇴가 완료되었습니다.`)
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
        window.location.reload(); // 모달창에서 팔로우 클릭하면 새로고침하여 프로필 화면에서 팔로잉 수 바뀌도록
    };

    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <PropfileWrapper>
                <ProfileImageWrapper>
                    <ProfileImage src={ user.profile_image || profileimg }/>
                </ProfileImageWrapper>
                <ProfileInfoWrapper>
                <Nickname> {user.nickname || '닉네임'} </Nickname>
                    <Row1>
                        {iconPath ? (
                            <Path src={iconPath} alt={`${user.signup_method} 아이콘`} />
                        ) : (
                            <Path src="/email-icon.svg" /> // path 존재하면 해당 아이콘, 아니면 이메일
                        )}
                        <Email> {user.email || 'email@email.com'}</Email>
                    </Row1>
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
            <MyReviewCaro reviews={user.reviews?.reviews || [{review_id: '66a0e7348da2278779d22aba', poster_image: '/poster_basic.png'}, {}, {}]} />

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
        </>
    );
}