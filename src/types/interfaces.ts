export interface Choice {
  id: string;
  text: string;
  isLink: boolean;
}

export interface WheelState {
  choices: Choice[];
  isAnimating: boolean;
  selectedChoice: Choice | null;
  isPulsing: boolean;
}

export interface WheelAction {
  type: 'SET_CHOICES' | 'ADD_CHOICE' | 'UPDATE_CHOICE' | 'REMOVE_CHOICE' | 'CLEAR_CHOICES' | 'SET_SELECTED' | 'SET_ANIMATING' | 'SET_PULSING';
  payload?: any;
}

export interface ResponsiveState {
  isPortrait: boolean;
  isMobile: boolean;
}

export interface ErrorState {
  message: string | null;
  code?: string;
} 