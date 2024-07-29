import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom : 80px;
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
  margin-top: 10px;
`;

const MusicalName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: black;
  font-size: 23.49px;
  line-height: 1.5;
  color: #FAFAFA;
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

interface Musical {
  musical_id: string;
  poster_image: string;
  musical_name: string;
  start_at: string;
  end_at: string;
  theater_name: string;
}

interface Props {
  musicals?: Musical[];
}

const MusicalInfo: React.FC<Props> = ({ musicals = [] }) => {
  return (
    <Container>
      {musicals.length > 0 ? (
        musicals.map((musical, index) => (
          <ImageContainer key={index}>
            <Image src={musical.poster_image} alt={musical.musical_name} />
            <MusicalInfoContainer>
              <MusicalName>{musical.musical_name}</MusicalName>
              <ConcertHall>{musical.theater_name}</ConcertHall>
              <PerformanceDate>{musical.start_at}-{musical.end_at}</PerformanceDate>
            </MusicalInfoContainer>
          </ImageContainer>
        )) 
      ) : (
        <div>No musicals available</div>
      )}
    </Container>
  );
};

export default MusicalInfo;
