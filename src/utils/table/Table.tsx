import type { MouseEventHandler, ReactNode } from 'react';
import { loggError } from '../logger/frontendLogger';

export type TitleCell = string | ReactNode;
export type TitleRow = TitleCell[];
type TableCell = string | number | undefined | ReactNode;
export type TableRow = Array<TableCell>;
export type TableRows = TableRow[];

export type TableProps = {
    tittelRekke: TitleRow;
    rows: TableRows;
    rowsOnClickHandlers?: Array<MouseEventHandler>;
};

export function Table({ tittelRekke, rows, rowsOnClickHandlers }: TableProps) {
    //biome-ignore lint/complexity/noForEach: biome migration
    rows.forEach((row: TableRow) => {
        if (row.length !== tittelRekke.length) {
            loggError(new Error('Ulik lengde på tittelRekke og innholdsrekke, dette bør du nok se på'));
        }
    });
    if (rowsOnClickHandlers && rowsOnClickHandlers.length !== rows.length) {
        loggError(new Error('Ulik lengde på liste med onClickHandlers og antall rows'));
    }
    return (
        /*biome-ignore lint/a11y: biome migration*/
        <table role="table">
            {/*biome-ignore lint/a11y: biome migration*/}
            <thead role="rowgroup">
                {/*biome-ignore lint/a11y: biome migration*/}
                <tr role="row">
                    {tittelRekke.map((tittel: TitleCell, index: number) => (
                        /*biome-ignore lint/a11y/useSemanticElements lint/suspicious/noArrayIndexKey: biome migration*/
                        <th role="columnheader" key={index}>
                            {tittel}
                        </th>
                    ))}
                </tr>
            </thead>
            {/*biome-ignore lint/a11y: biome migration*/}
            <tbody role="rowgroup" data-testid="table-tbody">
                {rows.map((row: TableRow, index: number) => (
                    //biome-ignore lint/a11y lint/suspicious/noArrayIndexKey: biome migration
                    <tr role="row" key={index} onClick={rowsOnClickHandlers?.[index]}>
                        {row.map((entry, i) => (
                            /*biome-ignore lint/a11y lint/suspicious/noArrayIndexKey: biome migration*/
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
