import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Card = styled(motion.div)`
  background: white;
  padding: clamp(1.5rem, 4vh, 3rem);
  padding-right: calc(clamp(1.5rem, 4vh, 3rem) + 32px); /* Extra space for close button */
  border-radius: 16px;
  text-align: left;
  max-width: 90vw;
  width: min(500px, 90vw);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  
  @media screen and (max-width: 768px) and (orientation: landscape) {
    padding: 1rem;
    padding-right: calc(1rem + 32px); /* Extra space for close button in landscape */
    max-height: 80vh;
  }
`;

const Letter = styled.div`
  color: #1a1a1a;
  font-size: clamp(1rem, 3vh, 1.2rem);
  line-height: 1.6;
  font-family: 'Georgia', serif;
  
  p {
    margin-bottom: clamp(1rem, 3vh, 1.5rem);
  }
  
  .signature {
    margin-top: clamp(1rem, 3vh, 2rem);
    font-style: italic;
  }
  
  @media screen and (max-width: 768px) and (orientation: landscape) {
    font-size: clamp(0.875rem, 2.5vh, 1.2rem);
    line-height: 1.4;
  }
`;

const CloseButton = styled.button`
  position: fixed; /* Changed from absolute to fixed */
  top: 50%;
  right: calc(50% - min(250px, 45vw) - 8px); /* Positioned relative to the card's right edge */
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  @media screen and (max-width: 768px) {
    right: calc(50% - 45vw - 8px); /* Adjusted for mobile */
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ReadMoreCard: React.FC<Props> = ({ onClose }) => {
  const [play, { stop }] = useSound('/tim-chooser/audio/tim_letter.mp3', {
    volume: 0.75,
    onload: () => {
      console.log('Audio loaded successfully');
    },
    onloaderror: (_id: string, error: Error) => {
      console.error('Error loading audio:', error);
    },
    onplayerror: (_id: string, error: Error) => {
      console.error('Error playing audio:', error);
    }
  });

  useEffect(() => {
    try {
      // Add a 2-second delay before playing the audio
      const timer = setTimeout(() => {
        play();
        console.log('Attempted to play audio');
      }, 2000);

      // Cleanup the timer and stop audio if the component unmounts
      return () => {
        clearTimeout(timer);
        stop();
      };
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [play, stop]);

  const handleClose = () => {
    stop();
    onClose();
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <Card
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Letter>
          <p>Dear Tim,</p>
          <p>
            I've enjoyed our chats and your great questions, and I will miss them dearly.
          </p>
          <p>
            I do wish I'd been a little less busy so we would've had time for more chats.
          </p>
          <p>
            I made you this weird Tim-style chooser, not because I think you're indecisive, but I feel like sometimes you like to spin the wheel. You're a strong-minded, well-thought-out kinda guy when it comes to the stuff that really matters, but when it comes to the cheeky little things, I think you like when they're left to chance every now and again.
          </p>
          <p>
            But If not, feel free to set every option to "time for a mocha" and show anyone who doesn't look busy, and, well... they'll just have to make you a mocha – nothing you can do, the app said so!
          </p>
          <p>
            I wish you all the best in your marriage and this new season of your life. I hope the new commute treats you ok.
          </p>
          <p>
            Most of all, may you be fruitful and multiply! In time, 70% of the Wynnum parkruners will be an O'Sullivan.
          </p>
          <p>
            P.S: I hope some day you're the President of the US somehow. I think you'd do alright.
          </p>
          <p>
            Catch up soon,<br />
            Caleb
          </p>
        </Letter>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </Card>
    </Overlay>
  );
};

export default ReadMoreCard; 