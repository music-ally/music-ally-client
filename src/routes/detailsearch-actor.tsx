import React from 'react';
import styled from 'styled-components';

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
  const actors: Actor[] = [
    { name: "Actor Name 1", company: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "/actor-1.jpeg" },
    { name: "Actor Name 2", company: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "/actor-2.jpeg" },
    { name: "Actor Name 3", company: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "/actor-3.jpeg" },
    { name: "Actor Name 4", company: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "/actor-4.jpeg" }
  ];

  return (
    <Container>
        <GridContainer>
        <SectionTitle>Actor ({actors.length})</SectionTitle>
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
