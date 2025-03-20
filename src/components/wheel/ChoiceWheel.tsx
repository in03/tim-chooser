import React, { memo, useMemo } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Choice } from '../../types/interfaces';
import { WHEEL_CONFIG } from '../../config';
import WheelSegment from './WheelSegment';

interface ChoiceWheelProps {
  choices: Choice[];
  isEditing?: boolean;
  isPulsing?: boolean;
  onUpdateChoice: (id: string, text: string) => void;
  onRemoveChoice: (id: string) => void;
}

const WheelContainer = styled(motion.div)<{ isPulsing?: boolean }>`
  position: relative;
  width: ${WHEEL_CONFIG.radius * 2}px;
  height: ${WHEEL_CONFIG.radius * 2}px;
  border-radius: 50%;
  border: 2px solid white;
  animation: ${props => props.isPulsing ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const CenterPoint = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const ChoiceWheel: React.FC<ChoiceWheelProps> = memo(({
  choices,
  isEditing = false,
  isPulsing = false,
  onUpdateChoice,
  onRemoveChoice,
}) => {
  const segments = useMemo(() => {
    const segmentAngle = 360 / choices.length;
    return choices.map((choice, index) => ({
      ...choice,
      angle: index * segmentAngle,
    }));
  }, [choices]);

  return (
    <WheelContainer
      isPulsing={isPulsing}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {segments.map(({ id, text, isLink, angle }) => (
        <WheelSegment
          key={id}
          choice={{ id, text, isLink }}
          angle={angle}
          isEditing={isEditing}
          onUpdate={onUpdateChoice}
          onRemove={onRemoveChoice}
        />
      ))}
      <CenterPoint />
    </WheelContainer>
  );
});

ChoiceWheel.displayName = 'ChoiceWheel';

export default ChoiceWheel; 