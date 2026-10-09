import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading, HelpText, HStack, ReadMore, Table, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import usePrinter from 'src/components/Print/usePrinter';
import type { YtelseOppsummering } from 'src/components/Utbetaling/utils';
import {
    fargePaBelop,
    formaterNOK,
    getAlleYtelseTyper,
    oppsummerYtelserPerType,
    summertBruttobelopFraUtbetalinger,
    summertNettobelopFraUtbetalinger,
    summertSkattBelopFraUtbetalinger,
    summertTrekkBelopFraUtbetalinger,
    useFilterUtbetalinger
} from 'src/components/Utbetaling/utils';
import { formaterPeriode } from 'src/components/ytelser/utils';
import { formatterDato } from 'src/utils/date-utils';

const YtelseOppsummeringTabell = ({ rader }: { rader: YtelseOppsummering[] }) => (
    <div className="overflow-x-auto">
        <Table size="small" aria-label="Oppsummering per ytelse">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Ytelse</Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <HStack gap="space-4" align="center">
                            Periode
                            <span className="print-hide">
                                <HelpText title="Om perioden">
                                    Tidligste og seneste dato for utbetaling fra ytelsen.
                                </HelpText>
                            </span>
                        </HStack>
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" align="right">
                        Brutto
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" align="right">
                        Skattetrekk
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" align="right">
                        Trekk
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" align="right">
                        Totalt
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rader.map((rad) => (
                    <Table.Row key={rad.type}>
                        <Table.HeaderCell scope="row">{rad.type}</Table.HeaderCell>
                        <Table.DataCell>
                            {rad.periode
                                ? `${formatterDato(rad.periode.fra)} - ${formatterDato(rad.periode.til)}`
                                : 'Periode ikke tilgjengelig'}
                        </Table.DataCell>
                        <Table.DataCell align="right">{formaterNOK(rad.brutto)}</Table.DataCell>
                        <Table.DataCell align="right">{formaterNOK(rad.skatt)}</Table.DataCell>
                        <Table.DataCell align="right">{formaterNOK(rad.trekk)}</Table.DataCell>
                        <Table.DataCell align="right">{formaterNOK(rad.netto)}</Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
);

export const TotaltForPeriode = () => {
    const { data } = useFilterUtbetalinger();
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;
    const ytelserPerType = oppsummerYtelserPerType(data.utbetalinger);
    const periode = formaterPeriode({
        fra: data.periode?.startDato,
        til: data.periode?.sluttDato
    });

    return (
        <VStack>
            <Heading size="xsmall" level="3" spacing>
                Totalt utbetalt for valgt periode ({periode})
            </Heading>

            <VStack gap="space-8">
                <PrinterWrapper>
                    <BodyShort size="medium" className="print-only font-ax-bold">
                        Totalt utbetalt for periode: {periode}
                    </BodyShort>
                    <Card
                        className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell"
                        padding="space-16"
                    >
                        <VStack gap="space-16">
                            <HStack gap="space-24" justify="space-between">
                                <HStack gap="space-8" justify="space-between" flexGrow="1">
                                    <VStack gap="space-8">
                                        <BodyShort weight="semibold">Ytelser</BodyShort>
                                        <BodyShort>{getAlleYtelseTyper(data.utbetalinger).join(', ')}</BodyShort>{' '}
                                    </VStack>
                                    <HStack justify="space-between" flexGrow="1">
                                        <VStack gap="space-8">
                                            <BodyShort weight="semibold">Brutto</BodyShort>
                                            <BodyShort>
                                                {formaterNOK(summertBruttobelopFraUtbetalinger(data.utbetalinger))}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="space-8">
                                            <BodyShort weight="semibold">Skattetrekk</BodyShort>
                                            <BodyShort
                                                className={fargePaBelop(
                                                    summertSkattBelopFraUtbetalinger(data.utbetalinger)
                                                )}
                                            >
                                                {formaterNOK(summertSkattBelopFraUtbetalinger(data.utbetalinger))}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="space-8">
                                            <BodyShort weight="semibold">Trekk</BodyShort>
                                            <BodyShort
                                                className={fargePaBelop(
                                                    summertTrekkBelopFraUtbetalinger(data.utbetalinger)
                                                )}
                                            >
                                                {formaterNOK(summertTrekkBelopFraUtbetalinger(data.utbetalinger))}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="space-8">
                                            <BodyShort weight="semibold">Totalt</BodyShort>
                                            <BodyShort
                                                className={fargePaBelop(
                                                    summertNettobelopFraUtbetalinger(data.utbetalinger)
                                                )}
                                            >
                                                {formaterNOK(summertNettobelopFraUtbetalinger(data.utbetalinger))}
                                            </BodyShort>
                                        </VStack>
                                    </HStack>
                                </HStack>
                            </HStack>
                            {ytelserPerType.length > 0 && (
                                <>
                                    <div className="print-hide">
                                        <ReadMore header="Beløp per ytelse" size="small">
                                            <YtelseOppsummeringTabell rader={ytelserPerType} />
                                        </ReadMore>
                                    </div>
                                    <div className="print-only">
                                        <VStack gap="space-8">
                                            <BodyShort weight="semibold">Beløp per ytelse</BodyShort>
                                            <YtelseOppsummeringTabell rader={ytelserPerType} />
                                        </VStack>
                                    </div>
                                </>
                            )}
                        </VStack>
                    </Card>
                </PrinterWrapper>
                <VStack align="start">
                    <Button
                        size="small"
                        onClick={() => {
                            printer.triggerPrint();
                        }}
                        variant="tertiary"
                        icon={<PrinterSmallIcon aria-hidden />}
                    >
                        Skriv ut
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
};
