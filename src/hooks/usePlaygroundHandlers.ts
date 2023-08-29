import { ChangeEventHandler, FormEventHandler, useEffect } from 'react';

import { useStore } from '../store/useStore';
import { overrideFetch } from '../utils/overrideFetch';
import { DataSources } from '../store/reducer';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const usePlaygroundHandlers = () => {
  const {
    error,
    query,
    isLoading,
    dataSource,
    result,
    setError,
    setLoading,
    setDataSource,
    setQuery,
    setResult,
  } = useStore();

  useEffect(() => {
    overrideFetch();
  }, []);

  const onChangeQuery: ChangeEventHandler<HTMLTextAreaElement> = event => {
    if (error) setError('');
    setQuery(event.target.value);
  };

  const onChangeDataSource: ChangeEventHandler<HTMLInputElement> = ({
    target: { value, checked },
  }) => {
    if (checked) {
      setDataSource(value as DataSources);
    }
  };

  const isMySQLChecked = dataSource === DataSources.MYSQL;

  const runQuery: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    if (!query) {
      setError('This field can not be empty.');
      return;
    }

    try {
      setLoading(true);
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

      setResult({
        [DataSources.MYSQL]: mySqlData,
        [DataSources.MYSQL_PVML]: mySqlPvmlData,
      });
    } catch {
      setError('Oops... Something went wrong.');
    } finally {
      setLoading(false);
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
