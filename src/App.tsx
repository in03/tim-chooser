import { useState } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import ChoiceWheel from './components/ChoiceWheel'
import ChoiceAnimation from './components/ChoiceAnimation'
import ResultCard from './components/ResultCard'
import ReadMoreCard from './components/ReadMoreCard'
import { Choice } from './types'

const defaultChoices: Choice[] = [
  { id: '1', text: 'cine2nerdle.com', isLink: true },
  { id: '2', text: 'Time to play chess', isLink: false },
  { id: '3', text: 'Latest Trump news', isLink: false },
  { id: '4', text: 'Time for a mocha', isLink: false },
  { id: '5', text: 'Maccas run', isLink: false },
]

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 10;
`

const Button = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.disabled ? '#666' : '#646cff'};
  color: white;
  font-size: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.disabled ? '#666' : '#747bff'};
  }
`

function App() {
  const [choices, setChoices] = useState<Choice[]>(defaultChoices)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [showReadMore, setShowReadMore] = useState(false)

  const handleAddOption = () => {
    if (choices.length < 10) {
      const newChoice: Choice = {
        id: String(Date.now()),
        text: 'New Option',
        isLink: false,
      }
      setChoices([...choices, newChoice])
    }
  }

  const handleUpdateChoice = (id: string, text: string) => {
    setChoices(choices.map(choice => 
      choice.id === id 
        ? { ...choice, text, isLink: text.startsWith('http') || text.includes('.com') }
        : choice
    ))
  }

  const handleRemoveChoice = (id: string) => {
    setChoices(choices.filter(choice => choice.id !== id))
  }

  const handleClearAll = () => {
    setChoices([])
  }

  const handleChoose = () => {
    if (choices.length > 0) {
      setIsAnimating(true)
      const randomIndex = Math.floor(Math.random() * choices.length)
      setTimeout(() => {
        setSelectedChoice(choices[randomIndex])
        setIsAnimating(false)
      }, 5000)
    }
  }

  return (
    <AppContainer>
      <AnimatePresence>
        {!isAnimating && !selectedChoice && (
          <ChoiceWheel
            choices={choices}
            onUpdateChoice={handleUpdateChoice}
            onRemoveChoice={handleRemoveChoice}
          />
        )}
        {isAnimating && <ChoiceAnimation />}
        {selectedChoice && <ResultCard choice={selectedChoice} onClose={() => setSelectedChoice(null)} />}
        {showReadMore && <ReadMoreCard onClose={() => setShowReadMore(false)} />}
      </AnimatePresence>

      <ButtonContainer>
        <Button onClick={handleClearAll} disabled={choices.length === 0}>
          Clear All Options
        </Button>
        <Button onClick={handleAddOption} disabled={choices.length >= 10}>
          Add Option
        </Button>
        <Button onClick={handleChoose} disabled={choices.length === 0}>
          Choose
        </Button>
        <Button onClick={() => setShowReadMore(true)}>
          Read More
        </Button>
      </ButtonContainer>
    </AppContainer>
  )
}

export default App
