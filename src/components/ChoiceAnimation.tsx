import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import gsap from 'gsap';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
`;

const Word = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: "Montserrat", sans-serif;
  font-size: 8rem;
  font-weight: 900;
  color: var(--color, #fff);
  display: flex;
  pointer-events: none;
  user-select: none;
  line-height: 5.8rem;
`;

const Char = styled.span`
  position: relative;
  -webkit-text-stroke: 2px #000;
  transform: translateY(-45%) rotate(4deg);
  margin-left: -1.6rem;
`;

const WORD = 'CHOOSE';
const COLORS = ['#FCA400', '#0046DB', '#FD0000', '#FEFCFE'];
const WORD_COUNT = 4;

const ChoiceAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = Array.from({ length: WORD_COUNT }).map((_, i) => {
      const wordEl = document.createElement('div');
      wordEl.className = 'word';
      wordEl.style.setProperty('--color', COLORS[i]);
      
      WORD.split('').forEach((char, j) => {
        const charEl = document.createElement('span');
        charEl.className = 'char';
        charEl.textContent = char;
        wordEl.appendChild(charEl);
      });
      
      containerRef.current?.appendChild(wordEl);
      return wordEl;
    });

    const chars = containerRef.current.querySelectorAll('.char');

    gsap.to(chars, {
      duration: 2,
      y: '45%',
      ease: 'power1.inOut',
      stagger: {
        each: 0.1,
        from: 'random',
        grid: 'auto',
        repeat: -1,
        yoyo: true
      }
    });

    return () => {
      words.forEach(word => word.remove());
    };
  }, []);

  return <Container ref={containerRef} />;
};

export default ChoiceAnimation; 