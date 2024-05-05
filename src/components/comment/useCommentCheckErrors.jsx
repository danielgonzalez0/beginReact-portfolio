import { useReducer } from 'react';

const intitialState = {
  nameError: "",
  commentError: ""
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME_ERROR':
      return { ...state, nameError: action.payload };
    case 'SET_COMMENT_ERROR':
      return { ...state, commentError: action.payload };
    case 'CLEAR_NAME_ERROR':
      return { ...state, nameError: "" };
    case 'CLEAR_COMMENT_ERROR':
      return { ...state, commentError: "" };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const useCommentCheckErrors = () => {

  const [state, dispatch] = useReducer(reducer, intitialState);

  const checkUserName = (userName) => {
    if (userName === undefined || userName === null) return

    if (userName.length < 3 || userName.length > 20) {
      dispatch({ type: 'SET_NAME_ERROR', payload: "Username must be between 3 and 20 characters" });
      return
    }
    dispatch({ type: 'SET_NAME_ERROR', payload: "" });
  }

  const checkComment = (comment) => {
    if (comment === undefined || comment === null) return

    if (comment.length < 10 || comment.length > 100) {
      dispatch({ type: 'SET_COMMENT_ERROR', payload: "comment must be between 10 and 100 characters" });
      return
    }
    dispatch({ type: 'SET_COMMENT_ERROR', payload: "" });
  }

  const clearNameError = () => {
    dispatch({ type: 'CLEAR_NAME_ERROR' });
  }

  const clearCommentError = () => {
    dispatch({ type: 'CLEAR_COMMENT_ERROR' });
  }

  const setErrorDB = (message) => {
    dispatch({ type: 'SET_COMMENT_ERROR', payload: message });
  }

  return { ...state, checkUserName, checkComment, clearNameError, clearCommentError, setErrorDB}

//   const [nameError, setNameError] = useState("");
//   const [commentError, setCommentError] = useState("");

//   const checkUserName = (userName) => {
//     if (userName === undefined || userName === null) return

//     if (userName.length < 3 || userName.length > 20) {
//       setNameError("Username must be between 3 and 20 characters");
//       return
//     }
//     setNameError("");
//   }

//   const checkComment = (comment) => {
//     if (comment === undefined || comment === null) return

//     if (comment.length < 10 || comment.length > 100) {
//       setCommentError("comment must be between 10 and 100 characters");
//       return
//     }
//     setCommentError("");
//   }

//   const updateErrorName = (message) => {
//     setNameError(message)
//   }
//   const updateErrorComment = (message) => {
//     setCommentError(message)
//   }
//   return { nameError, commentError, checkUserName, checkComment, updateErrorComment, updateErrorName }
};

export default useCommentCheckErrors;