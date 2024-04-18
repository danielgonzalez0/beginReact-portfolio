import { useCallback, useEffect, useReducer } from 'react';
import { SectionWrapper } from '../atom/SectionWrapper';
import { Project } from './Project';
import { getListOfUrlRepositoriesUrl } from '../../lib/api-url';
import { GITHUB_USERNAME } from '../../lib/config';
import { Loader } from '../atom/Loader/Loader';

export const ProjectSection = () => {

  //définir mes actions 
  const FETCH_REDUCER_ACTIONS = {
    PENDING: "pending",
    RESOLVED: "resolved",
    REJECTED: "rejected",
  }

  const IDLE = {
    isLoading: false,
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

  const {error, data, isLoading} = fetchStatus;

  const runFetch = useCallback(async (url, config) => {
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
        }, 2000); // Retarder la résolution de 2 secondes
      });

      const data = await res.json();
      dispatch({ type: FETCH_REDUCER_ACTIONS.RESOLVED, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_REDUCER_ACTIONS.REJECTED, payload: error })
    }
  }, []);

  // GitHub Repository - Exercise
  useEffect(() => {
    runFetch(getListOfUrlRepositoriesUrl(GITHUB_USERNAME))
  }, []);

  if (isLoading) return <Loader />

  if (error) return <p className='text-center text-3xl'>{error.message}</p>

  return (
    <SectionWrapper title="Projects">
      <div className="flex flex-wrap justify-center gap-8">
        {data && data.map((repo, index) => <Project key={index} {...repo} />)}
      </div>
    </SectionWrapper>
  );
};
