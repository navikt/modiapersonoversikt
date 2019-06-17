/* eslint-disable jsx-a11y/no-redundant-roles */ // Bruker flex til å style tabell. Da trenger den eksplisitte roller for å funke med skjermleser
import * as React from 'react';
import { ReactNode } from 'react';
import { loggError } from '../frontendLogger';

type TitleCell = string | ReactNode;
export type TitleRow = TitleCell[];
export type TableCell = string | number | undefined | ReactNode;
export type TableRow = Array<TableCell>;
export type TableRows = TableRow[];

export type TableProps = { tittelRekke: TitleRow; rows: TableRows; rowsOnClickHandlers?: Array<() => void> };

export function Table({ tittelRekke, rows, rowsOnClickHandlers }: TableProps) {
    rows.forEach((row: TableRow) => {
        if (row.length !== tittelRekke.length) {
            loggError(new Error('Ulik lengde på tittelRekke og innholdsrekke, dette bør du nok se på'));
        }
    });
    if (rowsOnClickHandlers && rowsOnClickHandlers.length !== rows.length) {
        loggError(new Error('Ulik lengde på liste med onClickHandlers og antall rows'));
    }
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
                    <tr role="row" key={index} onClick={rowsOnClickHandlers && rowsOnClickHandlers[index]}>
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
