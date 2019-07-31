import React from 'react';
import styled from 'styled-components';
import { JournalforingsSak } from './JournalforingPanel';
import theme from '../../../../../../../styles/personOversiktTheme';
import { TableStyle } from '../../../../../../../utils/table/StyledTable';

const DivTable = styled(TableStyle)`
    [role='table'] {
        display: table;
        border-collapse: collapse;
    }
    .thead[role='rowgroup'] {
        display: table-header-group;
    }
    .tbody[role='rowgroup'] {
        display: table-row-group;
    }
    [role='row'] {
        display: table-row;
    }
    [role='cell'],
    [role='columnheader'] {
        display: table-cell;
    }
`;

const Row = styled.a.attrs({
    role: 'row',
    href: '#'
})`
    text-decoration: none;
    color: ${theme.color.morkGra};

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
    line-height: 22px;
`;

interface Props {
    saker: Array<JournalforingsSak>;
    velgSak(sak: JournalforingsSak): void;
}

function SaksTabell(props: Props) {
    const rows = props.saker.map(sak => (
        <Row
            key={sak.saksId}
            onClick={() => {
                props.velgSak(sak);
            }}
        >
            <Cell>{sak.saksId}</Cell>
            <Cell>{sak.opprettetDatoFormatert}</Cell>
            <Cell>{sak.fagsystemNavn}</Cell>
        </Row>
    ));

    return (
        <DivTable>
            <div role="table" className="typo-normal">
                <div role="rowgroup" className="thead">
                    <div role="row">
                        <div role="columnheader">Saks id</div>
                        <div role="columnheader">Opprettet dato</div>
                        <div role="columnheader">Fagsystem</div>
                    </div>
                </div>
                <div role="rowgroup" className="tbody">
                    {rows}
                </div>
            </div>
        </DivTable>
    );
}

export default SaksTabell;
