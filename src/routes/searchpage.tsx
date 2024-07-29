import React from 'react';
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

  const musicals = [
    { musical_id : "1",musical_name: "Musical Name 1", theater_name: "Concert Hall 1", start_at: "2024-07-01",end_at: "2024-07-03", poster_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s" },
    { musical_id : "2",musical_name: "Musical Name 2", theater_name: "Concert Hall 2", start_at: "2024-07-02",end_at: "2024-07-03", poster_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s" },
    { musical_id : "3",musical_name: "Musical Name 3", theater_name: "Concert Hall 3", start_at: "2024-07-03",end_at: "2024-07-03", poster_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s" },
    { musical_id : "4",musical_name: "Musical Name 4", theater_name: "Concert Hall 4", start_at: "2024-07-04",end_at: "2024-07-05", poster_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s" },
    { musical_id : "5",musical_name: "Musical Name 5", theater_name: "Concert Hall 5", start_at: "2024-07-04",end_at: "2024-07-05", poster_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s" }
  ];

  const actors = [
    {actor_id: "1", name: "Actor Name 1", agency: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s"},
    {actor_id: "2", name: "Actor Name 2", agency: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s"},
    {actor_id: "3", name: "Actor Name 3", agency: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s"},
    {actor_id: "4", name: "Actor Name 4", agency: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s"},
    {actor_id: "5", name: "Actor Name 5", agency: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s"},
    {actor_id: "6", name: "Actor Name 6", agency: "PL 엔터테인먼트", birthday: "1982.04.06", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL4Fb4_oFM_wkKdMCXzVDqzM3nepn3JKvOw&s"}
  ];

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
