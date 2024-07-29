import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  width: 1280px;
  padding: 20px;
  background-color: transparent;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  color: #FFFFFF;
  margin: 20px 0;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 250px; 
`;

const Image = styled.img`
  border-radius: 13.68px;
  width: 100%;
  height: auto;
`;

const ActorInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
`;

const ActorName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 18px;
  color: #FAFAFA;
`;

const Company = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #ECECEC; 
  margin-top: 5px;
`;

const Birthday = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #888888;
  margin-top: 5px;
`;

interface Actor {
  name: string;
  company: string;
  birthday: string;
  imageUrl: string;
}

const DetailSearchAct: React.FC = () => {
  const location = useLocation();
  const actors = location.state?.actors as Actor[] || [];

  return (
    <Container>
      <SectionTitle>Actor ({actors.length})</SectionTitle>
      <GridContainer>
        {actors.map((actor, index) => (
          <ImageContainer key={index}>
            <Image src={actor.imageUrl} alt={actor.name} />
            <ActorInfoContainer>
              <ActorName>{actor.name}</ActorName>
              <Company>{actor.company}</Company>
              <Birthday>{actor.birthday}</Birthday>
            </ActorInfoContainer>
          </ImageContainer>
        ))}
      </GridContainer>
    </Container>
  );
};

export default DetailSearchAct;
