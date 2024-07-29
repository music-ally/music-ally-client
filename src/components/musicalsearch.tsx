import React, { useState } from 'react';
import styled from 'styled-components';
import SearchContainerMusical, { Musical } from './searchcontainer-mus';
import MusicalInfo from './musicalInfo';

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
  width: 80%;
  max-width: 800px;
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
  musicals?: Musical[];
  isOpen: boolean;
  onClose: () => void;
}

const MusicalSearchModal: React.FC<Props> = ({ musicals = [], isOpen, onClose }) => {
  const [filteredMusicals, setFilteredMusicals] = useState<Musical[]>([]);

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <SearchContainerMusical musicals={musicals} setFilteredMusicals={setFilteredMusicals} />
        <MusicalInfo musicals={filteredMusicals} />
      </ModalContent>
    </ModalContainer>
  );
};

export default MusicalSearchModal;
