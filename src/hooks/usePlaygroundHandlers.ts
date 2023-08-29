import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useReducer,
} from 'react';

import { overrideFetch } from '../utils/overrideFetch';
import { DataSources, reducer } from '../store/reducer';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { initialState } from '../store/initialState';
import {
  setError,
  setDataSource,
  setLoading,
  setQuery,
  setResult,
} from '../store/actions';

export const usePlaygroundHandlers = () => {
  const [{ isLoading, dataSource, error, query, result }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    overrideFetch();
  }, []);

  const onChangeQuery: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setQuery(dispatch, event.target.value);
  };

  const onChangeDataSource: ChangeEventHandler<HTMLInputElement> = ({
    target: { value, checked },
  }) => {
    if (checked) {
      setDataSource(dispatch, value as DataSources);
    }
  };

  const isMySQLChecked = dataSource === DataSources.MYSQL;

  const runQuery: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    if (!query) {
      setError(dispatch, 'This field can not be empty.');
      return;
    }

    try {
      setLoading(dispatch, true);
      const responses = await Promise.all([
        fetch(API_ENDPOINTS.executeMySql, {
          method: 'POST',
          body: JSON.stringify({ source: DataSources.MYSQL, sql: query }),
        }),
        fetch(API_ENDPOINTS.executeMySqlPvml, {
          method: 'POST',
          body: JSON.stringify({ source: DataSources.MYSQL_PVML, sql: query }),
        }),
      ]);
      const mySqlData = await responses[0].text();
      const mySqlPvmlData = await responses[1].text();

      setResult(dispatch, {
        [DataSources.MYSQL]: mySqlData,
        [DataSources.MYSQL_PVML]: mySqlPvmlData,
      });
    } catch {
      setError(dispatch, 'Oops... Something went wrong.');
    }
  };

  return {
    runQuery,
    query,
    onChangeQuery,
    isLoading,
    error,
    isMySQLChecked,
    dataSource,
    onChangeDataSource,
    result,
  };
};
