import { useReducer } from 'react';

import { initialState } from './initialState';
import {
  DataSources,
  reducer,
  SET_DATASOURCE,
  SET_ERROR,
  SET_LOADING,
  SET_QUERY,
  SET_RESULT,
} from './reducer';

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    ...state,

    setLoading: (isLoading: boolean) => {
      dispatch({ type: SET_LOADING, payload: isLoading });
    },

    setError: (errorMsg: string) => {
      dispatch({ type: SET_ERROR, payload: errorMsg });
    },

    setQuery: (newQuery: string) => {
      dispatch({ type: SET_QUERY, payload: newQuery });
    },

    setDataSource: (newDataSource: DataSources) => {
      dispatch({ type: SET_DATASOURCE, payload: newDataSource });
    },

    setResult: (newResult: Record<DataSources, string>) => {
      dispatch({ type: SET_RESULT, payload: newResult });
    },
  };
};
