import { Alert, BodyShort, Heading, HGrid, Pagination, Skeleton, SortState, Table, VStack } from '@navikt/ds-react';
import { Suspense, useState } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { getMeldeplikt, getOppfolgingEnhet, getVeileder } from 'src/components/Oppfolging/utils';
import {
    useGjeldende14aVedtak,
    useArbeidsoppfolging,
    useSykefravaersoppfolging
} from 'src/lib/clients/modiapersonoversikt-api';
import { datoEllerNull } from 'src/utils/string-utils';

const OppfolgingDetaljer = () => {
    const arbeidsOppfolgingResponse = useArbeidsoppfolging();
    const arbeidsOppfolging = arbeidsOppfolgingResponse.data;
    if (!arbeidsOppfolging) {
        return <Alert variant="info">Brukeren har ingen oppfølging.</Alert>;
    }

    return (
        <div>
            <Heading as="h4" size="small">
                Arbeidsoppfølging
            </Heading>
            <HGrid gap="4" columns={{ sm: 1, md: 2, lg: 4 }} className="mt-2">
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Status:
                    </BodyShort>
                    <BodyShort size="small">
                        {arbeidsOppfolging.oppfolging?.erUnderOppfolging ? 'Under oppfølging' : 'Ikke under oppfølging'}
                    </BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Oppfølgingsenhet:
                    </BodyShort>
                    <BodyShort size="small">{getOppfolgingEnhet(arbeidsOppfolging.oppfolging)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Rettighetsgruppe:
                    </BodyShort>
                    <BodyShort size="small">{arbeidsOppfolging.rettighetsgruppe}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Veileder:
                    </BodyShort>
                    <BodyShort size="small">{getVeileder(arbeidsOppfolging.oppfolging?.veileder)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Meldeplikt:
                    </BodyShort>
                    <BodyShort size="small">{getMeldeplikt(arbeidsOppfolging.meldeplikt)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Formidlingsgruppe:
                    </BodyShort>
                    <BodyShort size="small">{arbeidsOppfolging.formidlingsgruppe}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Oppfølgingsvedtak:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(arbeidsOppfolging.vedtaksdato)}</BodyShort>
                </VStack>
            </HGrid>
        </div>
    );
};

const Gjeldende14aVedtakDetaljer = () => {
    const gjeldende14aVedtakResponse = useGjeldende14aVedtak();
    const gjeldende14aVedtak = gjeldende14aVedtakResponse.data.gjeldende14aVedtak;

    return (
        <div>
            <Heading as="h4" size="small">
                14 a-vedtak
            </Heading>
            <HGrid gap="4" columns={{ sm: 1, md: 2 }} className="mt-4">
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Status:
                    </BodyShort>
                    <BodyShort size="small">{gjeldende14aVedtak ? 'Har 14a vedtak' : 'Har ikke 14a vedtak'}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Innsatsgruppe:
                    </BodyShort>
                    <BodyShort size="small">{gjeldende14aVedtak?.innsatsgruppe.beskrivelse}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Hovedmål:
                    </BodyShort>
                    <BodyShort size="small">{gjeldende14aVedtak?.hovedmal?.beskrivelse}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Vedtaksdato:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(gjeldende14aVedtak?.fattetDato)}</BodyShort>
                </VStack>
            </HGrid>
        </div>
    );
};

const SykefravaersoppfolgingDetaljer = () => {
    const sykefravaersoppfolgingResponse = useSykefravaersoppfolging();
    const sykefravaersoppfolging = sykefravaersoppfolgingResponse.data;
    const [sort, setSort] = useState<SortState | undefined>({ orderBy: 'dato', direction: 'descending' });
    const [page, setPage] = useState(1);

    if (!sykefravaersoppfolging) {
        return <Alert variant="info">Brukeren har ingen sykefraværs-oppfølging.</Alert>;
    }

    const handleSort = (sortKey: string) => {
        setSort((prevSort) =>
            prevSort?.orderBy === sortKey && prevSort.direction === 'ascending'
                ? { orderBy: sortKey, direction: 'descending' }
                : { orderBy: sortKey, direction: 'ascending' }
        );
    };

    const sortedData = [...sykefravaersoppfolging].sort((a, b) => {
        if (!sort) return 0;

        const dateA = a.dato ? new Date(a.dato).getTime() : 0;
        const dateB = b.dato ? new Date(b.dato).getTime() : 0;

        return sort.direction === 'ascending' ? dateA - dateB : dateB - dateA;
    });

    const rowsPerPage = 10;
    const data = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div>
            <VStack gap="space-16">
                <Heading as="h4" size="small">
                    Sykefraværsoppfølging
                </Heading>
                <Table zebraStripes={true} sort={sort} onSortChange={handleSort}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader sortKey="dato" sortable>
                                Innen
                            </Table.ColumnHeader>
                            <Table.HeaderCell scope="col">Hendelse</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((element, index) => {
                            return (
                                <Table.Row shadeOnHover={true} key={index}>
                                    <Table.DataCell>{datoEllerNull(element.dato) ?? 'Ikke angitt'}</Table.DataCell>
                                    <Table.DataCell>{element.syfoHendelse ?? 'Ikke angitt'}</Table.DataCell>
                                    <Table.DataCell>{element.status ?? 'Ikke angitt'}</Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                {sortedData.length > rowsPerPage && (
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        count={Math.ceil(sortedData.length / rowsPerPage)}
                        size="small"
                    />
                )}
            </VStack>
        </div>
    );
};

export const OppfolgingPage = () => {
    return (
        <VStack gap="2" minHeight="0" overflow="auto">
            <Heading visuallyHidden size="small">
                Oppfølging
            </Heading>
            <Card padding="4">
                <ErrorBoundary boundaryName="oppfolgingDetaljer">
                    <Suspense fallback={<Skeleton variant="rounded" height={166} />}>
                        <OppfolgingDetaljer />
                    </Suspense>
                </ErrorBoundary>
                <div className="my-4 border-t border-border-subtle" />
                <ErrorBoundary boundaryName="gjeldende14aVedtakDetaljer">
                    <Suspense fallback={<Skeleton variant="rounded" height={166} />}>
                        <Gjeldende14aVedtakDetaljer />
                    </Suspense>
                </ErrorBoundary>
            </Card>
            <Card padding="4">
                <ErrorBoundary boundaryName="sykefraversoppfolgingDetaljer">
                    <Suspense fallback={<Skeleton variant="rounded" height={166} />}>
                        <SykefravaersoppfolgingDetaljer />
                    </Suspense>
                </ErrorBoundary>
            </Card>
        </VStack>
    );
};
