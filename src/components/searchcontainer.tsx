import React, { useState, useEffect } from 'react';
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
  margin-left : 10px;
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
  color : black; 
  list-style: none;
`;

const ResultItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const dummyData: Musical[] = [
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

const SearchComponent: React.FC = () => {
  const [data, setData] = useState<Musical[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setData(dummyData);
  }, []);

  const filteredData = searchTerm
    ? data.filter(musical =>
        musical.musical_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleItemClick = (id: string) => {
    console.log(`musical ID: ${id}`);
  };

  return (
    <Container>
      <SearchBox>
        <FiSearch size={20} color="#251611"/>
        <SearchInput
          type="text"
          placeholder="뮤지컬이 궁금해!"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchBox>
      {searchTerm && (
        <ResultsList>
          {filteredData.map(musical => (
            <ResultItem key={musical.musical_id} onClick={() => handleItemClick(musical.musical_id)}>
              {musical.musical_name}
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

export default SearchComponent;
