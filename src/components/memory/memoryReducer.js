import { CARD_STATE, GAME_STATUS, getInitialMemory } from "../../lib/memory";

export const MEMORY_REDUCER_ACTIONS = {
  RESET_GAME: "resetGame",
  RETURN_CARD: "returnCard",
  HANDLE_CARD: "handleCard",
  SET_GAME_STATUS: "setGameStatus",
  SET_SCORE: "setScore",
  SET_IS_FINISHED: "setIsFinished",
  SET_ACTUAL_CARD: "setActualCard",
};

export const MemoryInitialState = {
  cards: getInitialMemory(),
  status: GAME_STATUS.PLAYING,
  actualCard: null,
  score: 0,
};

export const memoryReducer = (state, action) => {
  switch (action.type) {

    case MEMORY_REDUCER_ACTIONS.SET_GAME_STATUS:
      return { ...state, status: action.payload.status };
    case MEMORY_REDUCER_ACTIONS.SET_SCORE:
      return { ...state, score: state.score + 1 };

    case MEMORY_REDUCER_ACTIONS.SET_ACTUAL_CARD:
      return { ...state, actualCard: action.payload.actualCard };

    case MEMORY_REDUCER_ACTIONS.RESET_GAME:
      return { ...MemoryInitialState, cards: getInitialMemory() };

    case MEMORY_REDUCER_ACTIONS.RETURN_CARD: {
      const newCards = state.cards.map(c => c.id === action.payload.id ? { ...c, state: CARD_STATE.RETURNED } : c);
      return { ...state, cards: newCards };
    }

    case MEMORY_REDUCER_ACTIONS.HANDLE_CARD: {
      const { card1, card2, newState } = action.payload;
      const newCards = state.cards.map(card => card.id === card1.id || card.id === card2.id ? { ...card, state: newState } : card);
      return { ...state, cards: newCards };
    }

    default:
      return new Error(`Invalid action type: ${action.type}`);
  }
}