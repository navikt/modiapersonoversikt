import * as React from 'react';

export function createTable(tittelrekke: string[], table: Array<Array<string | number | undefined>>) {
    return (
        <table role="table">
            <thead role="rowgroup">
                <tr role="row">
                    {tittelrekke.map(tittel => (
                        <th role="columnheader" key={tittel}>
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
