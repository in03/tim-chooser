import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Choice } from '../types';

interface Props {
  choices: Choice[];
  onUpdateChoice: (id: string, text: string) => void;
  onRemoveChoice: (id: string) => void;
}

const Container = styled(motion.div)`
  position: relative;
  width: 600px;
  height: 600px;
`;

const CenterText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: bold;
  color: #646cff;
  text-shadow: 0 0 10px rgba(100, 108, 255, 0.5);
`;

const ChoiceItem = styled(motion.div)`
  position: absolute;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  width: 150px;
  
  &:focus {
    outline: none;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  
  &:hover {
    background: rgba(255, 68, 68, 0.2);
  }
`;

const ChoiceWheel: React.FC<Props> = ({ choices, onUpdateChoice, onRemoveChoice }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const radius = 250; // Distance from center
    const items = container.querySelectorAll('.choice-item');
    const angleStep = (2 * Math.PI) / choices.length;

    items.forEach((item, index) => {
      const angle = angleStep * index;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      (item as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
    });
  }, [choices]);

  return (
    <Container ref={containerRef}>
      <CenterText>CHOOSE</CenterText>
      {choices.map((choice) => (
        <ChoiceItem
          key={choice.id}
          className="choice-item"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <Input
            value={choice.text}
            onChange={(e) => onUpdateChoice(choice.id, e.target.value)}
            spellCheck={false}
          />
          <RemoveButton onClick={() => onRemoveChoice(choice.id)}>×</RemoveButton>
        </ChoiceItem>
      ))}
    </Container>
  );
};

export default ChoiceWheel; 