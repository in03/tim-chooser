import styled from '@emotion/styled';
import { theme } from '../theme';

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${theme.borderRadius.default};
  background-color: ${props => props.disabled ? theme.colors.disabled : theme.colors.primary};
  color: ${theme.colors.text};
  font-size: clamp(0.875rem, 2vh, 1rem);
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color ${theme.transitions.default};
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.disabled ? theme.colors.disabled : theme.colors.primaryHover};
  }
  
  @media screen and (max-width: ${theme.breakpoints.mobile}) and (orientation: landscape) {
    padding: 0.5rem 1rem;
    font-size: clamp(0.75rem, 2vh, 0.875rem);
  }
`; 