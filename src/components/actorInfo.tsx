import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const ContentWrapper = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* 열을 중앙에 정렬 */
  position: relative;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 31.7px; /* 이미지 간격 조절 */
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 13.68px;
  width: 250.9px;
  height: 354.98px;
`;

const ActorInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ActorName = styled.div`
  font-family: 'Inter', sans-serif; /* 글꼴을 Inter로 설정 */
  font-weight: black;
  font-size: 23.49px;
  line-height: 1.5;
  color: #FAFAFA;
  background-clip: text;
`;

const Company = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18.07px;
  color: #ECECEC; 
  margin: 14px 0 0 0; /* ActorName과 간격 조정 */
  letter-spacing: 5%;
`;

const Birthday = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18.07px;
  color: #888888;
  letter-spacing: 5%;
`;

interface Actor {
  name: string;
  company: string;
  birthday: string;
}

interface Props {}

const Component: React.FC<Props> = () => {
  const actors: Actor[] = [
    { name: "Actor Name 1", company: "Company 1", birthday: "Birthday 1" },
    { name: "Actor Name 2", company: "Company 2", birthday: "Birthday 2" },
    { name: "Actor Name 3", company: "Company 3", birthday: "Birthday 3" },
    { name: "Actor Name 4", company: "Company 4", birthday: "Birthday 4" }
  ];

  const images: string[] = ["/musicalposter-1.jpeg", "/musicalposter-2.jpeg", "/musicalposter-3.jpeg", "/musicalposter-4.jpeg"];

  return (
    <>
      <Container>
        <ContentWrapper>
          <Row>
            <ImageRow>
              {images.slice(0, 4).map((image, index) => (
                <ImageContainer key={index}>
                  <Image
                    src={image}
                  />
                  <ActorInfoContainer>
                    <ActorName>{actors[index].name}</ActorName>
                    <Company>{actors[index].company}</Company>
                    <Birthday>{actors[index].birthday}</Birthday>
                  </ActorInfoContainer>
                </ImageContainer>
              ))}
            </ImageRow>
          </Row>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Component;
