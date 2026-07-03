import {
    BodyShort,
    Box,
    Detail,
    Heading,
    HGrid,
    InlineMessage,
    Pagination,
    Skeleton,
    type SortState,
    Table,
    VStack
} from '@navikt/ds-react';
import { useState } from 'react';
import { AlertBanner } from 'src/components/AlertBanner';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { getOppfolgingEnhet, getVeileder } from 'src/components/Oppfolging/utils';
import {
    useArbeidsoppfolging,
    useGjeldende14aVedtak,
    useOppslagArbeidssoekerregisteret,
    useSykefravaersoppfolging
} from 'src/lib/clients/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';
import { datoEllerNull } from 'src/utils/string-utils';

const OppfolgingDetaljer = () => {
    const { data: arbeidsOppfolging, isLoading, isError } = useArbeidsoppfolging();
    const { isLoading: arbeidssoekerregisteretLoading } = useOppslagArbeidssoekerregisteret();

    if (isError) return;

    if (isLoading || arbeidssoekerregisteretLoading) return <Skeleton variant="rectangle" height={166} />;

    return (
        <>
            <Heading as="h3" size="small">
                Arbeidsoppfølging
            </Heading>
            {!arbeidsOppfolging ? (
                <Box paddingBlock="space-8">
                    <InlineMessage status="info">Brukeren har ingen oppfølging.</InlineMessage>
                </Box>
            ) : (
                <HGrid gap="space-16" columns={{ sm: 1, md: 2, lg: 4 }} className="mt-2" align="start">
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Status:
                        </BodyShort>
                        <BodyShort size="small">
                            {arbeidsOppfolging.oppfolging?.erUnderOppfolging
                                ? 'Under oppfølging'
                                : 'Ikke under oppfølging'}
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
                            Veileder:
                        </BodyShort>
                        <BodyShort size="small">{getVeileder(arbeidsOppfolging.oppfolging?.veileder)}</BodyShort>
                    </VStack>
                    <ErrorBoundary boundaryName="arbeidssoekerregisteretDetaljer">
                        <ArbeidssoekerregisteretDetaljer />
                    </ErrorBoundary>
                </HGrid>
            )}
        </>
    );
};

const Gjeldende14aVedtakDetaljer = () => {
    const { data, isLoading, isError } = useGjeldende14aVedtak();
    const gjeldende14aVedtak = data?.gjeldende14aVedtak;

    if (isError) return;

    if (isLoading) return <Skeleton variant="rectangle" height={166} />;

    return (
        <>
            <Heading as="h3" size="small">
                § 14 a-vedtak
            </Heading>
            <HGrid gap="space-16" columns={{ sm: 1, md: 2 }} className="mt-4">
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Status:
                    </BodyShort>
                    <BodyShort size="small">
                        {gjeldende14aVedtak ? 'Har § 14 a-vedtak' : 'Har ikke § 14 a-vedtak'}
                    </BodyShort>
                </VStack>
                {gjeldende14aVedtak && (
                    <>
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
                    </>
                )}
            </HGrid>
        </>
    );
};

