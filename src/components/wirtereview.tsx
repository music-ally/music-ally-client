import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface WriteReviewProps {
  onChange: (fear: number, sensitivity: number, violence: number, content: string) => void;
  userName: string;
  userHandle: string;
}

// 스타일 정의
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 80%;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserNameHandleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNameText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const UserHandle = styled.span`
  font-size: 14px;
  color: gray;
`;

const Warning = styled.h3`
  font-size: 18px;
  color: red;
  margin-bottom: 20px;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const TagGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TagLabel = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  cursor: pointer;
`;

const CommentSection = styled.div`
  margin-bottom: 20px;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  resize: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const WriteReview: React.FC<WriteReviewProps> = ({ onChange, userName, userHandle }) => {
  const [ratings, setRatings] = useState<boolean[][]>([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]);

  const [comment, setComment] = useState<string>('');
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleIconClick = (tagIndex: number, iconIndex: number) => {
    const newRatings = ratings.map((tag, i) =>
      i === tagIndex
        ? tag.map((value, j) => (j <= iconIndex ? true : false))
        : tag
    );
    setRatings(newRatings);
  };

  const handleIconReset = (tagIndex: number, iconIndex: number) => {
    const newRatings = ratings.map((tag, i) =>
      i === tagIndex
        ? tag.map((value, j) => (j < iconIndex ? true : false))
        : tag
    );
    setRatings(newRatings);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
  }, [comment]);

  // 리뷰 데이터가 변경될 때마다 onChange 호출
  useEffect(() => {
    const fear = ratings[0].filter(Boolean).length;
    const sensitivity = ratings[1].filter(Boolean).length;
    const violence = ratings[2].filter(Boolean).length;
    onChange(fear, sensitivity, violence, comment);
  }, [ratings, comment, onChange]);

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <UserInfo>
            <Avatar src='/profileimg.png' />
            <UserNameHandleWrapper>
              <UserNameText>{userName}</UserNameText>
              <UserHandle>@{userHandle}</UserHandle>
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
                  src={
                    value
                      ? '/sensationalism1.png'
                      : '/sensationalism2.png'
                  }
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
            ref={commentRef}
            value={comment}
            onChange={handleCommentChange}
            placeholder='배우에 대한 직접적인 비방 및 욕설은 지양해주세요.'
          />
        </CommentSection>
      </ContentWrapper>
    </Container>
  );
};

export default WriteReview;
