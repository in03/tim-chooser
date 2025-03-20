import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: ${theme.spacing.large};
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  text-align: center;
`;

const ErrorMessage = styled.pre`
  margin-top: ${theme.spacing.medium};
  padding: ${theme.spacing.medium};
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.default};
  max-width: 800px;
  overflow-x: auto;
`;

const RetryButton = styled.button`
  margin-top: ${theme.spacing.large};
  padding: ${theme.spacing.medium} ${theme.spacing.large};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: none;
  border-radius: ${theme.borderRadius.default};
  cursor: pointer;
  transition: background-color ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h1>Something went wrong</h1>
          {this.state.error && (
            <ErrorMessage>
              {this.state.error.message}
            </ErrorMessage>
          )}
          <RetryButton onClick={this.handleRetry}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 