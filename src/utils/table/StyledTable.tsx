import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import * as React from 'react';
import { Table, TableProps } from './Table';

const TableStyle = styled.div`
    overflow: auto;
    box-shadow: 0 0 0 0.07rem rgba(0, 0, 0, 0.25);
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

export function StyledTable(props: TableProps) {
    return (
        <TableStyle className="typo-normal">
            <Table {...props} />
        </TableStyle>
    );
}
