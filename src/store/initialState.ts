import { DataSources } from './reducer';

export interface State {
  isLoading: boolean;
  error: string;
  query: string;
  dataSource: DataSources;
  result: Record<DataSources, string>;
}

export const initialState: State = {
  isLoading: false,
  error: '',
  query: '',
  dataSource: DataSources.MYSQL,
  result: {
    [DataSources.MYSQL]: '',
    [DataSources.MYSQL_PVML]: '',
  },
};
