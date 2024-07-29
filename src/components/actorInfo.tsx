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
  margin-bottom: 20px;
`;

const Image = styled.img`
  border-radius: 13.68px;
  width: 250.9px;
  height: 250.9px;
`;

const ActorInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
`;

const ActorName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: black;
  font-size: 23.49px;
  line-height: 1.5;
  color: #FAFAFA;
`;

const Company = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18.07px;
  color: #ECECEC;
  margin: 14px 0 0 0;
  letter-spacing: 5%;
`;

const Birthday = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18.07px;
  color: #888888;
  letter-spacing: 5%;
`;

interface Actor {
  actor_id: string;
  name: string;
  agency: string;
  birthday: string;
  imageUrl: string;
}

interface Props {
  actors?: Actor[];
}

const ActorInfo: React.FC<Props> = ({ actors = [] }) => {
  return (
    <Container>
      {actors.length > 0 ? (
        actors.map((actor, index) => (
          <ImageContainer key={index}>
            <Image src={actor.imageUrl} alt={actor.name} />
            <ActorInfoContainer>
              <ActorName>{actor.name}</ActorName>
              <Company>{actor.agency}</Company>
              <Birthday>{actor.birthday}</Birthday>
            </ActorInfoContainer>
          </ImageContainer>
        ))
      ) : (
        <div>No actors available</div>
      )}
    </Container>
  );
};

export default ActorInfo;
