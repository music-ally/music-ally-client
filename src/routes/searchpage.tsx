import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import MusicalInfo from "../components/musicalInfo-search";
import ActorInfo from "../components/actorInfo-review";

const PageContainer = styled.div`
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

const SectionWrapper = styled.div`
  margin-bottom: 40px;
`;

const SeeMore = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  color: #888888;
  text-align: right;
  cursor: pointer;
`;

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const musical_id = location.state?.musical_id || [];
  const actor_id = location.state?.actor_id || [];
  const musicals = location.state?.musicals || [];
  const actors = location.state?.actors || [];

  useEffect(() => {
    console.log("musical_id", musical_id);
    console.log("actor_id", actor_id);
  }, [musical_id, actor_id]);

  const handleSeeMoreMusicals = () => {
    navigate("/search/musical", { state: { musicals } });
  };

  const handleSeeMoreActors = () => {
    navigate("/search/actor", { state: { actors } });
  };

  return (
    <PageContainer>
      <SectionWrapper>
        <SectionTitle>Musical ({musicals.length})</SectionTitle>
        {musicals.length > 0 ? (
          <>
            <MusicalInfo musicals={musicals.slice(0, 4)} />
            <SeeMore onClick={handleSeeMoreMusicals}>More</SeeMore>
          </>
        ) : (
          <p>No musicals found</p>
        )}
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle>Actor ({actors.length})</SectionTitle>
        {actors.length > 0 ? (
          <>
            <ActorInfo actors={actors.slice(0, 4)} />
            <SeeMore onClick={handleSeeMoreActors}>More</SeeMore>
          </>
        ) : (
          <p>No actors found</p>
        )}
      </SectionWrapper>
    </PageContainer>
  );
};

export default SearchPage;
