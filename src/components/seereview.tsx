import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 15.6px;
  background: linear-gradient(to right, #5c1e19, #3c0d0a);
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  width: 1092px;
  box-sizing: border-box;
  color: #f2f2f2;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div<{ src: string | null }>`
  background: ${({ src }) => src ? `url(${src})` : 'url(/default-avatar.png)'} 50% 50% / cover no-repeat;
  width: 54.6px;
  height: 54.6px;
  border-radius: 27.3px;
  margin-right: 8.7px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 28px;
  color: #f2f2f2;
`;

const UserEmail = styled.div`
  font-size: 15.3px;
  color: #c0c0c0;
`;

const LikeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikeIcon = styled.img<{ liked: boolean }>`
  width: 41px;
  height: 38px;
  cursor: pointer;
  transform: ${props => props.liked ? 'scale(1.1)' : 'scale(1)'};
`;

const LikeCount = styled.span`
  font-size: 20px;
  color: #fffce5;
`;

const TagsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TagGroup = styled.div`
  display: flex;
  align-items: center;
`;

const TagLabel = styled.span`
  margin-right: 11.4px;
  font-size: 18.8px;
  color: #e5ddab;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const CommentSection = styled.div`
  background-color: #e8e5d2;
  padding: 13.5px 21.6px;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #444444;
`;

interface SeeReviewProps {
  reviewId: string;
  reviewerProfileImage: string | null;
  reviewerNickname: string;
  reviewerEmail: string;
  likeNum: number;
  isLike: boolean;
  violence: number;
  fear: number;
  sensitivity: number;
  content: string;
}

const SeeReview: React.FC<SeeReviewProps> = ({
  reviewId,
  reviewerProfileImage,
  reviewerNickname,
  reviewerEmail,
  likeNum,
  isLike,
  violence,
  fear,
  sensitivity,
  content
}) => {
  const [likeCount, setLikeCount] = useState(likeNum);
  const [liked, setLiked] = useState(isLike);

  useEffect(() => {
    // 초기 상태 설정
    setLikeCount(likeNum);
    setLiked(isLike);
  }, [likeNum, isLike]);

  const handleLikeClick = () => {
    const url = `/api/review/${reviewId}/like`;
    const method = liked ? 'DELETE' : 'POST'; 

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        setLiked(!liked);
        setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
      } else {
        throw new Error('Failed to update like status');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <Container>
      <Header>
        <UserInfo>
          <Avatar src={reviewerProfileImage} />
          <div>
            <UserName>{reviewerNickname}</UserName>
            <UserEmail>{reviewerEmail}</UserEmail>
          </div>
        </UserInfo>
        <LikeInfo>
          <LikeIcon src={liked ? '/liked-icon.png' : '/unliked-icon.png'} liked={liked} onClick={handleLikeClick} />
          <LikeCount>{likeCount}</LikeCount>
        </LikeInfo>
      </Header>
      <TagsWrapper>
        <TagGroup>
          <TagLabel>Violence:</TagLabel>
          <Icon src="/violence-icon.png" />
          <span>{violence}</span>
        </TagGroup>
        <TagGroup>
          <TagLabel>Fear:</TagLabel>
          <Icon src="/fear-icon.png" />
          <span>{fear}</span>
        </TagGroup>
        <TagGroup>
          <TagLabel>Sensitivity:</TagLabel>
          <Icon src="/sensitivity-icon.png" />
          <span>{sensitivity}</span>
        </TagGroup>
      </TagsWrapper>
      <CommentSection>
        <CommentText>{content}</CommentText>
      </CommentSection>
    </Container>
  );
};

export default SeeReview;
