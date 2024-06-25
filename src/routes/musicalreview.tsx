import React, { useState } from 'react';
import styled from 'styled-components';

interface Page5Props {}

interface LikeIconProps {
  liked: boolean;
}

const Container = styled.div`
  border-radius: 10px;
  background: linear-gradient(to right, #5c1e19, #3c0d0a); /* 적당히 밝은 색상 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 20.5px 16.4px 14px;
  width: 901px;
  box-sizing: border-box;
`;

const Header = styled.div`
  margin: 0 8.5px 13.4px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 857.9px;
  box-sizing: border-box;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

const Avatar = styled.div`
  box-shadow: 0px 1.8px 3.6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  background: url('/musicalposter-1.jpeg') 50% 50% / cover no-repeat;
  margin: 0 13px 0 0;
  width: 60px;
  height: 60px;
`;

const UserName = styled.div`
  margin: 9px 8px 5px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`;

const UserNameText = styled.span`
  word-break: break-word;
  font-family: 'Abhaya Libre', sans-serif;
  font-weight: bold;
  font-size: 21px;
  letter-spacing: 0.6px;
  line-height: 1.347;
  color: #eaeaea;
`;

const SubInfo = styled.p`
  margin: 0 8.5px 0 0;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 13.4px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: rgba(209, 209, 209, 0.8);
`;

const UserHandle = styled.div`
  margin: 16px 0 28px 0;
  display: inline-block;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: rgba(151, 151, 151, 0.8);
`;

const RatingInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const RatingItem = styled.div`
  margin: 0 5px;
  display: flex;
  align-items: center;
`;

const RatingLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: #d1d1d1; /* RatingLabel의 색상 */
  margin-right: 2px;
`;

const RatingValue = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 1.347;
  color: #f9f9f9; /* RatingValue의 색상 */
`;

const LikeInfo = styled.div`
  margin: 13px 0 3px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const LikeIcon = styled.div<LikeIconProps>`
  margin: 0 0 3.7px 0;
  display: flex;
  width: 27.9px;
  height: 24.3px;
  box-sizing: border-box;
  background: url(${props => (props.liked ? '/heart1.png' : '/heart.png')}) 50% 50% / cover no-repeat;
  transition: background-image 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const LikeCount = styled.span`
  margin: 0 3px;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 1.347;
  color: #d1d1d1;
`;

const CommentSection = styled.div`
  border-radius: 5px;
  background-color: #fffce5;
  position: relative;
  margin: 0 0 0 0.3px;
  display: flex;
  padding: 13.6px 20.8px 14.6px 16.7px;
  box-sizing: border-box;
`;

const CommentText = styled.span`
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.3px;
  line-height: 1.4;
  color: #303030;
`;

const Page5: React.FC<Page5Props> = () => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(prevLiked => !prevLiked);
  };

  return (
    <Container>
      <Header>
        <UserInfo>
          <Avatar />
          <UserName>
            <UserNameText>현생팔아뮤덕살기</UserNameText>
            <SubInfo>
              <span className="n-1-sub-0"></span>
              <span className="n-1-sub-6"></span>
              <span className="n-1-sub-0"></span>
              <span className="n-1-sub-7"></span>
              <span className="n-1-sub-0"></span>
              <span></span>
            </SubInfo>
            <RatingInfo>
              <RatingItem>
                <RatingLabel>공포</RatingLabel>
                <RatingValue>3</RatingValue>
              </RatingItem>
              <RatingItem>
                <RatingLabel>선정성</RatingLabel>
                <RatingValue>4</RatingValue>
              </RatingItem>
              <RatingItem>
                <RatingLabel>폭력성</RatingLabel>
                <RatingValue>2</RatingValue>
              </RatingItem>
            </RatingInfo>
          </UserName>
          <UserHandle>mu******</UserHandle>
        </UserInfo>
        <LikeInfo>
          <LikeIcon liked={liked} onClick={handleLikeClick} />
          <LikeCount>125</LikeCount>
        </LikeInfo>
      </Header>
      <CommentSection>
        <CommentText>
          승식 세준 배우님 공연을 수차례 봤지만 이 날 신은 왜 넘버는 역대급이라 말할 수 있습니다 ㅜㅜ두 분 이런 퀄리티의 공연을 완성하기까지 얼마나 피나는 노력을 했을지 눈에 선하고 원래 그룹 활동을 함께하셔서 그런지 각자 다른 배우님들과 호흡을 맞출 때와는 또 다른 .. 그런 애틋함이 느껴졌던거 같아요 이퀄 만약 또 기회가 된다면 승식 배우님의 니콜라도 궁금하네요 ,, 세준 배우님 승식 배우님 고생했어요 !!
        </CommentText>
      </CommentSection>
    </Container>
  );
};

export default Page5;
