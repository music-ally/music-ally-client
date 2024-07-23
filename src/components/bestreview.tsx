import React, { useState } from 'react';
import styled from 'styled-components';

// Define styles
const Container = styled.div`
  border-radius: 15.6px;
  background: url('/bestreview.png');
  display: flex;
  flex-direction: row;
  padding: 16px 20px 15px 20px;
  width: 1131px;
  box-sizing: border-box;
  position: relative; /* Add position relative for buttons */
  overflow: hidden; /* Hide overflow to manage carousel */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  transition: transform 0.3s ease-in-out; /* Smooth sliding effect */
  transform: translateX(${props => props.translate}px); /* Apply translation based on state */
  width: ${props => props.width}px; /* Set dynamic width based on number of slides */
`;

const Slide = styled.div`
  min-width: ${props => props.minWidth}px; /* Match the width of the container */
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

const ImageWrapper = styled.div`
  border-radius: 4.4px;
  background: url('/musicalposter-1.jpeg') 50% 50% / 172.5px 244px no-repeat;
  margin-right: 18.5px;
  width: 172.5px;
  height: 244px;
`;

const Content = styled.div`
  margin-top: 1px;
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
  -webkit-line-clamp: ${props => (props.isExpanded ? 'unset' : '4')}; /* Line clamp */
  -webkit-box-orient: vertical;
`;

const CarouselButton = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px; /* Increase button size */
  height: 40px; /* Increase button size */
  cursor: pointer;
  z-index: 1; /* Ensure button is above other elements */
`;

const LeftButton = styled(CarouselButton)`
  left: 0px;
`;

const RightButton = styled(CarouselButton)`
  right: 0px;
`;

// Main component
const Page34: React.FC = () => {
  const [ratings, setRatings] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const reviews = [
    {
      date: "2024-05-08 12:00",
      userName: "현생팔아뮤덕살기",
      userHandle: "mu******",
      comment: "승식 세준 배우님 공연을 수차례 봤지만 이 날 신은 왜 넘버는 역대급이라 말할 수 있습니다 입봉작이라고 하시던데 너무 믿기지 않고 테오와 니콜라의 감정선이 잘 느껴져서 좋았어요 OST 앨범도 구매해서 신은 왜 넘버 잘 듣고 있어요 ㅠㅠ 두 분 이런 퀄리티의 공연을 완성하기까지 얼마나 피나는 노력을 했을지 눈에 선하고 원래 그룹 활동을 함께하셔서 그런지 각자 다른 배우님들과 호흡을 맞출 때와는 또 다른 .. 그런 애틋함이 느껴졌던거 같아요 이퀄 만약 또 기회가 된다면 승식 배우님의 니콜라도 궁금하네요 .. 세준 배우님 승식 배우님 고생했어요 ??"
    },
    {
      date: "2024-05-09 14:30",
      userName: "관객",
      userHandle: "a******",
      comment: "마지막 장면에서 눈물을 참을 수 없었어요. 다시 보고 싶어요!",
    },
    {
      date: "2024-05-10 18:00",
      userName: "뮤덕",
      userHandle: "md******",
      comment: "이번 공연 정말 대단했어요. 무대 디자인과 조명도 멋졌고, 배우님들의 케미도 최고였어요. 다음 공연도 기대됩니다!",
    }
  ];

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

  const toggleExpandText = () => {
    setIsExpanded(prev => !prev);
  };

  const handleLeftButtonClick = () => {
    setCarouselIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : reviews.length - 1
    );
  };

  const handleRightButtonClick = () => {
    setCarouselIndex(prevIndex => 
      prevIndex < reviews.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <Container>
      <LeftButton src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
      <ContentWrapper translate={-carouselIndex * 1131} width={1131 * reviews.length}>
        {reviews.map((review, index) => (
          <Slide key={index} minWidth={1131}>
            <ImageWrapper />
            <Content>
              <DateText>{review.date}</DateText>
              <Header>
                <UserInfo>
                  <Avatar />
                  <UserNameHandleWrapper>
                    <UserNameText>{review.userName}</UserNameText>
                    <UserHandle>{review.userHandle}</UserHandle>
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
                <CommentText isExpanded={isExpanded} onClick={toggleExpandText}>
                  {review.comment}
                </CommentText>
              </CommentSection>
            </Content>
          </Slide>
        ))}
      </ContentWrapper>
      <RightButton src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
    </Container>
  );
};

export default Page34;