import { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Choice } from '../types';

interface Props {
  choices: Choice[];
  onUpdateChoice: (id: string, text: string) => void;
  onRemoveChoice: (id: string) => void;
  isPulsing?: boolean;
}

const Container = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  width: min(800px, 90vw);
  height: min(800px, 90vw);
  max-height: calc(100vh - 200px);
  max-width: calc(100vw - 40px);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) and (orientation: landscape) {
    max-height: calc(100vh - 100px);
    width: 90vw;
    aspect-ratio: auto;
  }
`;

const CenterText = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  display: flex;
  flex-direction: row;
  line-height: 1;
  z-index: 2;
  white-space: nowrap;
  font-size: clamp(3rem, 6vw, 8rem);

  @media (max-width: 768px) {
    line-height: 0.8;
  }
`;

const OrbitContainer = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-9%);
  pointer-events: none;
`;

const ChoiceItem = styled(motion.div)<{ $isLink: boolean }>`
  position: absolute;
  padding: clamp(0.5rem, 1vw, 0.75rem);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  color: ${props => props.$isLink ? '#646cff' : '#ffffff'};
  font-size: clamp(0.75rem, 1.5vw, 1rem);
  white-space: nowrap;
  transform-origin: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: min(250px, 25vw);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    max-width: min(180px, 25vw);
    font-size: clamp(0.7rem, 1.2vw, 0.9rem);
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: text;
  padding: 0;
  
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
  opacity: 0.7;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 68, 68, 0.2);
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }
`;

const Word = styled(motion.div)`
  position: relative;
  display: flex;
  gap: clamp(-0.8rem, -1.6vw, -1.6rem);
`;

const Letter = styled(motion.span)<{ $color: string }>`
  position: relative;
  display: inline-block;
  transform-origin: center;
  -webkit-text-stroke: clamp(1px, 0.25vw, 2px) #000;
  color: ${props => props.$color};
  transform: translateY(-45%) rotate(4deg);
  margin-left: clamp(-0.8rem, -1.6vw, -1.6rem);
  user-select: none;
`;

const COLORS = ['#FCA400', '#0046DB', '#FD0000', '#FEFCFE', '#FCA400', '#0046DB'];

const SelectedCard = styled(motion.div)`
  padding: 2rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  color: white;
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  max-width: 90vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectedChoice: React.FC<{ choice: Choice | null }> = ({ choice }) => {
  if (!choice) return null;
  
  return (
    <SelectedCard
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.5
        }
      }}
    >
      {choice.text}
    </SelectedCard>
  );
};

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const MessageText = styled(motion.div)`
  font-family: "Montserrat", sans-serif;
  color: white;
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  margin-top: 2rem;
  opacity: 0.9;
`;

const ChoiceWheel: React.FC<Props> = ({ choices, onUpdateChoice, onRemoveChoice, isPulsing }) => {
  const [radiusX, setRadiusX] = useState(350);
  const [radiusY, setRadiusY] = useState(280);

  useEffect(() => {
    const updateRadius = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isLandscape = viewportWidth > viewportHeight;
      
      const centerTextSize = Math.min(
        viewportWidth * 0.06,
        Math.min(viewportWidth, viewportHeight) * 0.1
      ) * 6;

      const horizontalSpace = Math.min(800, viewportWidth * 0.9) - centerTextSize;
      const verticalSpace = Math.min(
        isLandscape ? viewportHeight - 100 : viewportHeight - 200,
        viewportHeight * 0.8
      ) - centerTextSize;
      
      const baseRadiusX = horizontalSpace * 0.45;
      const baseRadiusY = verticalSpace * 0.45;
      
      setRadiusX(Math.max(baseRadiusX, Math.min(viewportWidth * 0.18, 180)));
      setRadiusY(Math.max(baseRadiusY, Math.min(viewportHeight * 0.18, 150)));
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const choiceVariants = useMemo(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isLandscape = viewportWidth > viewportHeight;
    const totalChoices = Math.max(choices.length, 1);
    
    const angleOffset = Math.PI / Math.max(1, totalChoices - 1);
    
    return choices.map((_, index) => {
      const startAngle = totalChoices <= 4 ? Math.PI / 4 : 0;
      
      const angle = startAngle + (2 * Math.PI * index) / totalChoices;
      
      const x = radiusX * Math.cos(angle);
      const y = radiusY * Math.sin(angle);
      
      const scaleFactor = Math.min(
        1, 
        Math.min(viewportWidth / 1200, viewportHeight / 800)
      );
      
      return {
        initial: { x: 0, y: 0, opacity: 0, scale: 0 },
        animate: {
          x,
          y,
          opacity: 1,
          scale: Math.max(0.8, scaleFactor),
          transition: {
            type: "spring",
            stiffness: 90,
            damping: 15,
            delay: index * 0.08
          }
        },
        exit: {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0,
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        },
        hover: {
          scale: Math.max(0.9, scaleFactor) * 1.1,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }
      };
    });
  }, [choices.length, radiusX, radiusY]);

  const handleClick = (choice: Choice) => {
    if (choice.isLink) {
      window.location.href = choice.text.startsWith('http') 
        ? choice.text 
        : `https://${choice.text}`;
    }
  };

  const letterVariants = {
    initial: { y: "-45%" },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 1.5,
        ease: "easeInOut",
      }
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <CenterText>
          <Word>
            {"CHOOSE".split('').map((letter, i) => (
              <Letter
                key={i}
                $color={COLORS[i]}
                variants={letterVariants}
                initial="initial"
                animate={isPulsing ? "pulse" : "initial"}
                style={{ rotate: "4deg" }}
              >
                {letter}
              </Letter>
            ))}
          </Word>
        </CenterText>
        <AnimatePresence>
          <OrbitContainer>
            {choices.map((choice, index) => (
              <ChoiceItem
                key={choice.id}
                $isLink={choice.isLink}
                variants={choiceVariants[index]}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                onClick={() => handleClick(choice)}
              >
                <Input
                  value={choice.text}
                  onChange={(e) => onUpdateChoice(choice.id, e.target.value)}
                  spellCheck={false}
                  onClick={(e) => e.stopPropagation()}
                />
                <RemoveButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveChoice(choice.id);
                  }}
                >
                  ×
                </RemoveButton>
              </ChoiceItem>
            ))}
          </OrbitContainer>
        </AnimatePresence>
      </ContentWrapper>
    </Container>
  );
};

export default ChoiceWheel;