import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createGlobalStyle, styled } from "styled-components";
import profileimg from "/profileimg.png"
import axios from "axios";
import FollowerModal from "../components/userProfile/followerModal";
import FollowingModal from "../components/userProfile/followingModal";
import UserReviewCaro from "../components/userProfile/userReviewCaro";
import UserBookmarkCaro from "../components/userProfile/userBookmarkCaro";

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

const Button = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    width: 107px;
    &:hover {
            opacity: 0.8;
    };
`

const ButtonImage = styled.img<{ src: string }>`
    width: 100%;
    height: 100%;
    //border-radius: 12.99px;
    src: url(${props => props.src});
    
`;

const ProfileImage = styled.img`
    width: 272px;
    height: 272px;
    border-radius: 50%;
    object-fit: cover;
    background-color: white;
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

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

const ModalWrapper = styled.div`
    cursor: pointer;
    margin: 0%;
    display: flex;
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

interface UserProfile {
    nickname: string;
    email: string;
    following_num: number;
    follower_num: number;
    review_num: number;
    bookmark_num: number;
    profile_image: string | null;
    is_following: string
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

export default function UserProfile() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<UserProfile>({
        nickname: '닉네임',
        email: 'email',
        following_num: 0,
        follower_num: 0,
        review_num: 0,
        bookmark_num: 0,
        profile_image: profileimg,
        is_following: '팔로우',
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                    },
                });
                setUser(response.data.data);
            } catch (error) {
                console.error('Fetching profile error : ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);
    
    const handleFollowClick = async () => {
        try {
            //const accessToken = Cookies.get("access_token"); // 쿠키에서 access_token 가져오기
            const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기
            
            if (user.is_following === '팔로잉') {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}/follow`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                    },
                });

            } else if (user.is_following === '팔로우') {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}/follow`, {}, { 
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                    },
                });

            } else {
                console.log('본인입니다')
            }

            // 화면 상태 업데이트
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${userId}`, { 
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                },
            });
            setUser(response.data.data);
        } catch (error) {
            console.error('follow, unfollow error : ', error);
        }
    }

    const [followModal, setFollowModal] = useState<string|null>();

    const handleModalOpen = (content: string) => {
        setFollowModal(content);
    };

    const handleModalClose = () => {
        setFollowModal(null);
    };

    if (loading) {
        return (
            <LoadingContainer>
                Loading...
            </LoadingContainer>
        );
    }
    
    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <PropfileWrapper>
                <ProfileImageWrapper>
                    <ProfileImage src={ user.profile_image || profileimg }/>
                </ProfileImageWrapper>
                <ProfileInfoWrapper>
                    <Row>
                        <Nickname> {user.nickname || '닉네임'} </Nickname>
                        {user.is_following !== '본인' && (
                            <Button onClick={handleFollowClick}>
                                <ButtonImage src={user.is_following === '팔로잉' ? '/following_btn.svg' : '/follow_btn.svg'}/>
                            </Button>
                        )}
                    </Row>
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

                        {followModal === 'follower' && userId && (
                            <FollowerModal userId={userId} onClose={handleModalClose} />
                        )}
                        {followModal === 'following' && userId && (
                            <FollowingModal userId={userId} onClose={handleModalClose} />
                        )}

                        <MyInfoName>|</MyInfoName>
                        <MyInfoName>리뷰</MyInfoName>
                        <MyInfoNum>{user.review_num || '0'}</MyInfoNum>
                        <MyInfoName>찜</MyInfoName>
                        <MyInfoNum>{user.bookmark_num || '0'}</MyInfoNum>
                    </MyInfo>
                </ProfileInfoWrapper>
                <BtnWrapper>
                    
                </BtnWrapper>
            </PropfileWrapper>
            <CaroName> {user.nickname || '닉네임'}님이 작성한 리뷰 </CaroName>
            <UserReviewCaro reviews={user.reviews?.reviews || [{review_id: '66a0e7348da2278779d22aba', poster_image: '/poster_basic.png'}, {}]} />
            
            <CaroName> {user.nickname || '닉네임'}님이 찜한 뮤지컬 </CaroName>
            <UserBookmarkCaro musicals={user.bookmarks?.musicals || [{musical_id: '', poster_image: '/poster_basic.png'}, {}]}/>
        </Wrapper>
        </>
        
    );
}