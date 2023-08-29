import { State } from './initialState';

// action types
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_QUERY = 'SET_QUERY';
export const SET_DATASOURCE = 'SET_DATASOURCE';
export const SET_RESULT = 'SET_RESULT';

export enum DataSources {
  MYSQL = 'MYSQL',
  MYSQL_PVML = 'MYSQL_PVML',
}

// action interfaces
interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetQueryAction {
  type: typeof SET_QUERY;
  payload: string;
}

interface SetDataSourceAction {
  type: typeof SET_DATASOURCE;
  payload: DataSources;
}

interface SetResultAction {
  type: typeof SET_RESULT;
  payload: Record<DataSources, string>;
}

// common action type
export type Action =
  | SetLoadingAction
  | SetErrorAction
  | SetQueryAction
  | SetDataSourceAction
  | SetResultAction;

// store reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case SET_QUERY:
      return { ...state, query: action.payload, error: '' };
    case SET_DATASOURCE:
      return { ...state, dataSource: action.payload };
    case SET_RESULT:
      return { ...state, result: action.payload, isLoading: false };
    default:
      return state;
  }
};
