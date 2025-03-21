import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
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
  padding: clamp(1rem, 3vh, 2rem);
  border-radius: 16px;
  text-align: center;
  max-width: 90vw;
  width: min(600px, 90vw);
  position: relative;
  
  @media screen and (max-width: 768px) and (orientation: landscape) {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    max-height: 80vh;
  }
`;

const ContentWrapper = styled.div`
  @media screen and (max-width: 768px) and (orientation: landscape) {
    flex: 1;
  }
`;

const Title = styled.h2`
  color: #1a1a1a;
  font-size: clamp(1.5rem, 4vh, 2rem);
  margin-bottom: clamp(0.5rem, 2vh, 1rem);
`;

const Result = styled.div<{ isLink: boolean }>`
  font-size: clamp(1.5rem, 5vh, 3rem);
  color: #646cff;
  margin: clamp(1rem, 3vh, 2rem) 0;
  font-weight: bold;
  cursor: ${props => props.isLink ? 'pointer' : 'default'};
  word-break: break-word;
  
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

const MessageText = styled(motion.div)`
  font-family: "Montserrat", sans-serif;
  color: #646cff;
  font-size: clamp(1rem, 3vh, 1.5rem);
  margin-top: clamp(0.75rem, 2vh, 1.5rem);
  opacity: 0.9;
`;

const ResultCard: React.FC<Props> = ({ choice, onClose }) => {
  const [playTada] = useSound('/tim-chooser/audio/tada.mp3', {
    volume: 0.75,
    onload: () => {
      console.log('Tada sound loaded successfully');
    },
    onloaderror: (_id: string, error: Error) => {
      console.error('Error loading tada sound:', error);
    },
    onplayerror: (_id: string, error: Error) => {
      console.error('Error playing tada sound:', error);
    }
  });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    playTada();
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);
    return () => clearTimeout(timer);
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
        <ContentWrapper>
          <Title>Your Choice Is:</Title>
          <Result 
            isLink={choice.isLink}
            onClick={handleResultClick}
          >
            {choice.text}
          </Result>
          <AnimatePresence>
            {showMessage && (
              <MessageText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                Enjoy, Tim!
              </MessageText>
            )}
          </AnimatePresence>
        </ContentWrapper>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Card>
    </Overlay>
  );
};

export default ResultCard; 