const SykefravaersoppfolgingDetaljer = () => {
    const { data, isError, isLoading } = useSykefravaersoppfolging();
    const sykefravaersoppfolging = data?.sykefravaersoppfolging ?? [];
    const [sort, setSort] = useState<SortState | undefined>({ orderBy: 'dato', direction: 'descending' });
    const [page, setPage] = useState(1);

    if (isError) return;

    if (isLoading) return <Skeleton variant="rectangle" height={166} />;

    if (sykefravaersoppfolging.length === 0) {
        return <InlineMessage status="info">Brukeren har ingen sykefraværs-oppfølging</InlineMessage>;
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
    const tabellData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Card padding="space-16">
            <VStack gap="space-16">
                <Heading as="h3" size="small">
                    Sykefraværsoppfølging
                </Heading>
                {!sykefravaersoppfolging || sykefravaersoppfolging.length === 0 ? (
                    <InlineMessage status="info">Brukeren har ingen sykefraværs-oppfølging</InlineMessage>
                ) : (
                    <>
                        <Table zebraStripes={true} sort={sort} onSortChange={handleSort} size="small">
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
                                {tabellData.map((element, index) => {
                                    return (
                                        <Table.Row shadeOnHover={true} key={index}>
                                            <Table.DataCell>
                                                {datoEllerNull(element.dato) ?? 'Ikke angitt'}
                                            </Table.DataCell>
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
                                size="xsmall"
                            />
                        )}
                    </>
                )}
            </VStack>
        </Card>
    );
};

const ArbeidssoekerregisteretDetaljer = () => {
    const { data, isError } = useOppslagArbeidssoekerregisteret();

    if (isError) return;

    const erRegistrertSomArbeidssoker = data && !data.avsluttet;
    const detaljer = data?.opplysning;

    return (
        <VStack justify="space-between">
            <BodyShort size="small" weight="semibold">
                Arbeidssøkerstatus:
            </BodyShort>
            {erRegistrertSomArbeidssoker ? (
                <BodyShort size="small">Er registrert som arbeidssøker</BodyShort>
            ) : (
                <BodyShort size="small">
                    Er <span className="font-semibold">ikke</span> registrert som arbeidssøker
                </BodyShort>
            )}
            {detaljer && (
                <>
                    <Detail>Dato: {detaljer?.tidspunkt ? formatterDato(detaljer.tidspunkt) : 'Ikke angitt'} </Detail>
                    <Detail>Kilde: {detaljer?.sendtInnAv.kilde ?? 'Ikke angitt'}</Detail>
                </>
            )}
        </VStack>
    );
};

const OppfolgingPageContent = () => {
    const { errorMessages: gjeldende14aVedtakErrorMessage, isError: gjeldende14aVedtakErro } = useGjeldende14aVedtak();
    const { errorMessages: arbeidsoppfolgingErrorMessage, isError: arbeidsoppfolgingError } = useArbeidsoppfolging();
    const { errorMessages: syfoErrorMessage } = useSykefravaersoppfolging();
    const { errorMessages: arbeidssoekerregisteretErrorMessage } = useOppslagArbeidssoekerregisteret();

    const doubleErrors = arbeidsoppfolgingError && gjeldende14aVedtakErro;
    const hasErrors = arbeidsoppfolgingError || gjeldende14aVedtakErro;
    return (
        <VStack gap="space-4" minHeight="0" overflow="auto">
            <Heading visuallyHidden as="h2" size="small">
                Oppfølging
            </Heading>
            <AlertBanner
                alerts={[
                    ...arbeidsoppfolgingErrorMessage,
                    ...gjeldende14aVedtakErrorMessage,
                    ...syfoErrorMessage,
                    ...arbeidssoekerregisteretErrorMessage
                ]}
            />
            {!doubleErrors && (
                <Card padding="space-16">
                    <ErrorBoundary boundaryName="oppfolgingDetaljer">
                        <OppfolgingDetaljer />
                    </ErrorBoundary>
                    {!hasErrors && <div className="my-4 border border-ax-border-neutral-subtle" />}
                    <ErrorBoundary boundaryName="gjeldende14aVedtakDetaljer">
                        <Gjeldende14aVedtakDetaljer />
                    </ErrorBoundary>
                </Card>
            )}

            <ErrorBoundary boundaryName="sykefraversoppfolgingDetaljer">
                <SykefravaersoppfolgingDetaljer />
            </ErrorBoundary>
        </VStack>
    );
};

export const OppfolgingPage = () => {
    return (
        <ErrorBoundary boundaryName="OppfolgingPage" errorText="Det oppstod en feil under lasting av Oppfolging.">
            <OppfolgingPageContent />
        </ErrorBoundary>
    );
};
