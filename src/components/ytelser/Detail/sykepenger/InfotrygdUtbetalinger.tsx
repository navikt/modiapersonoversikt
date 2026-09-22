import { Heading, InlineMessage, Table, VStack } from '@navikt/ds-react';
import { utledUtbetalingPåVentÅrsak } from 'src/app/personside/infotabs/ytelser/sykepenger/utbetalingerpåvent/utledUtbetalingerPåVentÅrsak';
import Card from 'src/components/Card';
import { formaterPeriode, formaterProsent } from 'src/components/ytelser/utils';
import type {
    CommonKommendeUtbetaling,
    Sykepenger,
    SykmeldingUtbetalingPaVent
} from 'src/generated/modiapersonoversikt-api';
import type { UtbetalingPaaVent } from 'src/models/ytelse/ytelse-utbetalinger';
import { datoEllerNull, NOKellerNull } from 'src/utils/string-utils';

const EmptyMessage = () => (
    <InlineMessage status="info" size="small">
        Ingen utbetalinger funnet
    </InlineMessage>
);

const KommendeUtbetalinger = ({ utbetalinger }: { utbetalinger: CommonKommendeUtbetaling[] }) => {
    return (
        <Card padding="space-16">
            <Heading as="h4" size="small">
                Utbetalinger
            </Heading>
            {utbetalinger.length === 0 ? (
                <EmptyMessage />
            ) : (
                <div className="overflow-x-auto">
                    <Table size="small" zebraStripes>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell scope="col">Reg.dato</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Type</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Utb.grad</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Dagsats</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Bruttobeløp</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Arbeidsgiver</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Org.nummer</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {utbetalinger.map((utbetaling, index) => (
                                <Table.Row key={`${utbetaling.utbetalingsdato ?? 'ukjent'}-${index}`}>
                                    <Table.DataCell>{datoEllerNull(utbetaling.utbetalingsdato)}</Table.DataCell>
                                    <Table.DataCell>{utbetaling.type}</Table.DataCell>
                                    <Table.DataCell>{formaterPeriode(utbetaling.vedtak)}</Table.DataCell>
                                    <Table.DataCell>{formaterProsent(utbetaling.utbetalingsgrad)}</Table.DataCell>
                                    <Table.DataCell>{NOKellerNull(utbetaling.dagsats)}</Table.DataCell>
                                    <Table.DataCell>{NOKellerNull(utbetaling.bruttobelop)}</Table.DataCell>
                                    <Table.DataCell>{utbetaling.arbeidsgiverNavn}</Table.DataCell>
                                    <Table.DataCell>{utbetaling.arbeidsgiverOrgNr}</Table.DataCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            )}
        </Card>
    );
};

const UtbetalingerPåVent = ({ utbetalinger }: { utbetalinger: SykmeldingUtbetalingPaVent[] }) => {
    return (
        <Card padding="space-16">
            <Heading as="h4" size="small">
                Utbetalinger på vent
            </Heading>
            {utbetalinger.length === 0 ? (
                <EmptyMessage />
            ) : (
                <Table size="small" zebraStripes>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Årsak</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Utbetalingsperiode</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Utbetalingsgrad</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {utbetalinger.map((utbetaling, index) => (
                            <Table.Row key={`${utbetaling.vedtak?.fra ?? 'ukjent'}-${index}`}>
                                <Table.DataCell>
                                    {utledUtbetalingPåVentÅrsak(utbetaling as UtbetalingPaaVent)}
                                </Table.DataCell>
                                <Table.DataCell>{formaterPeriode(utbetaling.vedtak)}</Table.DataCell>
                                <Table.DataCell>{formaterProsent(utbetaling.utbetalingsgrad)}</Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
        </Card>
    );
};

export const InfotrygdUtbetalinger = ({ sykepenger }: { sykepenger: Sykepenger }) => {
    return (
        <VStack gap="space-4">
            <KommendeUtbetalinger utbetalinger={sykepenger.kommendeUtbetalinger ?? []} />
            <UtbetalingerPåVent utbetalinger={sykepenger.utbetalingerPaaVent ?? []} />
        </VStack>
    );
};
