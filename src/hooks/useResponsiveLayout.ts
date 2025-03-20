import { useState, useEffect } from 'react';
import { ResponsiveState } from '../types/interfaces';

export const useResponsiveLayout = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isPortrait: false,
    isMobile: false,
  });

  useEffect(() => {
    const checkLayout = () => {
      setState({
        isPortrait: window.innerHeight > window.innerWidth,
        isMobile: window.innerWidth <= 768,
      });
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    window.addEventListener('orientationchange', checkLayout);

    return () => {
      window.removeEventListener('resize', checkLayout);
      window.removeEventListener('orientationchange', checkLayout);
    };
  }, []);

  return state;
}; 