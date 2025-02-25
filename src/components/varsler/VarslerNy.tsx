import { CheckmarkCircleFillIcon, ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { LinkIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, HStack, Heading, Link, Pagination, Skeleton, Table, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { type ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import { ScrollBar, scrollBarContainerStyle } from 'src/app/personside/infotabs/utils/InfoTabsScrollBar';
import Card from 'src/components/Card';
import QueryErrorBoundary from 'src/components/QueryErrorBoundary';
import { useVarslerData } from 'src/lib/clients/modiapersonoversikt-api';
import type { FeiletVarsling, Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { pxToRem } from 'src/styles/personOversiktTheme';
import { datoSynkende } from 'src/utils/date-utils';
import { emptyReplacement } from 'src/utils/string-utils';
import { ENDASH, formaterDato } from 'src/utils/string-utils';
import styled from 'styled-components';

const routeApi = getRouteApi('/new/person/varsler');
const varselMediaTreshold = pxToRem(800);

const VarselStyle = styled.div`
    ${scrollBarContainerStyle(varselMediaTreshold)};
    @media (min-width: ${varselMediaTreshold}) {
        height: 0; /* IE11 */
        flex-grow: 1; /* IE11 */
        display: flex;
        > *:first-child {
            flex: 50% 1 1;
        }
        > *:last-child {
            flex: 50% 1 1;
        }
    }
    position: relative;
`;

interface SortState {
    orderBy: 'tittel' | 'eventId' | 'datoer' | 'harFeilteVarsel' | 'sisteDato' | 'event' | 'detaljer';
    direction: 'descending' | 'ascending';
}

function comparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (b[orderBy] == null || b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const DittNavInformasjonsLinje = ({
    tittel,
    tekst,
    className
}: {
    tittel: string;
    tekst: string;
    className?: string;
}) => {
    return (
        <HStack gap="4">
            <div className="font-bold">{tittel}</div>
            <div className={`${className} text-base`}>{tekst}</div>
        </HStack>
    );
};

const DittNavInformasjonsLinjer = ({
    varsel,
    kanaler
}: {
    varsel: Varsel;
    kanaler: string[];
}) => {
    return (
        <VStack gap="1" className="p-2">
            <HStack justify="space-between">
                <Heading level="1" size="medium">
                    {varsel.tekst}
                </Heading>
                <Link href={varsel.link}>
                    <LinkIcon fontSize="1.5rem" />
                </Link>
            </HStack>
            <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Kanaler:" tekst={emptyReplacement(kanaler?.join(', '), ENDASH)} />
        </VStack>
    );
};

const DittNavInformasjonsLinjerV2 = ({
    varsel,
    kanaler
}: {
    varsel: Varsel;
    kanaler: string[];
}) => {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;

    return (
        <>
            <DittNavInformasjonsLinjer varsel={varsel} kanaler={kanaler} />
            <VStack gap="1" className="px-2">
                <DittNavInformasjonsLinje
                    tittel="Varslet: "
                    tekst={
                        varslingsTidspunkt?.tidspunkt
                            ? `${formaterDato(varslingsTidspunkt.tidspunkt)} - ${varslingsTidspunkt.sendteKanaler.join(', ')}`
                            : '-'
                    }
                />
                {varslingsTidspunkt?.renotifikasjonTidspunkt && (
                    <DittNavInformasjonsLinje
                        tittel="Revarslet: "
                        tekst={`${formaterDato(
                            varslingsTidspunkt.renotifikasjonTidspunkt
                        )} - ${varslingsTidspunkt.renotifikasjonsKanaler.join(', ')}`}
                    />
                )}
                {varslingsTidspunkt?.harFeilteVarslinger && (
                    <>
                        <hr />
                        <FeilteVarslingerListe
                            tittel="Varslingsfeil"
                            feilteVarslinger={varslingsTidspunkt.feilteVarsliner}
                        />
                    </>
                )}
                {varslingsTidspunkt?.harFeilteRevarslinger && (
                    <>
                        <hr />
                        <FeilteVarslingerListe
                            tittel="Revarslingsfeil"
                            feilteVarslinger={varslingsTidspunkt.feilteRevarslinger}
                        />
                    </>
                )}
            </VStack>
        </>
    );
};

const FeilteVarslingerListe = ({
    tittel,
    feilteVarslinger
}: {
    tittel: string;
    feilteVarslinger: FeiletVarsling[];
}) => {
    return (
        <div className="my-2">
            <div className="font-bold">{tittel}</div>
            <div>
                {feilteVarslinger.map((varsling) => (
                    <li key={`${varsling.tidspunkt} - ${varsling.kanal}`}>
                        {formaterDato(varsling.tidspunkt)} - {varsling.kanal}: {varsling.feilmelding}
                    </li>
                ))}
            </div>
        </div>
    );
};

const dataExtractor = (
    varsel: Varsel
): {
    eventId: string;
    datoer: string[];
    sisteDato: string;
    tittel: string;
    harFeilteVarsel?: boolean;
    event: Varsel;
    detaljer?: ReactNode;
} => {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;
    const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
    const tittel = `Notifikasjon${aktiv}: ${varsel.tekst}`;
    const eventId = varsel.eventId;
    if (!varslingsTidspunkt || !varslingsTidspunkt.tidspunkt) {
        const datoer = [varsel.forstBehandlet];
        return { eventId, datoer, tittel, sisteDato: datoer[0], event: varsel };
    }

    const datoer = [varslingsTidspunkt.tidspunkt];
    if (varslingsTidspunkt.renotifikasjonTidspunkt) {
        datoer.unshift(varslingsTidspunkt.renotifikasjonTidspunkt);
    }

    const harFeilteVarsel = varslingsTidspunkt.harFeilteVarslinger || varslingsTidspunkt.harFeilteRevarslinger;

    return { eventId, datoer, tittel, sisteDato: datoer[0], harFeilteVarsel, event: varsel };
};

const varselDetailExtractor = (varsel: Varsel) => {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;
    if (!varslingsTidspunkt || !varslingsTidspunkt.tidspunkt) {
        const kanaler = ['DITT_NAV', ...varsel.eksternVarslingKanaler];
        return <DittNavInformasjonsLinjer varsel={varsel} kanaler={kanaler} />;
    }

    const kanaler = [
        'DITT_NAV',
        ...varsel.eksternVarslingKanaler,
        ...varslingsTidspunkt.renotifikasjonsKanaler
    ].unique();

    return <DittNavInformasjonsLinjerV2 varsel={varsel} kanaler={kanaler} />;
};

function VarslerNy({
    valgtVarsel,
    onVarselValg
}: {
    valgtVarsel: Varsel | undefined;
    onVarselValg: (varsel?: Varsel) => void;
}) {
    const rowsPerPage = 22;
    const { page } = routeApi.useSearch();
    const navigate = routeApi.useNavigate();
    const varslerResponse = useVarslerData();
    const varslerResult = varslerResponse.data || {
        feil: [],
        varsler: []
    };
    const [sort, setSort] = useState<SortState | undefined>();

    const varselElementer = useMemo(
        () => varslerResult.varsler.sort(datoSynkende((v) => v.forstBehandlet)).map((item) => dataExtractor(item)),
        [varslerResult, sort]
    );
    const varselSorted = useMemo(() => {
        return sort
            ? varselElementer.sort((a, b) =>
                  sort.direction === 'ascending' ? comparator(b, a, sort.orderBy) : comparator(a, b, sort.orderBy)
              )
            : varselElementer;
    }, [varslerResult, sort]);
    const varselPagniated = useMemo(
        () => varselSorted.slice((page - 1) * rowsPerPage, page * rowsPerPage),
        [varselSorted, page, sort]
    );
    const maxPage = Math.ceil(varselSorted.length / rowsPerPage);

    const onPageClick = (pageNumber: number) => {
        navigate({ search: { page: pageNumber } });
    };

    useEffect(() => {
        if (page > maxPage) {
            navigate({ search: { page: 1 } });
        }
    }, [maxPage, page, navigate]);

    const handleSort = (sortKey: string) => {
        setSort(
            sort && sortKey === sort.orderBy && sort.direction === 'descending'
                ? undefined
                : ({
                      orderBy: sortKey,
                      direction:
                          sort && sortKey === sort.orderBy && sort.direction === 'ascending'
                              ? 'descending'
                              : 'ascending'
                  } as SortState)
        );
    };

    return (
        <QueryErrorBoundary
            error={varslerResponse.error}
            loading={varslerResponse.isLoading}
            loader={
                <>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                </>
            }
        >
            <div className="flex flex-col w-full max-h-screen overflow-auto pb-6">
                <Alert variant="info" className="my-4" fullWidth={true} contentMaxWidth={false}>
                    Varsler vises kun ett år tilbake i tid. Dersom man trenger å se informasjon om eldre varsler kan man
                    lage en sak i porten for manuell uthenting.
                </Alert>
                {varslerResult.feil.length > 0 && (
                    <Alert variant="error" className="blokk-xs my-4">
                        {varslerResult.feil.join('. ')}
                    </Alert>
                )}
                <Box>
                    <Table
                        sort={sort}
                        onSortChange={(sortKey) => handleSort(sortKey)}
                        size="small"
                        className="mb-2"
                        aria-label="Varsler"
                    >
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader className="w-64" sortKey="tittel" sortable>
                                    Type
                                </Table.ColumnHeader>
                                <Table.ColumnHeader className="w-20" scope="col" sortKey="sisteDato" sortable>
                                    Dato
                                </Table.ColumnHeader>
                                <Table.ColumnHeader className="w-18" scope="col" sortKey="harFeilteVarsel" sortable>
                                    Status
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {varselPagniated.map((data, index) => {
                                return (
                                    <Table.Row
                                        key={`${data.datoer}_${data.tittel}_${index}`}
                                        onClick={() => {
                                            onVarselValg(data.event);
                                        }}
                                        selected={valgtVarsel?.eventId === data.eventId}
                                    >
                                        <Table.DataCell align="left" textSize="small">
                                            {data.tittel}
                                        </Table.DataCell>
                                        <Table.DataCell align="left" textSize="small">
                                            {data.datoer.map(formaterDato).join(', ')}
                                        </Table.DataCell>
                                        <Table.DataCell align="left" textSize="small">
                                            {data.harFeilteVarsel ? (
                                                <ExclamationmarkTriangleFillIcon fontSize="1.5rem" title="Har feil" />
                                            ) : (
                                                <CheckmarkCircleFillIcon fontSize="1.5rem" title="Ok" />
                                            )}
                                        </Table.DataCell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                    <Pagination
                        page={page}
                        onPageChange={onPageClick}
                        count={maxPage}
                        size="small"
                        srHeading={{ text: 'Varsler tabellpaginering', tag: 'h2' }}
                    />
                </Box>
            </div>
        </QueryErrorBoundary>
    );
}

function VarslerWrapper() {
    const [valgtVarsel, setValgtVarsel] = useState<Varsel | undefined>();

    return (
        <>
            <BodyShort size="large" weight="semibold">
                Varsler
            </BodyShort>
            <BodyShort size="small" weight="semibold">
                Alle varsler
            </BodyShort>
            <VarselStyle>
                <Suspense
                    fallback={
                        <Box padding="2">
                            <Skeleton variant="rounded" height={40} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </Box>
                    }
                >
                    <VarslerNy valgtVarsel={valgtVarsel} onVarselValg={setValgtVarsel} />
                </Suspense>
                <ScrollBar className={'ml-2'} keepScrollId="valgte-varsel-detailje">
                    {valgtVarsel && <Card padding="4">{varselDetailExtractor(valgtVarsel)}</Card>}
                </ScrollBar>
            </VarselStyle>
        </>
    );
}

export default VarslerWrapper;
