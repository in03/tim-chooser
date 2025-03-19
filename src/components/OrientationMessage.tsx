import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Message = styled(motion.div)`
  font-family: "Montserrat", sans-serif;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  color: #646cff;
  text-align: center;
  padding: 2rem;
  max-width: 90vw;
  font-weight: 900;
`;

const PhoneIcon = styled(motion.div)`
  font-size: clamp(3rem, 10vw, 5rem);
  margin-bottom: 1rem;
  transform: rotate(90deg);
`;

const OrientationMessage = () => {
  return (
    <Container>
      <Message
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <PhoneIcon>📱</PhoneIcon>
        Rotate your phone, Timmy!
      </Message>
    </Container>
  );
};

export default OrientationMessage; 