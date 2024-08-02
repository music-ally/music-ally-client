import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import MusicalInfo from '../components/musicalInfo';
import ActorInfo from '../components/actorInfo';
import token from '../components/token';

const PageContainer = styled.div`
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

const SectionWrapper = styled.div`
  margin-bottom: 40px;
`;

const SeeMore = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #888888;
  text-align: right;
  cursor: pointer;
`;

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [musicals, setMusicals] = useState(location.state?.musicals || []);
  const [actors, setActors] = useState(location.state?.actors || []);

  const handleSeeMoreMusicals = () => {
    navigate('/search/musical', { state: { musicals } });
  };

  const handleSeeMoreActors = () => {
    navigate('/search/actor', { state: { actors } });
  };

  useEffect(() => {
    if (!musicals.length) {
      token.get('/musical')
        .then(response => setMusicals(response.data.musicals))
        .catch(error => console.error('뮤지컬 정보를 가져오는데 오류가 발생했습니다:', error));
    }
    if (!actors.length) {
      token.get('/actor')
        .then(response => setActors(response.data.actors))
        .catch(error => console.error('배우 정보를 가져오는데 오류가 발생했습니다:', error));
    }
  }, [musicals, actors]);

  return (
    <PageContainer>
      <SectionWrapper>
        <SectionTitle>Musical ({musicals.length})</SectionTitle>
        <MusicalInfo musicals={musicals.slice(0, 4)} />
        <SeeMore onClick={handleSeeMoreMusicals}>More</SeeMore>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle>Actor ({actors.length})</SectionTitle>
        <ActorInfo actors={actors.slice(0, 4)} />
        <SeeMore onClick={handleSeeMoreActors}>More</SeeMore>
      </SectionWrapper>
    </PageContainer>
  );
};

export default SearchPage;
