import * as React from 'react';
import { ReactNode } from 'react';

type TitleCell = string | ReactNode;
export type TitleRow = TitleCell[];
export type TableCell = string | number | undefined | ReactNode;
export type TableRow = Array<TableCell>;
export type TableRows = TableRow[];

export type TableProps = { tittelRekke: TitleRow; rows: TableRows };

export function Table({ tittelRekke, rows }: TableProps) {
    rows.forEach((row: TableRow) => {
        if (row.length !== tittelRekke.length) {
            console.warn('Ulik lengde på tittelRekke og innholdsrekke, dette bør du nok se på', tittelRekke, row);
        }
    });
    return (
        <table role="table">
            <thead role="rowgroup">
                <tr role="row">
                    {tittelRekke.map((tittel: TitleCell, index: number) => (
                        <th role="columnheader" key={index}>
                            {tittel}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody role="rowgroup">
                {rows.map((row: TableRow, index: number) => (
                    <tr role="row" key={index}>
                        {row.map((entry, i) => (
                            <td role="cell" key={i}>
                                {entry || (entry === 0 && '0') || '\u2014'}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
