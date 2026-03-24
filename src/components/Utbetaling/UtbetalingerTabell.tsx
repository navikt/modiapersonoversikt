import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button, Table } from '@navikt/ds-react';
import usePrinter from 'src/components/Print/usePrinter';
import { UtbetalingDetail } from 'src/components/Utbetaling/Detail';
import { formaterNOK, getGjeldendeDatoForUtbetaling, getUtbetalingId } from 'src/components/Utbetaling/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';

const datoVisning = (utbetaling: Utbetaling) => {
    return `${formatterDato(getGjeldendeDatoForUtbetaling(utbetaling))} ${
        utbetaling.forfallsdato && !utbetaling.utbetalingsdato
            ? '(forfall)'
            : !utbetaling.forfallsdato && !utbetaling.utbetalingsdato && utbetaling.posteringsdato
              ? '(postering)'
              : ''
    }`;
};

const UtbetalingRad = ({ utbetaling }: { utbetaling: Utbetaling }) => {
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;

    return (
        <Table.ExpandableRow
            key={getUtbetalingId(utbetaling)}
            contentGutter="none"
            expandOnRowClick
            content={
                <PrinterWrapper>
                    <UtbetalingDetail utbetaling={utbetaling} />
                </PrinterWrapper>
            }
        >
            <Table.HeaderCell scope="row">{formaterNOK(utbetaling.nettobelop)}</Table.HeaderCell>
            <Table.DataCell>
                {utbetaling.ytelser.length === 1 ? utbetaling.ytelser[0].type : 'Diverse ytelser'}
            </Table.DataCell>
            <Table.DataCell>{utbetaling.utbetaltTil}</Table.DataCell>
            <Table.DataCell>{utbetaling.status}</Table.DataCell>
            <Table.DataCell>{datoVisning(utbetaling)}</Table.DataCell>
            <Table.DataCell align="right">
                <Button
                    size="small"
                    onClick={() => {
                        printer.triggerPrint();
                    }}
                    variant="tertiary"
                    icon={<PrinterSmallIcon title="Skriv ut utbetalingsdetaljer" />}
                />
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

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
                    <Table.HeaderCell scope="col" />
                </Table.Row>
            </Table.Header>
            {utbetalinger.map((utbetaling) => (
                <UtbetalingRad key={getUtbetalingId(utbetaling)} utbetaling={utbetaling} />
            ))}
        </Table>
    );
};
