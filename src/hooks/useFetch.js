import { useCallback, useEffect, useReducer } from "react";
import { useIsMounted } from "./useIsMounted";

/* GitHub Repository - Exercise */
export const useFetch = (url, config) => {
  //définir mes actions 
  const FETCH_REDUCER_ACTIONS = {
    PENDING: "pending",
    RESOLVED: "resolved",
    REJECTED: "rejected",
  }

  const IDLE = {
    isLoading: true,
    data: null,
    error: null,
  }

  //définir mon reducer cad comment je vais gérer mes états
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case FETCH_REDUCER_ACTIONS.PENDING:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_REDUCER_ACTIONS.RESOLVED:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };

      case FETCH_REDUCER_ACTIONS.REJECTED:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return new Error(`Invalid action type: ${action.type}`)
    }
  };

  const [fetchStatus, dispatch] = useReducer(fetchReducer, IDLE);

  const { error, data, isLoading } = fetchStatus;

  const isMounted = useIsMounted();

  const runFetch = useCallback(async () => {

    if(!isMounted()) return;

    dispatch({ type: FETCH_REDUCER_ACTIONS.PENDING })
    try {
      const res = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await fetch(url, config);
          if (response.ok) {
            resolve(response);
          } else {
            reject(new Error(`Error fetching data: ${response.status} ${response.statusText}`));
          }
        }, 1500); // Retarder la résolution de 2 secondes
      });

      const data = await res.json();
      dispatch({ type: FETCH_REDUCER_ACTIONS.RESOLVED, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_REDUCER_ACTIONS.REJECTED, payload: error })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, url]);

  // GitHub Repository - Exercise
  useEffect(() => {
    runFetch()
  }, [runFetch]);

  return { error, data, isLoading, runFetch };
};
