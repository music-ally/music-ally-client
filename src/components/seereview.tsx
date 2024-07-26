import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Page34Props {}

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

const LikeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-left: 33px; /* 오른쪽 끝에서의 위치 조정 */
  position: relative;
`;

const LikeIcon = styled.img<{ liked: boolean }>`
  width: 41px;
  height: 38px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  margin-top: 22px; /* 아래로 22px 이동 */
  margin-left: -5px; /* 왼쪽으로 5px 이동 */
  
  ${props =>
    props.liked &&
    `
    transform: scale(1.1);
  `}
`;

const LikeCount = styled.span`
  margin-top: 5px;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.5px;
  line-height: 1.5;
  color: #fffce5;
`;

const Warning = styled.div`
  font-family: 'Bebas', sans-serif;
  font-size: 32px;
  color: #D3C187; /* 글자색 설정 */
  margin-top: -18px; /* 태그와의 간격 설정 */
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

const Page34: React.FC<Page34Props> = () => {
  const [ratings, setRatings] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]); // 별점 상태 배열

  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수
  const [comment, setComment] = useState(''); // 댓글 상태

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleLikeClick = () => {
    setLiked(prevLiked => !prevLiked);
    setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));
  };

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

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <UserInfo>
            <Avatar />
            <UserNameHandleWrapper>
              <UserNameText>현생팔아뮤덕살기</UserNameText>
              <UserHandle>mu******</UserHandle>
            </UserNameHandleWrapper>
          </UserInfo>
          <LikeInfo>
            <LikeIcon
              src={liked ? '/heart1.png' : '/heart.png'}
              liked={liked}
              onClick={handleLikeClick}
            />
            <LikeCount>{likeCount}</LikeCount>
          </LikeInfo>
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

export default Page34;
