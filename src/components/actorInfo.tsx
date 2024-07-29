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

// Props 인터페이스 정의
interface Actor {
  name: string;
  company: string;
  birthday: string;
}

interface Props {
  actors?: Actor[]; 
  images?: string[]; 
}

const Component: React.FC<Props> = ({ actors = [], images = [] }) => {
  const minLength = Math.min(images.length, actors.length);

  return (
    <Container>
      <ContentWrapper>
        <Row>
          <ImageRow>
            {minLength > 0 && images.slice(0, minLength).map((image, index) => (
              <ImageContainer key={index}>
                <Image src={image} alt={`Image ${index + 1}`} />
                <ActorInfoContainer>
                  <ActorName>{actors[index]?.name || 'Unknown Actor'}</ActorName>
                  <Company>{actors[index]?.company || 'Unknown Company'}</Company>
                  <Birthday>{actors[index]?.birthday || 'Unknown Birthday'}</Birthday>
                </ActorInfoContainer>
              </ImageContainer>
            ))}
          </ImageRow>
        </Row>
      </ContentWrapper>
    </Container>
  );
};

export default Component;
