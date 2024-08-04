import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MusicalSearchComponent from "./searchcontainer-mus";
import MusicalInfo from "./musicalInfo-review";

interface Musical {
  musical_id: string;
  poster_image: string;
  musical_name: string;
  start_at: string;
  end_at: string;
  theater_name: string;
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
  onSelect: (musical: Musical) => void; // 선택된 뮤지컬 데이터를 부모로 전달하는 콜백
}

const MusicalSearchModal: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const [filteredMusicals, setFilteredMusicals] = useState<Musical[]>([]);
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

  if (!isOpen) return null;

  const handleFilteredMusicals = (musical_id: string) => {
    const selectedMusical = filteredMusicals.find(
      (musical) => musical.musical_id === musical_id
    );
    if (selectedMusical) {
      onSelect(selectedMusical);
    }
  };

  return (
    <ModalContainer>
      <ModalContent ref={modalRef}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <MusicalSearchComponent setFilteredMusicals={setFilteredMusicals} />
        <MusicalInfo
          musicals={filteredMusicals}
          filteredMusicals={handleFilteredMusicals}
        />
      </ModalContent>
    </ModalContainer>
  );
};

export default MusicalSearchModal;
