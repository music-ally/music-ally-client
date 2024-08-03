import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import token from "./token";

interface Musical {
  musical_id: string;
  poster_image: string;
  musical_name: string;
  start_at: string;
  end_at: string;
  theater_name: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 5px 10px;
  background-color: #ffffff;
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
  border: 1px solid #e0e0e0;
  border-radius: 0 0 6px 6px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
  color: black;
  list-style: none;
  z-index: 1000;
`;

const ResultItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface Props {
  setFilteredMusicals: (musicals: Musical[]) => void;
}

const MusicalSearchComponent: React.FC<Props> = ({ setFilteredMusicals }) => {
  const [musicals, setMusicals] = useState<Musical[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Musicals state updated:", musicals);
  }, [musicals]);

  const handleSearch = () => {
    if (searchTerm) {
      console.log("Search term:", searchTerm);

      token
        .get(`/search/musical?keyword=${encodeURIComponent(searchTerm)}`)
        .then((response) => {
          setMusicals(response.data.data.musicals || []);
          setFilteredMusicals(response.data.data.musicals || []);
          setShowResults(true);
        })
        .catch((error) => console.error("뮤지컬 정보 에러:", error));
    } else {
      setMusicals([]);
      setFilteredMusicals([]);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="뮤지컬이 궁금해!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchBox>
      {showResults && (
        <ResultsList>
          {musicals.map((musical) => (
            <ResultItem key={musical.musical_id} onClick={handleSearch}>
              {musical.musical_name}
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

export default MusicalSearchComponent;
