import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import useSound from 'use-sound';
import { Choice } from '../types';

interface Props {
  choice: Choice;
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  max-width: 90vw;
  width: 600px;
  position: relative;
`;

const Title = styled.h2`
  color: #1a1a1a;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Result = styled.div<{ isLink: boolean }>`
  font-size: 3rem;
  color: #646cff;
  margin: 2rem 0;
  font-weight: bold;
  cursor: ${props => props.isLink ? 'pointer' : 'default'};
  
  &:hover {
    text-decoration: ${props => props.isLink ? 'underline' : 'none'};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ResultCard: React.FC<Props> = ({ choice, onClose }) => {
  const [playTada] = useSound('/tada.mp3');

  useEffect(() => {
    playTada();
  }, [playTada]);

  const handleResultClick = () => {
    if (choice.isLink) {
      window.location.href = choice.text.startsWith('http') 
        ? choice.text 
        : `https://${choice.text}`;
    }
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
      />
      <Card
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <Title>Your Choice Is:</Title>
        <Result 
          isLink={choice.isLink}
          onClick={handleResultClick}
        >
          {choice.text}
        </Result>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Card>
    </Overlay>
  );
};

export default ResultCard; 