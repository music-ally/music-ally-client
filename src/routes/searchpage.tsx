import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MusicalInfo from '../components/musicalInfo';
import ActorInfo from '../components/actorInfo';

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
  const [musicals, setMusicals] = useState([]);
  const [actors, setActors] = useState([]);

//   useEffect(() => {
//     // Fetch musicals from the API
//     // fetch('/api/musical')
//     //   .then(response => response.json())
//     //   .then(data => setMusicals(data))
//     //   .catch(error => console.error('Error fetching musicals:', error));

//     // Fetch actors from the API
//     // fetch('/api/actor')
//     //   .then(response => response.json())
//     //   .then(data => setActors(data))
//     //   .catch(error => console.error('Error fetching actors:', error));

  const handleSeeMoreMusicals = () => {
    navigate('/search/musical', { state: { musicals } });
  };

  const handleSeeMoreActors = () => {
    navigate('/search/actor', { state: { actors } });
  };

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
