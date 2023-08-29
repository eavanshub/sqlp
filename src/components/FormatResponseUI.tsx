import { FC, useMemo } from 'react';
import { Table, WindowScroller, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';

export const FormatResponseUI: FC<{ response: string }> = ({ response }) => {
  const { columns, tableRows } = useMemo(() => {
    try {
      const [headers, ...rows] = JSON.parse(response) as string[][];

      const transformedRows = rows?.map(values => {
        const row: Record<string, string> = {};
        headers?.forEach((column, i) => {
          row[column] = values[i];
        });
        return row;
      });
      return { columns: headers, tableRows: transformedRows };
    } catch {
      return { columns: [], tableRows: [] };
    }
  }, [response]);

  return (
    // the virtualization is added according to this requirement:
    // "there is no way to know in advance how big the resulting table is. the user needs to be able to see the full result (not necessarily at once)"
    // it renders the only items that user is able to see in the viewport
    <WindowScroller>
      {() => (
        <AutoSizer disableHeight>
          {() => (
            <Table
              width={300}
              height={400}
              headerHeight={40}
              rowHeight={26}
              rowCount={tableRows.length}
              rowGetter={({ index }) => tableRows[index]}
              headerClassName="lowercase font-semibold border border-white px-2"
              overscanColumnCount={20} // it loads sets of 20 items
            >
              {columns?.map(name => (
                <Column
                  dataKey={name}
                  width={150}
                  className="text-white border border-white px-2"
                  label={name}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};
