import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';

import { FormatResponseUI } from './components/FormatResponseUI';
import { overrideFetch } from './utils/overrideFetch';
import { API_ENDPOINTS } from './constants/apiEndpoints';
import { Spinner } from './assets/Spinner';

export enum DataSources {
  MYSQL = 'MYSQL',
  MYSQL_PVML = 'MYSQL_PVML',
}

const CHECKED_RADIO_CLASSES =
  'text-white py-1 px-16 bg-aqua rounded-md cursor-pointer';
const UNCHECKED_RADIO_CLASSES =
  'text-gray-400 py-1 px-16 rounded-md cursor-pointer';

export const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [dataSource, setDataSource] = useState<DataSources>(DataSources.MYSQL);
  const [result, setResult] = useState<Record<DataSources, string>>({
    [DataSources.MYSQL]: '',
    [DataSources.MYSQL_PVML]: '',
  });

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
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Run'}
          </button>
          {error && (
            <div className="text-rose-600 absolute -bottom-5 text-sm">
              {error}
            </div>
          )}
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
