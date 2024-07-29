import React from 'react';
import styled from 'styled-components';
import MusicalInfo from '../components/musicalInfo';
import ActorInfo from '../components/actorInfo';

// Styled-components for the layout
const PageContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #1c1c1c;
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
  const musicals = [
    { name: "Musical Name 1", place: "Concert Hall 1", date: "2024-07-01", imageUrl: "/musicalposter-1.jpeg" },
    { name: "Musical Name 2", place: "Concert Hall 2", date: "2024-07-02", imageUrl: "/musicalposter-2.jpeg" },
    { name: "Musical Name 3", place: "Concert Hall 3", date: "2024-07-03", imageUrl: "/musicalposter-3.jpeg" },
    { name: "Musical Name 4", place: "Concert Hall 4", date: "2024-07-04", imageUrl: "/musicalposter-4.jpeg" }
  ];

  const actors = [
    { name: "Actor Name 1", company: "PL 엔터테인먼트", birthday: "1982.04.06" },
    { name: "Actor Name 2", company: "PL 엔터테인먼트", birthday: "1982.04.06" },
    { name: "Actor Name 3", company: "PL 엔터테인먼트", birthday: "1982.04.06" },
    { name: "Actor Name 4", company: "PL 엔터테인먼트", birthday: "1982.04.06" }
  ];

  return (
    <PageContainer>
      <SectionWrapper>
        <SectionTitle>Musical (12)</SectionTitle>
        <MusicalInfo musicals={musicals} />
        <SeeMore>More</SeeMore>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle>Actor (12)</SectionTitle>
        <ActorInfo actors={actors} />
        <SeeMore>More</SeeMore>
      </SectionWrapper>
    </PageContainer>
  );
};

export default SearchPage;
