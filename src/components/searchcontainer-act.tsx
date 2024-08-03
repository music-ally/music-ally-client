import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import token from "./token";
import { Actor } from "./actorsearch";

const Container = styled.div`
  position: relative;
  width: 100%;
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
  setFilteredActors: (actors: Actor[]) => void;
}

const ActorSearchComponent: React.FC<Props> = ({ setFilteredActors }) => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchActors = () => {
    token
      .get(`/search/actor?keyword=${encodeURIComponent(searchTerm)}`)
      .then((response) => {
        setActors(response.data.data.actors || []);
        setFilteredActors(response.data.data.actors || []);
        setShowResults(true);
      })
      .catch((error) => console.error("배우 정보 에러:", error));
  };

  useEffect(() => {
    if (searchTerm === "") {
      setActors([]);
      setFilteredActors([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    console.log("Actors state updated:", actors);
  }, [actors]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchActors();
      setShowResults(false);
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
          placeholder="배우가 궁금해!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchBox>
      {showResults && (
        <ResultsList>
          {actors.map((actor) => (
            <ResultItem key={actor.actor_id} onClick={fetchActors}>
              {actor.actor_name}
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

export default ActorSearchComponent;
