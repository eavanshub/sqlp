import { FC } from 'react';

import { FormatResponseUI } from './components/FormatResponseUI';
import { Spinner } from './assets/Spinner';
import { DataSources } from './store/reducer';
import { usePlaygroundHandlers } from './hooks/usePlaygroundHandlers';
import {
  CHECKED_RADIO_CLASSES,
  UNCHECKED_RADIO_CLASSES,
} from './constants/classes';

export const App: FC = () => {
  const {
    runQuery,
    query,
    onChangeQuery,
    isLoading,
    error,
    isMySQLChecked,
    dataSource,
    onChangeDataSource,
    result,
  } = usePlaygroundHandlers();

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center">
      <div className="max-w-[800px] w-full bg-gray-900 p-5 rounded-md">
        <form
          onSubmit={runQuery}
          className="relative grid grid-cols-[1fr_auto] gap-x-0.5 items-center rounded-md p-0.5 bg-gradient-to-r from-pink via-blue to-aqua"
        >
          <textarea
            value={query}
            placeholder="Enter a query here"
            className="py-2 bg-gray-700 rounded-l-md px-3 text-white min-h-[40px]"
            onChange={onChangeQuery}
          />
          <button
            type="submit"
            className="h-full flex items-center justify-center rounded w-[120px] text-white"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Run'}
          </button>
          {error ? (
            <div className="text-rose-600 absolute -bottom-5 text-sm">
              {error}
            </div>
          ) : null}
        </form>
        <div className="mt-16">
          <div className="bg-gray-700 p-1.5 rounded-md w-fit text-sm">
            <label
              className={
                isMySQLChecked ? CHECKED_RADIO_CLASSES : UNCHECKED_RADIO_CLASSES
              }
            >
              MySQL
              <input
                type="radio"
                name="type"
                value={DataSources.MYSQL}
                className="hidden"
                checked={dataSource === DataSources.MYSQL}
                onChange={onChangeDataSource}
              />
            </label>
            <label
              className={
                !isMySQLChecked
                  ? CHECKED_RADIO_CLASSES
                  : UNCHECKED_RADIO_CLASSES
              }
            >
              MySQL + PVML
              <input
                type="radio"
                name="type"
                value={DataSources.MYSQL_PVML}
                className="hidden"
                checked={dataSource === DataSources.MYSQL_PVML}
                onChange={onChangeDataSource}
              />
            </label>
          </div>

          <div className="border border-2 border-aqua bg-gray-700 p-3 rounded-md text-white">
            <FormatResponseUI response={result[dataSource]} />
          </div>
        </div>
      </div>
    </div>
  );
};
