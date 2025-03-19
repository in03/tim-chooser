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
  max-width: min(200px, 22vw);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    max-width: min(140px, 20vw);
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

const ChoiceWheel: React.FC<Props> = ({ choices, onUpdateChoice, onRemoveChoice, isPulsing }) => {
  const [radiusX, setRadiusX] = useState(350);
  const [radiusY, setRadiusY] = useState(280);

  useEffect(() => {
    const updateRadius = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isLandscape = viewportWidth > viewportHeight;
      
      // Calculate approximate CHOOSE text dimensions based on font size
      const fontSize = Math.min(
        viewportWidth * 0.06,
        Math.min(viewportWidth, viewportHeight) * 0.1
      );
      
      // Approximate text width and height based on font size
      // CHOOSE has 6 characters, height is roughly 1x fontSize, width is roughly 0.8x fontSize per char
      const textWidth = fontSize * 6 * 0.8;
      const textHeight = fontSize;
      
      // Calculate aspect ratio of CHOOSE text
      const chooseAspectRatio = textWidth / textHeight;
      
      // Available space for orbit
      const horizontalSpace = Math.min(800, viewportWidth * 0.9) - textWidth;
      const verticalSpace = Math.min(
        isLandscape ? viewportHeight - 100 : viewportHeight - 200,
        viewportHeight * 0.8
      ) - textHeight;
      
      // Base radius values
      let baseRadiusX = horizontalSpace * 0.45;
      let baseRadiusY = verticalSpace * 0.45;
      
      // Match orbit's aspect ratio to CHOOSE text
      // But with some limits to prevent extreme stretching
      const aspectRatio = Math.min(Math.max(chooseAspectRatio, 1.5), 4);
      
      // Adjust radiusY to match the aspect ratio
      baseRadiusY = baseRadiusX / aspectRatio;
      
      // Apply minimum values to ensure items don't get too close to center
      setRadiusX(Math.max(baseRadiusX, Math.min(viewportWidth * 0.18, 180)));
      setRadiusY(Math.max(baseRadiusY, Math.min(viewportHeight * 0.16, 140)));
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const choiceVariants = useMemo(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const totalChoices = Math.max(choices.length, 1);
    
    return choices.map((_, index) => {
      // For better distribution, use different angles based on number of choices
      const startAngle = totalChoices <= 4 ? Math.PI / 3 : Math.PI / 6;
      
      // Distribute around ellipse
      const angle = startAngle + (2 * Math.PI * index) / totalChoices;
      
      // Calculate position on ellipse
      const x = radiusX * Math.cos(angle);
      const y = radiusY * Math.sin(angle);
      
      // Adjust scale based on viewport size and count
      const densityFactor = Math.max(0.7, 1 - (totalChoices * 0.03)); // Scale down as more items are added
      const scaleFactor = Math.min(
        0.95, 
        Math.min(viewportWidth / 1200, viewportHeight / 800) * densityFactor
      );
      
      return {
        initial: { x: 0, y: 0, opacity: 0, scale: 0 },
        animate: {
          x,
          y,
          opacity: 1,
          scale: Math.max(0.75, scaleFactor),
          transition: {
            type: "spring",
            stiffness: 85,
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
          scale: Math.max(0.8, scaleFactor) * 1.1,
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

  // Limit input text length for orbit items
  const handleInputChange = (id: string, text: string) => {
    // Limit to 20 characters
    const limitedText = text.slice(0, 20);
    onUpdateChoice(id, limitedText);
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
                  onChange={(e) => handleInputChange(choice.id, e.target.value)}
                  spellCheck={false}
                  onClick={(e) => e.stopPropagation()}
                  maxLength={20}
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