import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ActorInfoSearch from "../components/actorInfo-search";

const Container = styled.div`
  width: 1280px;
  padding: 20px;
  background-color: transparent;
`;

const SectionTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  color: #ffffff;
  margin: 20px 0;
`;

interface Actor {
  actor_id: string;
  actor_name: string;
  agency: string;
  birthday: string;
  profile_image: string;
}

const DetailSearchAct: React.FC = () => {
  const location = useLocation();
  const actors = (location.state?.actors as Actor[]) || [];

  const handleActorClick = (actor_id: string) => {
    console.log(`Actor with ID: ${actor_id} clicked`);
  };

  return (
    <Container>
      <SectionTitle>Actor ({actors.length})</SectionTitle>
      <ActorInfoSearch actors={actors} onActorClick={handleActorClick} />
    </Container>
  );
};

export default DetailSearchAct;
