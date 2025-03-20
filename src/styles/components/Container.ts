import styled from '@emotion/styled';
import { theme } from '../theme';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: ${theme.breakpoints.mobile}) and (orientation: portrait) {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: ${theme.spacing.large};
  display: flex;
  gap: ${theme.spacing.medium};
  z-index: 10;
  
  @media screen and (max-width: ${theme.breakpoints.mobile}) and (orientation: landscape) {
    bottom: ${theme.spacing.medium};
    gap: ${theme.spacing.small};
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 ${theme.spacing.medium};
  }
`; 