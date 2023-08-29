import { Dispatch } from 'react';

import {
  Action,
  DataSources,
  SET_DATASOURCE,
  SET_ERROR,
  SET_LOADING,
  SET_QUERY,
  SET_RESULT,
} from './reducer';

export const setLoading = (dispatch: Dispatch<Action>, isLoading: boolean) => {
  dispatch({ type: SET_LOADING, payload: isLoading });
};

export const setError = (dispatch: Dispatch<Action>, errorMsg: string) => {
  dispatch({ type: SET_ERROR, payload: errorMsg });
};

export const setQuery = (dispatch: Dispatch<Action>, newQuery: string) => {
  dispatch({ type: SET_QUERY, payload: newQuery });
};

export const setDataSource = (
  dispatch: Dispatch<Action>,
  newDataSource: DataSources,
) => {
  dispatch({ type: SET_DATASOURCE, payload: newDataSource });
};

export const setResult = (
  dispatch: Dispatch<Action>,
  newResult: Record<DataSources, string>,
) => {
  dispatch({ type: SET_RESULT, payload: newResult });
};
