import { Accordion, BodyShort, Box, Detail, Heading, HStack, InlineMessage, Table, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import {
    fargePaBelop,
    formaterNOK,
    getAlleYtelseTyper,
    getBruttoSumYtelser,
    getGjeldendeDatoForUtbetaling,
    getTrekkOgSkattSumYtelser,
    getUtbetalingId,
    maanedOgAarForUtbetaling,
    summertBruttobelopFraUtbetalinger,
    summertNettobelopFraUtbetalinger,
    summertTrekkOgSkattBelopFraUtbetalinger,
    useFilterUtbetalinger,
    utbetalingDatoComparator
} from 'src/components/Utbetaling/utils';
import { formaterPeriode } from 'src/components/ytelser/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';
import { type GroupedArray, groupArray } from 'src/utils/groupArray';
import { twMerge } from 'tailwind-merge';

const ExpandedUtbetaling = ({ utbetaling }: { utbetaling: Utbetaling }) => {
    const ytelseliste = utbetaling.ytelser.map((ytelse, i) => (
        <VStack key={`${i}-${ytelse.type}`} gap="2">
            <VStack>
                <Heading size="xsmall" level="4">
                    Utbetaling {ytelse.type}
                </Heading>
                <BodyShort size="small">
                    Periode: {formaterPeriode({ fra: ytelse.periode?.start, til: ytelse.periode?.slutt })}
                </BodyShort>
            </VStack>

            <Card className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell" padding="2">
                <Table size="small">
                    <Table.Header>
                        <Table.Row shadeOnHover={false}>
                            <Table.HeaderCell>Detaljer</Table.HeaderCell>
                            <Table.HeaderCell>Antall</Table.HeaderCell>
                            <Table.HeaderCell align="right">Satsbeløp</Table.HeaderCell>
                            <Table.HeaderCell align="right">Beløp</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {ytelse.ytelseskomponentListe.map((komp, i) => {
                            return (
                                <Table.Row key={`${i}-${komp.ytelseskomponenttype}`} shadeOnHover={false}>
                                    <Table.DataCell scope="row">{komp.ytelseskomponenttype}</Table.DataCell>
                                    <Table.DataCell scope="row">{komp.satsantall}</Table.DataCell>
                                    <Table.DataCell align="right">
                                        {komp.satsbelop ? formaterNOK(komp.satsbelop) : '-'}
                                    </Table.DataCell>
                                    <Table.DataCell align="right">
                                        {formaterNOK(komp.ytelseskomponentbelop)}
                                    </Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                <HStack align="stretch" justify="space-between" padding="2">
                    <Heading size="xsmall">Total brutto</Heading>
                    <BodyShort>{formaterNOK(ytelse.ytelseskomponentersum)}</BodyShort>
                </HStack>
                {ytelse.trekkListe.length > 0 && (
                    <>
                        <Box.New margin="2" className="border-ax-border-neutral-subtle border-b-1"></Box.New>
                        <Table size="small">
                            <Table.Header>
                                <Table.Row shadeOnHover={false}>
                                    <Table.HeaderCell>Trekk</Table.HeaderCell>
                                    <Table.HeaderCell align="right">Beløp</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {ytelse.trekkListe.map((trekk, i) => {
                                    return (
                                        <Table.Row key={`${trekk.trekktype}-${i}`} shadeOnHover={false}>
                                            <Table.DataCell scope="row">{trekk.trekktype}</Table.DataCell>
                                            <Table.DataCell align="right">
                                                {formaterNOK(trekk.trekkbelop)}
                                            </Table.DataCell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                        <HStack align="stretch" justify="space-between" padding="2">
                            <Heading size="xsmall">Totalt trekk</Heading>
                            <BodyShort>{formaterNOK(ytelse.trekksum)}</BodyShort>
                        </HStack>
                    </>
                )}
                {ytelse.skattListe.length > 0 && (
                    <>
                        <Box.New margin="2" className="border-ax-border-neutral-subtle border-b-1"></Box.New>
                        <Table size="small">
                            <Table.Header>
                                <Table.Row shadeOnHover={false}>
                                    <Table.HeaderCell>Skatt</Table.HeaderCell>
                                    <Table.HeaderCell align="right">Beløp</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {ytelse.skattListe.map((skatt, i) => {
                                    return (
                                        <Table.Row key={`${i}-${skatt.skattebelop}`} shadeOnHover={false}>
                                            <Table.DataCell scope="row">Skatt</Table.DataCell>
                                            <Table.DataCell align="right">
                                                {formaterNOK(skatt.skattebelop)}
                                            </Table.DataCell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                        <HStack align="stretch" justify="space-between" padding="2">
                            <Heading size="xsmall">Total skatt</Heading>
                            <BodyShort>{formaterNOK(ytelse.skattsum)}</BodyShort>
                        </HStack>
                    </>
                )}
            </Card>
            <Card
                className={twMerge(
                    'rounded-(--ax-radius-8) utbetalinger-tabell',
                    ytelse.nettobelop < 0 ? 'bg-ax-bg-danger-soft' : 'bg-ax-bg-success-soft'
                )}
                padding="2"
            >
                <HStack align="stretch" justify="space-between" paddingInline="2">
                    <Heading size="xsmall">Total</Heading>
                    <BodyShort className={fargePaBelop(ytelse.nettobelop)}>{formaterNOK(ytelse.nettobelop)}</BodyShort>
                </HStack>
            </Card>
        </VStack>
    ));

    return (
        <VStack gap="8" paddingBlock="2">
            <VStack gap="2">
                <Heading size="xsmall" level="4">
                    Oppsummering av utbetalingen
                </Heading>
                <Card className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell" padding="2">
                    <VStack gap="4">
                        <HStack justify="space-between" padding="2">
                            <VStack gap="2">
                                <BodyShort weight="semibold">Kontonummer</BodyShort>
                                <BodyShort>{utbetaling.konto}</BodyShort>
                            </VStack>
                            <VStack gap="2">
                                <BodyShort weight="semibold">Brutto</BodyShort>
                                <BodyShort>{formaterNOK(getBruttoSumYtelser(utbetaling.ytelser))}</BodyShort>
                            </VStack>
                            <VStack gap="2">
                                <BodyShort weight="semibold">Trekk og skatt</BodyShort>
                                <BodyShort className={fargePaBelop(getTrekkOgSkattSumYtelser(utbetaling.ytelser))}>
                                    {formaterNOK(getTrekkOgSkattSumYtelser(utbetaling.ytelser))}
                                </BodyShort>
                            </VStack>
                            <VStack gap="2">
                                <BodyShort weight="semibold">Totalt</BodyShort>
                                <BodyShort className={fargePaBelop(utbetaling.nettobelop)}>
                                    {formaterNOK(utbetaling.nettobelop)}
                                </BodyShort>
                            </VStack>
                        </HStack>

                        <VStack paddingInline="2">
                            {utbetaling.melding && (
                                <HStack gap="2">
                                    <Detail weight="semibold">Melding</Detail>
                                    <Detail weight="semibold">{utbetaling.melding}</Detail>
                                </HStack>
                            )}
                            <HStack gap="2">
                                <Detail weight="semibold">Utbetalingsmetode:</Detail>
                                <Detail weight="semibold">{utbetaling.metode}</Detail>
                            </HStack>
                        </VStack>
                    </VStack>
                </Card>
            </VStack>
            {ytelseliste}
        </VStack>
    );
};

export const Utbetalinger = () => {
    const { data } = useFilterUtbetalinger();

    if (data.utbetalinger.length === 0) {
        return (
            <Box.New paddingBlock="4">
                <InlineMessage status="info" aria-live="polite">
                    Ingen resultat
                </InlineMessage>
            </Box.New>
        );
    }

    const utbetalingerGruppertPaaMaaned: GroupedArray<Utbetaling> = groupArray(
        data.utbetalinger.sort(utbetalingDatoComparator),
        maanedOgAarForUtbetaling
    );

    const utbetalingerGruppert = groupArray(utbetalingerGruppertPaaMaaned, (gruppe) => gruppe.category.split(' ')[1]);

    const perioder = utbetalingerGruppert.map((aar) => (
        <VStack key={aar.category}>
            <Heading size="xsmall" level="3" spacing>
                {aar.category}
            </Heading>
            <Accordion>
                {aar.array.map((periode) => (
                    <Accordion.Item key={periode.category}>
                        <Accordion.Header>{periode.category}</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap="4">
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
                                    {periode.array.map((utbetaling) => {
                                        return (
                                            <Table.ExpandableRow
                                                key={getUtbetalingId(utbetaling)}
                                                contentGutter="none"
                                                content={
                                                    <ExpandedUtbetaling
                                                        key={getUtbetalingId(utbetaling)}
                                                        utbetaling={utbetaling}
                                                    />
                                                }
                                            >
                                                <Table.HeaderCell scope="row">
                                                    {formaterNOK(utbetaling.nettobelop)}
                                                </Table.HeaderCell>
                                                <Table.DataCell>
                                                    {utbetaling.ytelser.length === 1
                                                        ? utbetaling.ytelser[0].type
                                                        : 'Diverse ytelser'}
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
                                <InlineMessage size="small" className="px-2" status="success">
                                    Totalt for {periode.category}:{' '}
                                    {formaterNOK(summertNettobelopFraUtbetalinger(periode.array))}
                                </InlineMessage>
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </VStack>
    ));

    return (
        <VStack gap="10">
            <VStack>
                <Heading size="xsmall" level="3" spacing>
                    Totalt utbetalt for valgt periode
                </Heading>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>Totalt for perioden</Accordion.Header>
                        <Accordion.Content>
                            <Card
                                className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell"
                                padding="4"
                            >
                                <VStack gap="4">
                                    <HStack justify="space-between">
                                        <VStack gap="2">
                                            <BodyShort weight="semibold">Detaljer</BodyShort>
                                            <BodyShort>
                                                {getAlleYtelseTyper(data.utbetalinger).map((type, i) => (
                                                    <>
                                                        {i === getAlleYtelseTyper(data.utbetalinger).length - 1
                                                            ? type
                                                            : `${type}, `}
                                                    </>
                                                ))}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="2">
                                            <BodyShort weight="semibold">Brutto</BodyShort>
                                            <BodyShort>
                                                {formaterNOK(summertBruttobelopFraUtbetalinger(data.utbetalinger))}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="2">
                                            <BodyShort weight="semibold">Trekk og skatt</BodyShort>
                                            <BodyShort
                                                className={fargePaBelop(
                                                    summertTrekkOgSkattBelopFraUtbetalinger(data.utbetalinger)
                                                )}
                                            >
                                                {formaterNOK(
                                                    summertTrekkOgSkattBelopFraUtbetalinger(data.utbetalinger)
                                                )}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="2">
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
                                </VStack>
                            </Card>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </VStack>

            {perioder}
        </VStack>
    );
};
