import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ActorSearchComponent from "./searchcontainer-act";
import ActorInfo from "./actorInfo-review";

export interface Actor {
  actor_id: string;
  profile_image: string;
  actor_name: string;
  agency: string;
  birthday: string;
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #282828;
  padding: 20px;
  border-radius: 8px;
  width: 1250px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (actor: Actor) => void; // 선택된 배우 데이터를 부모로 전달하는 콜백
}

const ActorSearchModal: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const [filteredActors, setFilteredActors] = useState<Actor[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleFilteredActors = (actor_id: string) => {
    const selectedActor = filteredActors.find(
      (actor) => actor.actor_id === actor_id
    );
    if (selectedActor) {
      onSelect(selectedActor);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent ref={modalRef}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ActorSearchComponent setFilteredActors={setFilteredActors} />
        <ActorInfo actors={filteredActors} onSelect={handleFilteredActors} />
      </ModalContent>
    </ModalContainer>
  );
};

export default ActorSearchModal;
