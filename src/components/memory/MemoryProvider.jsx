// Memory Game - Exercise

import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { CARD_STATE, GAME_STATUS, isMemoryFinished, isPairCards } from "../../lib/memory";
import { MEMORY_REDUCER_ACTIONS, MemoryInitialState, memoryReducer } from "./memoryReducer";

const MemoryContext = createContext(null);

export const useMemoryContext = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error("useMemoryContext must be used within a MemoryProvider");
  }
  return context;
}

export const MemoryContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(memoryReducer, MemoryInitialState);
  const { cards, status, actualCard, score } = state;

  const resetGame = useCallback(() => {
    dispatch({ type: MEMORY_REDUCER_ACTIONS.RESET_GAME });
  },[])

  const handleClickedCard = useCallback((clickedCard) => {
    if (status !== GAME_STATUS.PLAYING && status !== GAME_STATUS.WAITING_FOR_SECOND_CARD) return;

    if (clickedCard.state !== CARD_STATE.HIDE) return;

    // returnCard(clickedCard);
    dispatch({ type: MEMORY_REDUCER_ACTIONS.RETURN_CARD, payload: clickedCard  });


    if (status === GAME_STATUS.PLAYING) {
      dispatch({ type: MEMORY_REDUCER_ACTIONS.SET_GAME_STATUS, payload: { status: GAME_STATUS.WAITING_FOR_SECOND_CARD } });
      dispatch({ type: MEMORY_REDUCER_ACTIONS.SET_ACTUAL_CARD, payload: { actualCard: clickedCard } });
    }

    if (status === GAME_STATUS.WAITING_FOR_SECOND_CARD) {

      dispatch({ type: MEMORY_REDUCER_ACTIONS.SET_GAME_STATUS, payload: { status: GAME_STATUS.WAIT_FOR_CLEAR } });

      const checkIsPairCards = isPairCards(actualCard, clickedCard);
  
      setTimeout(() => {

      dispatch({ type: MEMORY_REDUCER_ACTIONS.HANDLE_CARD, payload: { card1: actualCard, card2: clickedCard, newState: checkIsPairCards ? CARD_STATE.FIND : CARD_STATE.HIDE} });

      dispatch({ type: MEMORY_REDUCER_ACTIONS.SET_SCORE });
      }, checkIsPairCards ? 100 : 900);

      setTimeout(() => {
        dispatch({ type: MEMORY_REDUCER_ACTIONS.SET_GAME_STATUS, payload: { status: GAME_STATUS.PLAYING } });
      }, 1000);
    }
  },[status, actualCard])

  const isFinished = useMemo(() => {
   return isMemoryFinished(cards)
  }, [cards]);

  const values = { cards, score, resetGame, handleClickedCard, isFinished };

  return (
    <MemoryContext.Provider value={values}>
      {children}
    </MemoryContext.Provider>
  );
};
