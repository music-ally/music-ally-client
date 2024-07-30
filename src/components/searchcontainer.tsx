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

const SearchComponent: React.FC = () => {
  const [musicals, setMusicals] = useState<Musical[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('${import.meta.env.VITE_BACKEND_URL}/musical')
      .then(response => response.json())
      .then(data => setMusicals(data))
      .catch(error => console.error('뮤지컬정보error:', error));

    fetch('${import.meta.env.VITE_BACKEND_URL}/actor')
      .then(response => response.json())
      .then(data => setActors(data))
      .catch(error => console.error('배우정보error:', error));
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
    navigate('/search', { state: { musicals: filteredMusicals, actors: filteredActors } });
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
