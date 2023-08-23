import { FC } from 'react';

export const FormatResponseUI: FC<{ response: string }> = ({ response }) => {
  try {
    const [headers, ...rows] = JSON.parse(response) as string[][];

    return (
      <table className="text-left">
        <thead>
          <tr>
            {headers.map(colName => (
              <th key={colName} className="border border-white px-2">
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((values, i) => (
            <tr key={i}>
              {values.map(value => (
                <td key={value} className="border border-white px-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } catch {
    return <>{response}</>;
  }
};
