import { BodyLong, BodyShort, Box, HGrid, HStack, Heading, Table, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import * as React from 'react';
import AriaNotification from 'src/components/AriaNotification';
import Card from 'src/components/Card';
import type { DateRange } from 'src/components/DateFilters/types';
import PrintKnapp from 'src/components/PrintKnapp';
import { utbetalingFilterDateRangeAtom } from 'src/components/Utbetaling/List/Filter';
import {
    filtrerBortUtbetalingerSomIkkeErUtbetalt,
    formaterNOK,
    getBruttoSumYtelser,
    getNettoSumYtelser,
    getPeriodeFromYtelser,
    getTrekkSumYtelser,
    getTypeFromYtelse,
    getUtbetalingId,
    reduceUtbetlingerTilYtelser,
    summertBelopFraUtbetalinger
} from 'src/components/Utbetaling/List/utils';
import type { Utbetaling, Ytelse } from 'src/generated/modiapersonoversikt-api';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';
import { groupArray } from 'src/utils/groupArray';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import usePrinter from 'src/utils/print/usePrinter';
import { formaterDato, sorterAlfabetisk } from 'src/utils/string-utils';

const getTypeOgAarFromYtelse = (ytelse: Ytelse): string => {
    return `${getTypeFromYtelse(ytelse)} ${dayjs(ytelse.periode?.slutt).year()}`;
};

const getAlleUtbetalteYtelserFraUtbetalinger = (utbetalinger: Utbetaling[]) => {
    const utbetalteUtbetalinger = utbetalinger.filter(filtrerBortUtbetalingerSomIkkeErUtbetalt);
    return reduceUtbetlingerTilYtelser(utbetalteUtbetalinger);
};

const getAlleYtelsesKomponenterFraYtelser = (ytelser: Ytelse[]) => {
    return ytelser.flatMap((ytelse) => ytelse.ytelseskomponentListe ?? []);
};

const getYtelsesKomponentSammendragListe = (ytelser: Ytelse[]) => {
    const alleYtelsesKomponenter = getAlleYtelsesKomponenterFraYtelser(ytelser);
    const ytelsesKomponenterGruppertPaaType = groupArray(
        alleYtelsesKomponenter,
        (ytelseskomponent) => ytelseskomponent.ytelseskomponenttype
    );
    const listeKomponenter = ytelsesKomponenterGruppertPaaType.map((gruppe) => {
        const sum = gruppe.array.reduce((acc, ytelsesKomponent) => acc + ytelsesKomponent.ytelseskomponentbelop, 0);
        return (
            <HStack wrap={false} gap="4" justify="start" key={gruppe.category}>
                <BodyLong spacing>{gruppe.category}</BodyLong>
                <BodyLong spacing>{formaterNOK(sum)}</BodyLong>
            </HStack>
        );
    });

    return <dl>{listeKomponenter}</dl>;
};

const getYtelsesKomponentDetail = (ytelse: Ytelse) => {
    const ytelseskomponentListe = ytelse.ytelseskomponentListe.map((komponent) => ({
        type: komponent.ytelseskomponenttype,
        sats: komponent.satsbelop ? formaterNOK(komponent.satsbelop) : '-',
        antall: `${komponent.satsantall}`,
        belop: formaterNOK(komponent.ytelseskomponentbelop)
    }));

    const skattListe = ytelse.skattListe.map((komponent) => ({
        type: 'Skattetrekk',
        sats: '-',
        antall: '-',
        belop: formaterNOK(komponent.skattebelop)
    }));

    const trekkListe = ytelse.trekkListe.map((komponent) => ({
        type: komponent.trekktype,
        sats: '-',
        antall: '-',
        belop: formaterNOK(komponent.trekkbelop)
    }));

    const komponenter = ytelseskomponentListe.concat(skattListe, trekkListe);

    return (
        <VStack align="end" className="p-2 border border-border-subtle rounded-md">
            {komponenter.length > 0 && (
                <Table size="small" zebraStripes={true}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col" />
                            <Table.HeaderCell scope="col" className="w-28">
                                Sats
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" className="w-28">
                                Antall
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" className="w-24">
                                Beløp
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {komponenter.map((komponent, i) => {
                            return (
                                <Table.Row key={i + komponent.type}>
                                    <Table.DataCell>{komponent.type}</Table.DataCell>
                                    <Table.DataCell>{komponent.sats}</Table.DataCell>
                                    <Table.DataCell>{komponent.antall}</Table.DataCell>
                                    <Table.DataCell>{komponent.belop}</Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            )}
            <HStack justify="space-between" gap="3" className="my-4 mr-6">
                <BodyShort size="small" weight="semibold">
                    Utbetalt:
                </BodyShort>
                <BodyShort size="small" weight="semibold">
                    {formaterNOK(ytelse.nettobelop)}
                </BodyShort>
            </HStack>
        </VStack>
    );
};

const UtbetalingerYtelserSammendrag = ({ ytelser, expandTable }: { ytelser: Ytelse[]; expandTable: boolean }) => {
    const ytelserGruppertPaaTema = groupArray(ytelser, getTypeOgAarFromYtelse);

    return (
        <Table size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                    <Table.HeaderCell className="w-56">Periode</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Brutto</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Trekk</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Utbetalt</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {ytelserGruppertPaaTema
                    .sort((a, b) => sorterAlfabetisk(a.category, b.category))
                    .map((gruppe, i) => {
                        const ytelser = gruppe.array;
                        const ytelsesType = gruppe.category;
                        const periode = getPeriodeFromYtelser(ytelser);
                        const ytelsesKomponentSammendragListe = getYtelsesKomponentSammendragListe(ytelser);

                        return (
                            <Table.ExpandableRow
                                key={i + gruppe.category}
                                content={ytelsesKomponentSammendragListe}
                                defaultOpen={expandTable}
                            >
                                <Table.HeaderCell scope="row">{ytelsesType}</Table.HeaderCell>
                                <Table.DataCell>
                                    {formaterDato(periode.fra)} - {formaterDato(periode.til)}
                                </Table.DataCell>
                                <Table.DataCell>{formaterNOK(getBruttoSumYtelser(ytelser))}</Table.DataCell>
                                <Table.DataCell>{formaterNOK(getTrekkSumYtelser(ytelser))}</Table.DataCell>
                                <Table.DataCell>{formaterNOK(getNettoSumYtelser(ytelser))}</Table.DataCell>
                            </Table.ExpandableRow>
                        );
                    })}
            </Table.Body>
        </Table>
    );
};

const UtbetalingtYtelseDetaljer = ({ ytelser }: { ytelser: Ytelse[] }) => {
    return (
        <Table size="small" title={'Ytelser'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                    <Table.HeaderCell className="w-56">Periode</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Brutto</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Trekk</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Utbetalt</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {ytelser.map((ytelse, i) => {
                    const ytelsesType = ytelse.type ?? '';
                    const periode = ytelse.periode
                        ? `${formaterDato(ytelse.periode?.start)} - ${formaterDato(ytelse.periode?.slutt)}`
                        : '';

                    return (
                        <Table.ExpandableRow
                            key={i + ytelsesType}
                            content={getYtelsesKomponentDetail(ytelse)}
                            defaultOpen={true}
                        >
                            <Table.HeaderCell scope="row">{ytelsesType}</Table.HeaderCell>
                            <Table.DataCell>{periode}</Table.DataCell>
                            <Table.DataCell>{formaterNOK(ytelse.ytelseskomponentersum)}</Table.DataCell>
                            <Table.DataCell>{formaterNOK(ytelse.skattsum + ytelse.trekksum)}</Table.DataCell>
                            <Table.DataCell>{formaterNOK(ytelse.nettobelop)}</Table.DataCell>
                        </Table.ExpandableRow>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

const UtbetaltBelop = ({ brutto, trekk, netto }: { brutto: string; trekk: string; netto: string }) => {
    return (
        <HGrid gap="4" columns={4} marginBlock="4" paddingBlock="4" className="border-t border-border-subtle">
            <VStack justify="space-between">
                <BodyShort size="small" weight="semibold">
                    Brutto:
                </BodyShort>
                <BodyShort size="small">{brutto}</BodyShort>
            </VStack>
            <VStack justify="space-between">
                <BodyShort size="small" weight="semibold">
                    Trekk:
                </BodyShort>
                <BodyShort size="small">{trekk}</BodyShort>
            </VStack>
            <VStack justify="space-between">
                <BodyShort size="small" weight="semibold">
                    Utbetalt:
                </BodyShort>
                <BodyShort size="small">{netto}</BodyShort>
            </VStack>
        </HGrid>
    );
};
const UtbetalingDetaljer = ({ utbetaling }: { utbetaling: Utbetaling }) => {
    const printer = usePrinter();
    const printerButtonRef = React.createRef<HTMLButtonElement>();
    const brutto = summertBelopFraUtbetalinger([utbetaling], getBruttoSumYtelser);
    const trekk = summertBelopFraUtbetalinger([utbetaling], getTrekkSumYtelser);
    const netto = summertBelopFraUtbetalinger([utbetaling], getNettoSumYtelser);
    const ytelser = utbetaling.ytelser;

    const handlePrint = () => {
        loggEvent('UtskriftTotaltUtbetalt', 'usePrinter');
        printer.triggerPrint();
    };

    const PrinterWrapper = printer.printerWrapper;

    return (
        <Card padding="4" className="mt-4">
            <PrinterWrapper>
                <HStack justify="space-between">
                    <Heading as="h4" size="small">
                        {utbetaling.ytelser
                            ?.map((item) => item.type)
                            ?.unique()
                            .join(', ')}
                    </Heading>
                    <span ref={printerButtonRef}>
                        <PrintKnapp onClick={handlePrint} tittel="Skriv ut" />
                    </span>
                </HStack>
                <HGrid gap="4" columns={2} className="mt-4">
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Forfallsdato:
                        </BodyShort>
                        <BodyShort size="small">
                            {utbetaling.forfallsdato ? formatterDato(utbetaling.forfallsdato) : ''}
                        </BodyShort>
                    </VStack>
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Utbetalingsdato:
                        </BodyShort>
                        <BodyShort size="small">
                            {utbetaling.utbetalingsdato ? formatterDato(utbetaling.utbetalingsdato) : ''}
                        </BodyShort>
                    </VStack>
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Utbetalt til:
                        </BodyShort>
                        <BodyShort size="small">{utbetaling.utbetaltTil}</BodyShort>
                    </VStack>
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Kontonummer:
                        </BodyShort>
                        <BodyShort size="small">{utbetaling.konto}</BodyShort>
                    </VStack>
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Utbetalingsmetode:
                        </BodyShort>
                        <BodyShort size="small">{utbetaling.metode}</BodyShort>
                    </VStack>
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Utbetalingsstatus:
                        </BodyShort>
                        <BodyShort size="small">{utbetaling.status}</BodyShort>
                    </VStack>
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Melding:
                        </BodyShort>
                        <BodyShort size="small">{utbetaling.melding}</BodyShort>
                    </VStack>
                </HGrid>
                <UtbetaltBelop brutto={brutto} trekk={trekk} netto={netto} />
                {ytelser?.length > 0 && (
                    <div className="my-8">
                        <UtbetalingtYtelseDetaljer ytelser={ytelser} />
                    </div>
                )}
            </PrinterWrapper>
        </Card>
    );
};

const UtbetalingerSammendrag = ({ utbetalinger, periode }: { utbetalinger: Utbetaling[]; periode: DateRange }) => {
    const printer = usePrinter();
    const fom = periode.from.format('YYYY-MM-DD');
    const tom = periode.to.format('YYYY-MM-DD');
    const utbetalingsPeriode: string = `${fom} - ${tom}`;
    const brutto: string = summertBelopFraUtbetalinger(utbetalinger, getBruttoSumYtelser);
    const trekk: string = summertBelopFraUtbetalinger(utbetalinger, getTrekkSumYtelser);
    const netto: string = summertBelopFraUtbetalinger(utbetalinger, getNettoSumYtelser);
    const printerButtonRef = React.createRef<HTMLButtonElement>();
    const ytelser = getAlleUtbetalteYtelserFraUtbetalinger(utbetalinger);

    const handlePrint = () => {
        printer.triggerPrint();
    };

    const PrinterWrapper = printer.printerWrapper;

    return (
        <Card padding="4">
            <PrinterWrapper>
                <HStack justify="space-between">
                    <Heading as="h3" size="small">
                        Totalt utbetalt ({utbetalingsPeriode})
                    </Heading>
                    <span ref={printerButtonRef}>
                        <PrintKnapp onClick={handlePrint} tittel="Skriv ut" />
                    </span>
                </HStack>
                <AriaNotification
                    beskjed={`Det finnes ${utbetalinger.length} utbetalinger for valgt periode og filtrering`}
                />
                <UtbetaltBelop brutto={brutto} trekk={trekk} netto={netto} />
                <VStack gap="2" className="mt-4">
                    <BodyShort size="medium" weight="semibold">
                        Sammendrag
                    </BodyShort>
                    {ytelser?.length > 0 && <UtbetalingerYtelserSammendrag ytelser={ytelser} expandTable={true} />}
                </VStack>
            </PrinterWrapper>
        </Card>
    );
};

const routeApi = getRouteApi('/new/person/utbetaling');

export const UtbetalingDetail = () => {
    const dateRange = useAtomValue(utbetalingFilterDateRangeAtom);
    const startDato = dateRange.from.format('YYYY-MM-DD');
    const sluttDato = dateRange.to.format('YYYY-MM-DD');
    const { data } = useUtbetalinger(startDato, sluttDato);
    const utbetalinger = data?.utbetalinger ?? [];
    const { id } = routeApi.useSearch();
    const selectedUtbetaling = utbetalinger.find((item) => getUtbetalingId(item) === id);

    return (
        <VStack flexGrow="1" minHeight="0" maxHeight="100%" className="overflow-scroll">
            <Box.New>
                <UtbetalingerSammendrag utbetalinger={utbetalinger} periode={dateRange} />
            </Box.New>
            {selectedUtbetaling && (
                <Box.New>
                    <UtbetalingDetaljer utbetaling={selectedUtbetaling} />
                </Box.New>
            )}
        </VStack>
    );
};
