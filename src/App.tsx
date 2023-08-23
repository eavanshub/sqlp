import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { FormatResponseUI } from './components/FormatResponseUI';
import { setupFakeFetch } from './utils/fakeFetch';
import { API_ENDPOINTS } from './constants/apiEndpoints';

enum DataSources {
  MYSQL = 'MYSQL',
  MYSQL_PVML = 'MYSQL_PVML',
}

const CHECKED_RADIO_CLASSES =
  'text-white py-1 px-16 bg-aqua rounded-md cursor-pointer';
const UNCHECKED_RADIO_CLASSES =
  'text-gray-400 py-1 px-16 rounded-md cursor-pointer';

export const App: FC = () => {
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [dataSource, setDataSource] = useState<DataSources>(DataSources.MYSQL);
  const [result, setResult] = useState<Record<DataSources, string>>({
    [DataSources.MYSQL]: '',
    [DataSources.MYSQL_PVML]: '',
  });

  useEffect(() => {
    setupFakeFetch();
  }, []);

  const onChangeQuery: ChangeEventHandler<HTMLInputElement> = event => {
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

    try {
      // check if the value is a valid JSON format
      // and it has all the required fields
      const { source, sql } = JSON.parse(query);
      if (!source || !sql) throw new Error();

      const endpoint =
        API_ENDPOINTS[
          dataSource === DataSources.MYSQL ? 'executeMySql' : 'executeMySqlPvml'
        ];

      const response = await fetch(endpoint, {
        method: 'POST',
        body: query,
      });
      const data = await response.text();

      setResult(prevState => ({ ...prevState, [dataSource]: data }));
      setQuery('');
    } catch {
      setError('Incorrect input.');
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center">
      <div className="max-w-[800px] w-full bg-gray-900 p-5 rounded-md">
        <form
          onSubmit={runQuery}
          className="relative grid grid-cols-[1fr_auto] items-center rounded-md p-0.5 bg-gradient-to-r from-pink via-blue to-aqua"
        >
          <input
            value={query}
            type="text"
            placeholder="Enter a query here"
            className="py-2 bg-gray-700 rounded-l-md px-3 text-white"
            onChange={onChangeQuery}
          />
          <button type="submit" className="py-2 px-14 text-white">
            Run
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

          <div className="border border-2 border-aqua bg-gray-700 h-72 p-3 rounded-md text-white">
            <FormatResponseUI response={result[dataSource]} />
          </div>
        </div>
      </div>
    </div>
  );
};
