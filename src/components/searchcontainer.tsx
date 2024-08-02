import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import token from "./token";

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

const SearchComponent: React.FC = () => {
  const [musicals, setMusicals] = useState<Musical[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      console.log("Search term:", searchTerm);

      token
        .get(`/search/musical?keyword=${encodeURIComponent(searchTerm)}`)
        .then((response) => {
          setMusicals(response.data.data.musicals || []);
        })
        .catch((error) => console.error("뮤지컬 정보 에러:", error));

      token
        .get(`/search/actor?keyword=${encodeURIComponent(searchTerm)}`)
        .then((response) => {
          setActors(response.data.data.actors || []);
        })
        .catch((error) => console.error("배우 정보 에러:", error));
    } else {
      setMusicals([]);
      setActors([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    console.log("Musicals state updated:", musicals);
  }, [musicals]);

  useEffect(() => {
    console.log("Actors state updated:", actors);
  }, [actors]);

  const handleSearch = (musical_id?: string, actor_id?: string) => {
    navigate("/search", { state: { musical_id, actor_id } });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const foundMusical = musicals.find((musical) =>
        musical.musical_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const foundActor = actors.find((actor) =>
        actor.actor_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (foundMusical) {
        handleSearch(foundMusical.musical_id, undefined);
      } else if (foundActor) {
        handleSearch(undefined, foundActor.actor_id);
      } else {
        handleSearch(undefined, undefined);
      }
    }
  };

  return (
    <Container>
      <SearchBox>
        <FiSearch
          size={20}
          color="#251611"
          onClick={() =>
            handleKeyDown({
              key: "Enter",
            } as React.KeyboardEvent<HTMLInputElement>)
          }
          style={{ cursor: "pointer" }}
        />
        <SearchInput
          type="text"
          placeholder="뮤지컬이 궁금해!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchBox>
      {searchTerm && (
        <ResultsList>
          {musicals.map((musical) => (
            <ResultItem
              key={musical.musical_id}
              onClick={() => handleSearch(musical.musical_id, undefined)}
            >
              {musical.musical_name}
            </ResultItem>
          ))}
          {actors.map((actor) => (
            <ResultItem
              key={actor.actor_id}
              onClick={() => handleSearch(undefined, actor.actor_id)}
            >
              {actor.actor_name}
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

export default SearchComponent;
