// Memory Game - Exercise

import { createContext, useContext, useEffect, useState } from "react";
import { CARD_STATE, GAME_STATUS, getInitialMemory, isMemoryFinished, isPairCards } from "../../lib/memory";

const MemoryContext = createContext(null);


export const useMemoryContext = ()=>{
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error("useMemoryContext must be used within a MemoryProvider");
  }
  return context;
}

export const MemoryContextProvider = ({ children }) => {
//states defined here
const [cards, setCards] = useState(()=> getInitialMemory());
const [status, setStatus] = useState(GAME_STATUS.PLAYING);
const [actualCard, setActualCard] = useState(null); 
const [score, setScore] = useState(0);
const [isFinished, setIsFinished] = useState(false);

//functions defined here
const resetGame = () => {
  setCards(getInitialMemory());
  setStatus(GAME_STATUS.PLAYING);
  setIsFinished(false);
  setScore(0);
}


const returnCard = (card) => {
  const newCards = cards.map(c => c.id === card.id ? { ...c, state: CARD_STATE.RETURNED } : c);
  setCards(newCards);
}

const handlePairCards =  (card1, card2) => {
const newCards = cards.map(card => card.id === card1.id || card.id === card2.id ? { ...card, state: CARD_STATE.FIND } : card);
setCards(newCards);
}

const handleNotPairCards = (card1, card2) => {
  const newCards = cards.map(card => card.id === card1.id || card.id === card2.id ?
 { ...card, state: CARD_STATE.HIDE } : card);
  setCards(newCards);
  }


const handleClickedCard =  (clickedCard) => {
  //handleClickedCard defined here
  if(status !== GAME_STATUS.PLAYING && status !== GAME_STATUS.WAITING_FOR_SECOND_CARD) return;
  
  if(clickedCard.state !== CARD_STATE.HIDE) return;

returnCard(clickedCard);


  if(status === GAME_STATUS.PLAYING) {
    setStatus(GAME_STATUS.WAITING_FOR_SECOND_CARD);
    setActualCard(clickedCard);
  }

  if(status === GAME_STATUS.WAITING_FOR_SECOND_CARD) {
    returnCard(clickedCard);

    setStatus(GAME_STATUS.WAIT_FOR_CLEAR);

  setTimeout( () => {
    if(isPairCards(actualCard, clickedCard)) {
       handlePairCards(clickedCard, actualCard) 
    } else {
      handleNotPairCards(clickedCard, actualCard);
    } 
    setScore(curr => curr + 1);
  }, 900);

  setTimeout(() => {
    setStatus(GAME_STATUS.PLAYING);
  }, 1000);
  }
 
  
}

//useEffect defined here
  useEffect(() => {
    if (isMemoryFinished(cards)) {
      setIsFinished(true);
      setStatus(GAME_STATUS.FINISHED);
    }
  }, [cards]);


const values = { cards, score, resetGame, handleClickedCard, isFinished};



  return (
    <MemoryContext.Provider value={values}>
      {children}
    </MemoryContext.Provider>
  );
};
