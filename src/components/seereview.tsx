import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가

// 기본 CSS 스타일
const Container = styled.div`
  border-radius: 15.6px;
  background: linear-gradient(to right, #5c1e19, #3c0d0a);
  display: flex;
  flex-direction: column;
  padding: 16px 20px 15px 20px;
  width: 1092px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Header = styled.div`
  margin: 0 4.1px 16px 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const UserInfo = styled.div`
  margin-bottom: 3.4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const Avatar = styled.div<{ src: string | null; onClick?: () => void }>`
  box-shadow: 0px 2px 4.1px rgba(0, 0, 0, 0.25);
  border-radius: 27.3px;
  background: ${({ src }) => src ? `url(${src})` : 'url(/default-avatar.png)'} 50% 50% / cover no-repeat;
  margin-right: 8.7px;
  width: 54.6px;
  height: 54.6px;
  cursor: pointer; /* 클릭 가능하게 만들기 위해 추가 */
`;

const UserNameHandleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  word-break: break-word;
`;

const UserName = styled.div`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 0.8px;
  line-height: 1.347;
  color: #f2f2f2;
`;

const UserEmail = styled.div`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 15.3px;
  letter-spacing: 0.5px;
  line-height: 1.347;
  color: #c0c0c0;
`;

const Warning = styled.div`
  font-family: 'Bebas', sans-serif;
  font-size: 32px;
  color: #d3c187;
  margin: 0 0 10px 0;
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
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 13.5px 21.6px 15.5px 17px;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  background: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: #444444;
  outline: none;
  overflow-y: hidden;
  min-height: 105px;
  max-height: 400px;
  box-sizing: border-box;
`;

const LikeInfo = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-right: 10px; /* 원하는 만큼 왼쪽 여백 추가 */
`;

const LikeIcon = styled.img<{ liked: boolean }>`
  width: 40px;
  height: 35px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  ${props =>
    props.liked ? 
    `
      transform: scale(1.1);
    ` : 
    `
      transform: scale(1);
    `
  }
`;

const LikeCount = styled.span`
  margin: 0 3px;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 2;
  color: #fffce5;
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
  userId: string;
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
  content,
  userId
}) => {
  const [likeCount, setLikeCount] = useState(likeNum);
  const [liked, setLiked] = useState(isLike);
  const [ratings, setRatings] = useState<boolean[][]>([
    Array(fear).fill(true).concat(Array(5 - fear).fill(false)),
    Array(sensitivity).fill(true).concat(Array(5 - sensitivity).fill(false)),
    Array(violence).fill(true).concat(Array(5 - violence).fill(false))
  ]);
  const [comment, setComment] = useState<string>(content);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const navigate = useNavigate(); // useNavigate 훅 추가

  useEffect(() => {
    setLikeCount(likeNum);
    setLiked(isLike);
  }, [likeNum, isLike]);

  useEffect(() => {
    const newRatings = [
      Array(fear).fill(true).concat(Array(5 - fear).fill(false)),
      Array(sensitivity).fill(true).concat(Array(5 - sensitivity).fill(false)),
      Array(violence).fill(true).concat(Array(5 - violence).fill(false))
    ];
    setRatings(newRatings);
  }, [fear, sensitivity, violence]);

  const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };



  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleIconClick = (type: number, index: number) => {
    // 아이콘 클릭 처리 로직 추가
  };

  const handleIconReset = (type: number, index: number) => {
    // 아이콘 초기화 처리 로직 추가
  };

  const handleAvatarClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 클릭 이벤트 버블링 방지
    navigate(`/profile/${userId}`); // 프로필 페이지로 이동
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <UserInfo>
            <Avatar 
              src={reviewerProfileImage} 
              onClick={handleAvatarClick} // 아바타 클릭 핸들러 추가
            />
            <UserNameHandleWrapper>
              <UserName>{reviewerNickname}</UserName>
              <UserEmail>{reviewerEmail}</UserEmail>
            </UserNameHandleWrapper>
          </UserInfo>
 
        </Header>
        <Warning>TRIGGER WARNING</Warning>
        <TagsWrapper>
          <TagGroup>
            <TagLabel>공포</TagLabel>
            <IconWrapper>
              {ratings[0].map((value, index) => (
                <Icon
                  key={index}
                  src={value ? '/fear1.png' : '/fear2.png'}
                  onClick={() => handleIconClick(0, index)}
                  onDoubleClick={() => handleIconReset(0, index)}
                />
              ))}
            </IconWrapper>
          </TagGroup>
          <TagGroup>
            <TagLabel>선정성</TagLabel>
            <IconWrapper>
              {ratings[1].map((value, index) => (
                <Icon
                  key={index}
                  src={value ? '/sensationalism1.png' : '/sensationalism2.png'}
                  onClick={() => handleIconClick(1, index)}
                  onDoubleClick={() => handleIconReset(1, index)}
                />
              ))}
            </IconWrapper>
          </TagGroup>
          <TagGroup>
            <TagLabel>폭력성</TagLabel>
            <IconWrapper>
              {ratings[2].map((value, index) => (
                <Icon
                  key={index}
                  src={value ? '/violence1.png' : '/violence2.png'}
                  onClick={() => handleIconClick(2, index)}
                  onDoubleClick={() => handleIconReset(2, index)}
                />
              ))}
            </IconWrapper>
          </TagGroup>
        </TagsWrapper>
        <CommentSection>
          <CommentTextArea
            value={comment}
            onChange={handleCommentChange}
          />
        </CommentSection>
      </ContentWrapper>
    </Container>
  );
};

export default SeeReview;
