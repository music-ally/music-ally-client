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

const MusicalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MusicalName = styled.div`
  font-family: 'Inter', sans-serif; /* 글꼴을 Inter로 설정 */
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
  margin: 14px 0 0 0; /* MusicalName과 간격 조정 */
  letter-spacing: 5%;
`;

const PerformanceDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18.07px;
  color: #888888;
  letter-spacing: 5%;
`;

interface Musical {
  name: string;
  place: string; 
  date: string; 
  imageUrl: string; 
}

interface Props {}

const Component: React.FC<Props> = () => {
  const musicals: Musical[] = [
    { name: "Musical Name 1", place: "Concert Hall 1", date: "Performance Date 1", imageUrl: "/musicalposter-1.jpeg" },
    { name: "Musical Name 2", place: "Concert Hall 2", date: "Performance Date 2", imageUrl: "/musicalposter-2.jpeg" },
    { name: "Musical Name 3", place: "Concert Hall 3", date: "Performance Date 3", imageUrl: "/musicalposter-3.jpeg" },
    { name: "Musical Name 4", place: "Concert Hall 4", date: "Performance Date 4", imageUrl: "/musicalposter-4.jpeg" }
  ];

  return (
    <>
      <Container>
        <ContentWrapper>
          <Row>
            <ImageRow>
              {musicals.map((musical, index) => (
                <ImageContainer key={index}>
                  <Image src={musical.imageUrl} />
                  <MusicalInfoContainer>
                    <MusicalName>{musical.name}</MusicalName>
                    <ConcertHall>{musical.place}</ConcertHall>
                    <PerformanceDate>{musical.date}</PerformanceDate>
                  </MusicalInfoContainer>
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
