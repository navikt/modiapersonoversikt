// Ved å bytte ut `tr`/`td` etc med html-elementer mister man tabell-semantikken og styling
// Div-Table gjennopprettet denne vha role=XXX og display-attributtet, samtidig som man har mer fleksibilitet i tabellen
import styled from 'styled-components/macro';
import { TableStyle } from './StyledTable';
import theme, { pxToRem } from '../../styles/personOversiktTheme';
import { TableProps, TableRow, TitleCell } from './Table';
import { loggError } from '../logger/frontendLogger';
import { default as React } from 'react';

const Style = styled(TableStyle)`
    [role='table'] {
        display: table;
        border-collapse: collapse;

        .thead[role='rowgroup'] {
            display: table-header-group;
        }
        .tbody[role='rowgroup'] {
            display: table-row-group;
        }
        [role='row'] {
            display: table-row;
        }
        [role='columnheader'] {
            font-size: ${pxToRem(14)};
        }
        [role='cell'],
        [role='columnheader'] {
            display: table-cell;
            padding: 0.25rem;
        }
    }
`;

const Row = styled.a.attrs({
    role: 'row',
    href: '#'
})`
    text-decoration: none;
    color: ${theme.color.navMorkGra};

    &:hover {
        background-color: rgba(0, 0, 0, 0.2) !important;
    }
    &:focus {
        ${theme.focusInset}
    }
`;

const Cell = styled.div.attrs({
    role: 'cell'
})`
    line-height: ${pxToRem(22)};
`;

export function ClickableTable({ tittelRekke, rows, rowsOnClickHandlers }: TableProps) {
    rows.forEach((row: TableRow) => {
        if (row.length !== tittelRekke.length) {
            loggError(new Error('Ulik lengde på tittelRekke og innholdsrekke, dette bør du nok se på'));
        }
    });
    if (rowsOnClickHandlers && rowsOnClickHandlers.length !== rows.length) {
        loggError(new Error('Ulik lengde på liste med onClickHandlers og antall rows'));
    }
    return (
        <Style>
            <div role="table" className="typo-normal">
                <div role="rowgroup" className="thead">
                    <div role="row">
                        {tittelRekke.map((tittel: TitleCell, index: number) => (
                            <div role="columnheader" key={index}>
                                {tittel}
                            </div>
                        ))}
                    </div>
                </div>
                <div role="rowgroup" className="tbody">
                    {rows.map((row: TableRow, index: number) => (
                        <Row key={index} onClick={rowsOnClickHandlers && rowsOnClickHandlers[index]}>
                            {row.map((entry, i) => (
                                <Cell key={i}>{entry || (entry === 0 && '0') || '\u2014'}</Cell>
                            ))}
                        </Row>
                    ))}
                </div>
            </div>
        </Style>
    );
}
