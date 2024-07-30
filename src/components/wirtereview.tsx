import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface WriteReviewProps {
  onChange: (fear: number, sensitivity: number, violence: number, content: string) => void;
  userName: string;
  userHandle: string;
}

// 스타일 정의
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

const Avatar = styled.div`
  box-shadow: 0px 2px 4.1px rgba(0, 0, 0, 0.25);
  border-radius: 27.3px;
  background: url('/musicalposter-1.jpeg') 50% 50% / cover no-repeat;
  margin-right: 8.7px;
  width: 54.6px;
  height: 54.6px;
`;

const UserNameHandleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  word-break: break-word;
`;

const UserNameText = styled.div`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 0.8px;
  line-height: 1.347;
  color: #F2F2F2;
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

const Warning = styled.div`
  font-family: 'Bebas', sans-serif;
  font-size: 32px;
  color: #D3C187; /* 글자색 설정 */
  margin-top: 0px; /* 태그와의 간격 설정 */
  margin-bottom: 10px; /* 태그와의 간격 설정 */
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
            <Avatar/>
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
