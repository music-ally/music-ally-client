import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export interface Musical {
  musical_id: string;
  poster_image: string;
  musical_name: string;
  start_at: string;
  end_at: string;
  theater_name: string;
}

interface Props {
  musicals: Musical[];
  setFilteredMusicals: (musicals: Musical[]) => void;
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

const SearchContainerMusical: React.FC<Props> = ({ musicals, setFilteredMusicals }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = searchTerm
      ? musicals.filter(musical =>
          musical.musical_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : musicals;
    setFilteredMusicals(filtered);
  }, [searchTerm, musicals, setFilteredMusicals]);

  return (
    <Container>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="Search musicals"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchBox>
      {searchTerm && (
        <ResultsList>
          {musicals.map(musical => (
            <ResultItem key={musical.musical_id}>
              {musical.musical_name}
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

export default SearchContainerMusical;
