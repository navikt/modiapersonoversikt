import { Table } from '@navikt/ds-react';
import { UtbetalingDetail } from 'src/components/Utbetaling/Detail';
import { formaterNOK, getGjeldendeDatoForUtbetaling, getUtbetalingId } from 'src/components/Utbetaling/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';

export const UtbetalingerTabell = ({ utbetalinger }: { utbetalinger: Utbetaling[] }) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell scope="col">Beløp</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Tema</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Mottaker</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {utbetalinger.map((utbetaling) => {
                return (
                    <Table.ExpandableRow
                        key={getUtbetalingId(utbetaling)}
                        contentGutter="none"
                        expandOnRowClick
                        content={<UtbetalingDetail utbetaling={utbetaling} />}
                    >
                        <Table.HeaderCell scope="row">{formaterNOK(utbetaling.nettobelop)}</Table.HeaderCell>
                        <Table.DataCell>
                            {utbetaling.ytelser.length === 1 ? utbetaling.ytelser[0].type : 'Diverse ytelser'}
                        </Table.DataCell>
                        <Table.DataCell>{utbetaling.utbetaltTil}</Table.DataCell>
                        <Table.DataCell>{utbetaling.status}</Table.DataCell>
                        <Table.DataCell>
                            {`${formatterDato(getGjeldendeDatoForUtbetaling(utbetaling))} ${utbetaling.forfallsdato && !utbetaling.utbetalingsdato ? '(forfall)' : utbetaling.forfallsdato && !utbetaling.utbetalingsdato ? '(postering)' : ''}`}
                        </Table.DataCell>
                    </Table.ExpandableRow>
                );
            })}
        </Table>
    );
};
