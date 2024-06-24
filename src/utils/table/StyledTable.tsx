import styled from 'styled-components';
import classNames from 'classnames';
import theme from '../../styles/personOversiktTheme';
import * as React from 'react';
import { Table, TableProps } from './Table';

export const TableStyle = styled.div`
    overflow: auto;
    box-shadow: 0 0 0 0.07rem rgba(0, 0, 0, 0.25);
    border-radius: ${theme.borderRadius.layout};
    background-color: white;
    [role='table'] {
        text-align: left;
        width: 100%;
        thead,
        .thead[role='rowgroup'] {
            border-bottom: 0.2rem solid rgba(0, 0, 0, 0.15);
            font-weight: 600;
        }
        [role='cell'],
        [role='columnheader'] {
            padding: 0.7rem;
            vertical-align: middle;
        }
        [role='columnheader'] {
            padding-bottom: 0.7rem;
        }
        [role='row'] {
            &:nth-child(even) {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }
`;

export function StyledTable(props: TableProps & { className?: string }) {
    const { className, ...rest } = props;
    const cls = classNames('typo-normal', className);
    return (
        <TableStyle className={cls}>
            <Table {...rest} />
        </TableStyle>
    );
}
