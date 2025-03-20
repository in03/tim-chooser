import { useReducer, useCallback } from 'react';
import { WheelState, WheelAction, Choice } from '../types/interfaces';
import { DEFAULT_CHOICES } from '../config';

const initialState: WheelState = {
  choices: DEFAULT_CHOICES,
  isAnimating: false,
  selectedChoice: null,
  isPulsing: false,
};

function wheelReducer(state: WheelState, action: WheelAction): WheelState {
  switch (action.type) {
    case 'SET_CHOICES':
      return { ...state, choices: action.payload };
    case 'ADD_CHOICE':
      return { ...state, choices: [...state.choices, action.payload] };
    case 'UPDATE_CHOICE':
      return {
        ...state,
        choices: state.choices.map(choice =>
          choice.id === action.payload.id ? action.payload : choice
        ),
      };
    case 'REMOVE_CHOICE':
      return {
        ...state,
        choices: state.choices.filter(choice => choice.id !== action.payload),
      };
    case 'CLEAR_CHOICES':
      return { ...state, choices: [] };
    case 'SET_SELECTED':
      return { ...state, selectedChoice: action.payload };
    case 'SET_ANIMATING':
      return { ...state, isAnimating: action.payload };
    case 'SET_PULSING':
      return { ...state, isPulsing: action.payload };
    default:
      return state;
  }
}

export const useWheelState = () => {
  const [state, dispatch] = useReducer(wheelReducer, initialState);

  const addChoice = useCallback((choice: Choice) => {
    dispatch({ type: 'ADD_CHOICE', payload: choice });
  }, []);

  const updateChoice = useCallback((choice: Choice) => {
    dispatch({ type: 'UPDATE_CHOICE', payload: choice });
  }, []);

  const removeChoice = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_CHOICE', payload: id });
  }, []);

  const clearChoices = useCallback(() => {
    dispatch({ type: 'CLEAR_CHOICES' });
  }, []);

  const setSelectedChoice = useCallback((choice: Choice | null) => {
    dispatch({ type: 'SET_SELECTED', payload: choice });
  }, []);

  const setAnimating = useCallback((isAnimating: boolean) => {
    dispatch({ type: 'SET_ANIMATING', payload: isAnimating });
  }, []);

  const setPulsing = useCallback((isPulsing: boolean) => {
    dispatch({ type: 'SET_PULSING', payload: isPulsing });
  }, []);

  return {
    state,
    addChoice,
    updateChoice,
    removeChoice,
    clearChoices,
    setSelectedChoice,
    setAnimating,
    setPulsing,
  };
}; 