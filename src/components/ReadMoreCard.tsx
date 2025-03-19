import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface Props {
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
  padding: clamp(1.5rem, 4vh, 3rem);
  border-radius: 16px;
  text-align: left;
  max-width: 90vw;
  width: min(500px, 90vw);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  
  @media screen and (max-width: 768px) and (orientation: landscape) {
    padding: 1rem;
    max-height: 80vh;
  }
`;

const Letter = styled.div`
  color: #1a1a1a;
  font-size: clamp(1rem, 3vh, 1.2rem);
  line-height: 1.6;
  font-family: 'Georgia', serif;
  
  p {
    margin-bottom: clamp(1rem, 3vh, 1.5rem);
  }
  
  .signature {
    margin-top: clamp(1rem, 3vh, 2rem);
    font-style: italic;
  }
  
  @media screen and (max-width: 768px) and (orientation: landscape) {
    font-size: clamp(0.875rem, 2.5vh, 1.2rem);
    line-height: 1.4;
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

const ReadMoreCard: React.FC<Props> = ({ onClose }) => {
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <Letter>
          <p>Dear Tim,</p>
          <p>Thanks for being awesome.</p>
          <p className="signature">Caleb</p>
        </Letter>
        <CloseButton onClick={onClose}>×</CloseButton>
      </Card>
    </Overlay>
  );
};

export default ReadMoreCard; 