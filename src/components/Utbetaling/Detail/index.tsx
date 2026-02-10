import { PrinterSmallIcon } from '@navikt/aksel-icons';
import {
    Alert,
    BodyLong,
    BodyShort,
    Box,
    Button,
    Heading,
    HGrid,
    HStack,
    Skeleton,
    Table,
    VStack
} from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import type { DateRange } from 'src/components/DateFilters/types';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { utbetalingFilterAtom, utbetalingFilterDateRangeAtom } from 'src/components/Utbetaling/List/Filter';
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
    summertBelopFraUtbetalinger,
    useFilterUtbetalinger
} from 'src/components/Utbetaling/List/utils';
import type { Utbetaling, Ytelse } from 'src/generated/modiapersonoversikt-api';
import { utbetalingRouteMiddleware } from 'src/routes/new/person/utbetaling';
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
                            <Table.DataCell scope="col" />
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
                    Nettobeløp:
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
            <caption className="font-bold text-left ">Sammendrag</caption>
            <Table.Header>
                <Table.Row>
                    <Table.DataCell />
                    <Table.DataCell />
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
                                    {formaterDato(periode.start)} - {formaterDato(periode.slutt)}
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
                    <Table.DataCell />
                    <Table.DataCell />
                    <Table.HeaderCell className="w-56">Periode</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Brutto</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Trekk</Table.HeaderCell>
                    <Table.HeaderCell className="w-28">Netto</Table.HeaderCell>
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
    const brutto = summertBelopFraUtbetalinger([utbetaling], getBruttoSumYtelser, false);
    const trekk = summertBelopFraUtbetalinger([utbetaling], getTrekkSumYtelser, true);
    const netto = summertBelopFraUtbetalinger([utbetaling], getNettoSumYtelser, true);
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
                    <Button
                        size="small"
                        variant="tertiary"
                        iconPosition="right"
                        icon={<PrinterSmallIcon aria-hidden />}
                        onClick={handlePrint}
                    >
                        Skriv ut
                    </Button>
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
    const utbetalingsPeriode = `${fom} - ${tom}`;
    const brutto = summertBelopFraUtbetalinger(utbetalinger, getBruttoSumYtelser, false);
    const trekk = summertBelopFraUtbetalinger(utbetalinger, getTrekkSumYtelser, true);
    const netto = summertBelopFraUtbetalinger(utbetalinger, getNettoSumYtelser, true);
    const ytelser = getAlleUtbetalteYtelserFraUtbetalinger(utbetalinger);

    const handlePrint = () => {
        printer.triggerPrint();
    };

    const PrinterWrapper = printer.printerWrapper;

    return (
        <Card padding="4">
            <PrinterWrapper>
                <HStack justify="space-between">
                    <Heading as="h3" size="xsmall">
                        Totalt utbetalt ({utbetalingsPeriode})
                    </Heading>
                    <Button
                        size="small"
                        variant="tertiary"
                        iconPosition="right"
                        icon={<PrinterSmallIcon aria-hidden />}
                        onClick={handlePrint}
                    >
                        Skriv ut
                    </Button>
                </HStack>
                <BodyShort size="small">
                    Det finnes {utbetalinger.length} utbetalinger for valgt periode og filtrering
                </BodyShort>
                <UtbetaltBelop brutto={brutto} trekk={trekk} netto={netto} />
                <VStack gap="2" className="mt-4">
                    {ytelser?.length > 0 && <UtbetalingerYtelserSammendrag ytelser={ytelser} expandTable={true} />}
                </VStack>
            </PrinterWrapper>
        </Card>
    );
};

const routeApi = getRouteApi('/new/person/utbetaling');

const UtbetalingDetail = ({ utbetalinger }: { utbetalinger: Utbetaling[] }) => {
    const { id } = routeApi.useSearch();
    const selectedUtbetaling = utbetalinger.find((item) => getUtbetalingId(item) === id);
    const filterAtomValue = useAtomValue(utbetalingFilterAtom);
    const prevFilterRef = useRef(utbetalingFilterAtom);
    const navigate = routeApi.useNavigate();

    // Fjern utbetalingid i URL og cache hvis filteret er endret og utbetalingen ikke finnes i filtrerte utbetalinger
    useEffect(() => {
        const filterEndret = JSON.stringify(prevFilterRef.current.init) !== JSON.stringify(filterAtomValue);
        const utbetalingIkkeIListe = !selectedUtbetaling || !utbetalinger.includes(selectedUtbetaling);
        if (filterEndret && utbetalingIkkeIListe) {
            utbetalingRouteMiddleware.clear();
        }
    }, [selectedUtbetaling, utbetalinger, filterAtomValue]);

    if (utbetalinger.length === 0) {
        return <></>;
    }

    if (!selectedUtbetaling && id) {
        return (
            <VStack flexGrow="1" minHeight="0" className="mt-6">
                <Alert variant="error">Utbetalingen du valgte, ble ikke funnet.</Alert>
            </VStack>
        );
    }

    if (!id && !selectedUtbetaling) {
        navigate({ search: { id: getUtbetalingId(utbetalinger[0]) } });
    }

    return (
        <Box.New>
            <UtbetalingDetaljer utbetaling={selectedUtbetaling ?? utbetalinger[0]} />
        </Box.New>
    );
};

const UtbetalingerDetail = ({ utbetalinger }: { utbetalinger: Utbetaling[] }) => {
    const dateRange = useAtomValue(utbetalingFilterDateRangeAtom);

    return (
        <VStack flexGrow="1" minHeight="0" maxHeight="100%" overflow="auto">
            <Box.New>
                <UtbetalingerSammendrag utbetalinger={utbetalinger} periode={dateRange} />
            </Box.New>
            <UtbetalingDetail utbetalinger={utbetalinger} />
        </VStack>
    );
};

export const UtbetalingerDetailPage = () => {
    const { data, isLoading, isError } = useFilterUtbetalinger();
    const utbetalinger = data?.utbetalinger ?? [];

    if (isError) return;
    return (
        <ErrorBoundary
            boundaryName="utbetalingerDetailPage"
            errorText="Det oppstod en feil under visning av utbetalinger detailjer"
        >
            {isLoading ? (
                <Skeleton variant="rectangle" height="4rem" />
            ) : (
                <UtbetalingerDetail utbetalinger={utbetalinger} />
            )}
        </ErrorBoundary>
    );
};
