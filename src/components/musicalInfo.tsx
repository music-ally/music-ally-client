import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const ContentWrapper = styled.div``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 31.7px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 13.68px;
  width: 250.9px;
  height: 354.98px;
`;

const MusicalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MusicalName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: black;
  font-size: 23.49px;
  line-height: 1.5;
  color: #FAFAFA;
  background-clip: text;
`;

const ConcertHall = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18.07px;
  color: #ECECEC;
  margin: 14px 0 0 0;
  letter-spacing: 5%;
`;

const PerformanceDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18.07px;
  color: #888888;
  letter-spacing: 5%;
`;

// Musical 데이터 타입 정의
interface Musical {
  name: string;
  place: string;
  date: string;
  imageUrl: string;
}

// Props 인터페이스 정의
interface Props {
  musicals?: Musical[]; 
}

const MusicalInfo: React.FC<Props> = ({ musicals = [] }) => {
  return (
    <Container>
      <ContentWrapper>
        <Row>
          <ImageRow>
            {musicals.length > 0 ? (
              musicals.map((musical, index) => (
                <ImageContainer key={index}>
                  <Image src={musical.imageUrl} alt={`Poster for ${musical.name}`} />
                  <MusicalInfoContainer>
                    <MusicalName>{musical.name}</MusicalName>
                    <ConcertHall>{musical.place}</ConcertHall>
                    <PerformanceDate>{musical.date}</PerformanceDate>
                  </MusicalInfoContainer>
                </ImageContainer>
              ))
            ) : (
              <div>No musicals available</div> // 데이터가 없는 경우 대체
            )}
          </ImageRow>
        </Row>
      </ContentWrapper>
    </Container>
  );
};

export default MusicalInfo;
