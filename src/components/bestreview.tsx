import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가

// 스타일 정의
const Container = styled.div`
  border-radius: 15.6px;
  background: url('/bestreview.png');
  display: flex;
  flex-direction: row;
  padding: 16px 20px 15px 20px;
  width: 1131px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  cursor: pointer; /* 클릭 가능하게 만들기 위해 추가 */
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const DateText = styled.div`
  margin: 0 4px 2px 4px;
  align-self: flex-end;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: #6e6e6e;
`;

const Header = styled.div`
  margin: 0 4.1px 16px 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 891.9px;
  box-sizing: border-box;
`;

const UserInfo = styled.div`
  margin-bottom: 3.4px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

interface AvatarProps {
  image?: string;
}

const Avatar = styled.div<AvatarProps>`
  box-shadow: 0px 2px 4.1px rgba(0, 0, 0, 0.25);
  border-radius: 27.3px;
  background: ${props => (props.image ? `url(${props.image})` : 'url(/profileimg.png)')} 50% 50% / cover no-repeat;
  margin-right: 8.7px;
  width: 54.6px;
  height: 54.6px;
`;

const UserNameHandleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 9.8px 12.1px 10.8px 0;
  word-break: break-word;
`;

const UserNameText = styled.div`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 25.2px;
  letter-spacing: 0.8px;
  line-height: 1.347;
  color: #d5d3c1;
  margin-right: 8px;
`;

const UserHandle = styled.div`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 15.3px;
  letter-spacing: 0.5px;
  line-height: 1.347;
  color: #c0c0c0;
`;

const LikeInfo = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const LikeIcon = styled.img<{ liked: boolean }>`
  width: 27.9px;
  height: 24.3px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  ${props =>
    props.liked &&
    `
    transform: scale(1.1);
  `}
`;

const LikeCount = styled.span`
  margin: 0 3px;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 1.347;
  color: #fffce5;
`;

const TagsWrapper = styled.div`
  margin: 0 4px 21px 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 649.6px;
  box-sizing: border-box;
`;

const TagGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const TagLabel = styled.span`
  margin-right: 11.4px;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: medium;
  font-size: 18.8px;
  letter-spacing: 0.6px;
  line-height: 1.347;
  color: #e5ddab;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  gap: 10px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const CommentSection = styled.div`
  border-radius: 5px;
  background-color: #e8e5d2;
  display: flex;
  padding: 13.5px 21.6px 15.5px 17px;
  width: 900px;
  height: 105px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

const CommentText = styled.span<{ isExpanded: boolean }>`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: #444444;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => (props.isExpanded ? 'unset' : '4')};
  -webkit-box-orient: vertical;
`;

const ImageWrapper = styled.div<{ imageUrl: string }>`
  border-radius: 4.4px;
  background: url(${props => props.imageUrl}) 50% 50% / cover no-repeat;
  margin-right: 18.5px;
  width: 172.5px;
  height: 244px;
`;

interface Review {
  review_id: string;
  reviewer_profile_image?: string;
  reviewer_nickname: string;
  reviewer_email: string;
  create_at: string;
  like_num: number;
  is_like: boolean;
  fear: number;
  sensitivity: number;
  violence: number;
  content: string;
  poster_image?: string; // 포스터 이미지 추가
}

interface BestReviewProps {
  review?: Review; // review를 옵셔널로 설정
}

const BestReview: React.FC<BestReviewProps> = ({ review = {} as Review }) => {
  const [liked, setLiked] = React.useState(review.is_like || false);
  const [likeCount, setLikeCount] = React.useState(review.like_num || 0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const navigate = useNavigate(); // useNavigate 훅 추가

  const addLike = async (reviewId: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/review/${reviewId}/like`);
      if (response.status !== 200) {
        throw new Error('Failed to add like');
      }
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  const removeLike = async (reviewId: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/review/${reviewId}/like`);
      if (response.status !== 200) {
        throw new Error('Failed to remove like');
      }
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await removeLike(review.review_id);
        setLikeCount(prev => prev - 1);
      } else {
        await addLike(review.review_id);
        setLikeCount(prev => prev + 1);
      }
      setLiked(prev => !prev);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const toggleExpandText = () => {
    setIsExpanded(prev => !prev);
  };

  // 리뷰 상세 페이지로 이동하는 핸들러
  const handleReviewClick = () => {
    navigate(`/see-review/${review.review_id}`);
  };

  return (
    <Container onClick={handleReviewClick}> {/* 클릭 시 상세 페이지로 이동 */}
      <ImageWrapper imageUrl={review.poster_image || '/default-poster.png'} /> {/* 포스터 이미지 적용 */}
      <Content>
        <DateText>{new Date(review.create_at).toLocaleDateString()} {new Date(review.create_at).toLocaleTimeString()}</DateText>
        <Header>
          <UserInfo>
            <Avatar image={review.reviewer_profile_image} />
            <UserNameHandleWrapper>
              <UserNameText>{review.reviewer_nickname}</UserNameText>
              <UserHandle>{review.reviewer_email}</UserHandle>
            </UserNameHandleWrapper>
          </UserInfo>
          <LikeInfo>
            <LikeIcon
              src={liked ? '/heart1.png' : '/heart.png'}
              liked={liked}
              onClick={e => { e.stopPropagation(); handleLikeClick(); }} // 클릭 이벤트 버블링 방지
            />
            <LikeCount>{likeCount}</LikeCount>
          </LikeInfo>
        </Header>
        <TagsWrapper>
          <TagGroup>
            <TagLabel>공포</TagLabel>
            <IconWrapper>
              {Array.from({ length: 5 }, (_, index) => (
                <Icon
                  key={index}
                  src={index < review.fear ? '/fear1.png' : '/fear2.png'}
                  onClick={() => {}}
                  onDoubleClick={() => {}}
                />
              ))}
            </IconWrapper>
          </TagGroup>
          <TagGroup>
            <TagLabel>선정성</TagLabel>
            <IconWrapper>
              {Array.from({ length: 5 }, (_, index) => (
                <Icon
                  key={index}
                  src={index < review.sensitivity ? '/sensationalism1.png' : '/sensationalism2.png'}
                  onClick={() => {}}
                  onDoubleClick={() => {}}
                />
              ))}
            </IconWrapper>
          </TagGroup>
          <TagGroup>
            <TagLabel>폭력성</TagLabel>
            <IconWrapper>
              {Array.from({ length: 5 }, (_, index) => (
                <Icon
                  key={index}
                  src={index < review.violence ? '/violence1.png' : '/violence2.png'}
                  onClick={() => {}}
                  onDoubleClick={() => {}}
                />
              ))}
            </IconWrapper>
          </TagGroup>
        </TagsWrapper>
        <CommentSection>
          <CommentText isExpanded={isExpanded} onClick={toggleExpandText}>
            {review.content}
          </CommentText>
        </CommentSection>
      </Content>
    </Container>
  );
};

export default BestReview;
