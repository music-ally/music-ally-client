import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

export interface Actor {
  actor_id: string;
  imageUrl: string;
  name: string;
  agency: string;
  birthday: string;
}

interface Props {
  actors: Actor[];
  setFilteredActors: (actors: Actor[]) => void;
}

const Container = styled.div`
  position: relative;
  width: 100%;
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

const SearchContainerActor: React.FC<Props> = ({ actors, setFilteredActors }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = searchTerm
      ? actors.filter(actor =>
          actor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : actors;
    setFilteredActors(filtered);
  }, [searchTerm, actors, setFilteredActors]);

  return (
    <Container>
      <SearchBox>
        <FiSearch size={20} color="#251611" style={{ cursor: 'pointer' }} />
        <SearchInput
          type="text"
          placeholder="배우가 궁금해!"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchBox>
      {searchTerm && (
        <ResultsList>
          {actors.map(actor => (
            <ResultItem key={actor.actor_id}>
              {actor.name}
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

export default SearchContainerActor;
