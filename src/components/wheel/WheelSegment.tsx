import React, { memo } from 'react';
import styled from '@emotion/styled';
import { Choice } from '../../types/interfaces';
import { WHEEL_CONFIG } from '../../config';

interface WheelSegmentProps {
  choice: Choice;
  angle: number;
  isEditing: boolean;
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
}

const SegmentContainer = styled.div<{ angle: number }>`
  position: absolute;
  transform-origin: 0 0;
  transform: rotate(${props => props.angle}deg);
  display: flex;
  align-items: center;
  padding: ${WHEEL_CONFIG.padding}px;
`;

const SegmentContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SegmentText = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: ${WHEEL_CONFIG.fontSize}px;
  width: 150px;

  &:focus {
    outline: none;
    border-bottom: 1px solid white;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  display: none;

  ${SegmentContainer}:hover & {
    display: block;
  }
`;

const WheelSegment: React.FC<WheelSegmentProps> = memo(({
  choice,
  angle,
  isEditing,
  onUpdate,
  onRemove
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(choice.id, e.target.value);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(choice.id);
  };

  return (
    <SegmentContainer angle={angle}>
      <SegmentContent>
        <SegmentText
          value={choice.text}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        {isEditing && (
          <RemoveButton onClick={handleRemove}>×</RemoveButton>
        )}
      </SegmentContent>
    </SegmentContainer>
  );
});

WheelSegment.displayName = 'WheelSegment';

export default WheelSegment; 