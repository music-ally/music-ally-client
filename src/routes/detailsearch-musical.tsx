import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import MusicalInfo from '../components/musicalInfo';

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

interface Musical {
  name: string;
  place: string;
  date: string;
  imageUrl: string;
}

const DetailSearchMus: React.FC = () => {
  const location = useLocation();
  const musicals = location.state?.musicals as Musical[] || []; 

  return (
    <Container>
      <SectionTitle>Musical ({musicals.length})</SectionTitle>
      <MusicalInfo musicals={musicals} />
    </Container>
  );
};

export default DetailSearchMus;
