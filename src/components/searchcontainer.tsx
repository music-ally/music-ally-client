import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

export interface Musical {
  musical_id: string;
  poster_image: string;
  musical_name: string;
  start_at: string;
  end_at: string;
  theater_name: string;
}

export interface Actor {
  actor_id: string;
  profile_image: string;
  actor_name: string;
  agency: string;
  birthday: string;
}

const Container = styled.div`
  position: relative;
  width: 400px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  border: none;
  flex: 1;
  font-size: 14px;
  color: #828282;
  background-color: transparent;
  outline: none;
  margin-left: 10px;
`;

const ResultsList = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 0 0 6px 6px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
  color: black;
  list-style: none;
`;

const ResultItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const dummyMusicalData: Musical[] = [
  {
    musical_id: "6683c3c553d13cd248483b97",
    poster_image: "http://image.com/3",
    musical_name: "Musical Three",
    start_at: "2023-03-01",
    end_at: "2023-04-01",
    theater_name: "서울 극장 2",
  },
  {
    musical_id: "6683c3c553d13cd248483b98",
    poster_image: "http://image.com/4",
    musical_name: "Musical Four",
    start_at: "2023-04-01",
    end_at: "2023-05-01",
    theater_name: "서울 극장 3"
  },
  {
    musical_id: "6683c3c553d13cd248483b96",
    poster_image: "http://image.com/2",
    musical_name: "Musical Two",
    start_at: "2023-02-01",
    end_at: "2023-03-01",
    theater_name: "서울 극장 1"
  },
  {
    musical_id: "6683c3c553d13cd248483b99",
    poster_image: "http://image.com/5",
    musical_name: "Musical Five",
    start_at: "2023-05-01",
    end_at: "2023-06-01",
    theater_name: "경기 극장 1"
  },
  {
    musical_id: "6683c3c553d13cd248483b9c",
    poster_image: "http://image.com/8",
    musical_name: "Musical Eight",
    start_at: "2023-08-01",
    end_at: "2023-09-01",
    theater_name: "울산 1"
  },
  {
    musical_id: "6683c3c553d13cd248483b9e",
    poster_image: "http://image.com/10",
    musical_name: "Musical Ten",
    start_at: "2023-10-01",
    end_at: "2023-11-01",
    theater_name: "광주 극장 1"
  },
  {
    musical_id: "6683c3c553d13cd248483b9a",
    poster_image: "http://image.com/6",
    musical_name: "Musical Six",
    start_at: "2023-06-01",
    end_at: "2023-07-01",
    theater_name: "경기 극장 2"
  },
];

const dummyActorData: Actor[] = [
  {
    actor_id: "667ef79d28f914605dd6c5ce",
    profile_image: "http://thisIsForURL",
    actor_name: "김예원",
    agency: "SM",
    birthday: "2001-05-21T00:00:00.000Z",
  },
  {
    actor_id: "667ef81028f914605dd6c5d0",
    profile_image: "http://thisIsFor지수",
    actor_name: "지수",
    agency: "YG",
    birthday: "1995-01-03T00:00:00.000Z"
},
{
    actor_id: "667ef84828f914605dd6c5d2",
    profile_image: "http://thisIsFor제니",
    actor_name: "제니",
    agency: "YG",
    birthday: "1996-01-16T00:00:00.000Z"
},
{
    actor_id: "667ef88e28f914605dd6c5d4",
    profile_image: "http://thisIsFor로제",
    actor_name: "로제",
    agency: "YG",
    birthday: "1997-02-11T00:00:00.000Z"
},
{
    actor_id: "667ef8b928f914605dd6c5d6",
    profile_image: "http://thisIsFor리사",
    actor_name: "리사",
    agency: "YG",
    birthday: "1997-03-27T00:00:00.000Z"
},
{
    actor_id: "667ef90628f914605dd6c5d8",
    profile_image: "http://thisIsFor태연",
    actor_name: "태연",
    agency: "SM",
    birthday: "1989-03-09T00:00:00.000Z"
},
{
    actor_id: "667ef92728f914605dd6c5da",
    profile_image: "http://thisIsFor써니",
    actor_name: "써니",
    agency: "SM",
    birthday: "1989-05-15T00:00:00.000Z"
},
{
    actor_id: "667ef94c28f914605dd6c5dc",
    profile_image: "http://thisIsFor티파니",
    actor_name: "티파니",
    agency: "SM",
    birthday: "1989-08-01T00:00:00.000Z"
},
];

const SearchComponent: React.FC = () => {
  const [musicals, setMusicals] = useState<Musical[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMusicals(dummyMusicalData);
    setActors(dummyActorData);
  }, []);

  useEffect(() => {
    setSearchTerm('');
  }, [location]);

  const filteredMusicals = searchTerm
    ? musicals.filter(musical =>
        musical.musical_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredActors = searchTerm
    ? actors.filter(actor =>
        actor.actor_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearch = () => {
    navigate('/search');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMusicalItemClick = (id: string) => {
    console.log(`musical ID: ${id}`);
    handleSearch();
  };

  const handleActorItemClick = (id: string) => {
    console.log(`actor ID: ${id}`);
    handleSearch();
  };

  return (
    <Container>
      <SearchBox>
        <FiSearch size={20} color="#251611" onClick={handleSearch} style={{ cursor: 'pointer' }} />
        <SearchInput
          type="text"
          placeholder="뮤지컬이 궁금해!"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchBox>
      {searchTerm && (
        <ResultsList>
          {filteredMusicals.map(musical => (
            <ResultItem key={musical.musical_id} onClick={() => handleMusicalItemClick(musical.musical_id)}>
              {musical.musical_name}
            </ResultItem>
          ))}
          {filteredActors.map(actor => (
            <ResultItem key={actor.actor_id} onClick={() => handleActorItemClick(actor.actor_id)}>
              {actor.actor_name}
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

export default SearchComponent;
