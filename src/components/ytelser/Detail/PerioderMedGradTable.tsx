import { Table } from '@navikt/ds-react';
import type { Utbetalingsperiode } from 'src/generated/modiapersonoversikt-api';
import { formaterDato, prosentEllerNull } from 'src/utils/string-utils';

type PeriodeMedGrad = Pick<Utbetalingsperiode, 'fom' | 'tom' | 'grad'>;

export const PerioderMedGradTable = ({ perioder }: { perioder: PeriodeMedGrad[] }) => (
    <div className="overflow-x-auto">
        <Table size="small" zebraStripes aria-label="Perioder">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Fra og med</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Til og med</Table.HeaderCell>
                    <Table.HeaderCell scope="col" align="right">
                        Grad
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {perioder.map((periode, index) => (
                    <Table.Row key={`${periode.fom}-${periode.tom}-${index}`}>
                        <Table.DataCell>{formaterDato(periode.fom)}</Table.DataCell>
                        <Table.DataCell>{formaterDato(periode.tom)}</Table.DataCell>
                        <Table.DataCell align="right">{prosentEllerNull(periode.grad)}</Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
);
