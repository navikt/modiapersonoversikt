import * as React from 'react';
import { ReactNode } from 'react';

export function createTable(
    tittelrekke: (string | ReactNode)[],
    table: Array<Array<string | number | undefined | ReactNode>>
) {
    table.forEach(row => {
        if (row.length !== tittelrekke.length) {
            console.warn('Ulik lengde på tittelrekke og innholdsrekke, dette bør du nok se på', tittelrekke, row);
        }
    });
    return (
        <table role="table">
            <thead role="rowgroup">
                <tr role="row">
                    {tittelrekke.map((tittel, index) => (
                        <th role="columnheader" key={index}>
                            {tittel}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody role="rowgroup">
                {table.map((row, index) => (
                    <tr role="row" key={index}>
                        {row.map((entry, i) => (
                            <td role="cell" key={i}>
                                {entry}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
