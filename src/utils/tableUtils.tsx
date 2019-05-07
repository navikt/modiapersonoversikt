import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';

export type TittelRekke = (string | ReactNode)[];
export type TableRow = Array<string | number | undefined | ReactNode>;
export type TableRows = TableRow[];

export function createTable(tittelrekke: TittelRekke, rows: TableRows) {
    rows.forEach(row => {
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
                {rows.map((row, index) => (
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

const TableStyle = styled.div`
    overflow: auto;
    box-shadow: 0 0 0 0.1rem rgba(0, 0, 0, 0.25);
    border-radius: ${theme.borderRadius.layout};
    background-color: white;
    table {
        text-align: left;
        width: 100%;
        thead {
            border-bottom: 0.2rem solid rgba(0, 0, 0, 0.15);
            font-weight: bold;
        }
        th,
        td {
            padding: 0.7rem;
            vertical-align: middle;
        }
        th {
            padding-bottom: 0.7rem;
        }
        tr:nth-child(even) {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
`;

export function StyledTable(props: { tittelRekke: TittelRekke; rows: TableRows }) {
    return <TableStyle className="typo-normal">{createTable(props.tittelRekke, props.rows)}</TableStyle>;
}
