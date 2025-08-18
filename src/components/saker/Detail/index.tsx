import { ExternalLinkIcon } from '@navikt/aksel-icons';
import {
    Accordion,
    Alert,
    BodyShort,
    Box,
    Button,
    Fieldset,
    HStack,
    Heading,
    Skeleton,
    Spacer,
    Switch,
    Tabs,
    VStack
} from '@navikt/ds-react';
import { Link, getRouteApi } from '@tanstack/react-router';
import { useAtom, useAtomValue } from 'jotai/index';
import { Suspense, useCallback, useState } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import DokumentVisning from 'src/components/saker/Detail/DokumentVisning';
import ViktigAaVite from 'src/components/saker/Detail/viktigavite/ViktigAaVite';
import { sakerFilterAtom, sakerFilterAvsenderAtom } from 'src/components/saker/List/Filter';
import {
    constructNorg2FrontendLink,
    dokumentKanVises,
    getSakId,
    getSaksdokumentUrl,
    hentBrukerNavn,
    sakerAvsender,
    tekstBasertPaRetning,
    useFilterSaker
} from 'src/components/saker/utils';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type {
    Dokument,
    Dokumentmetadata,
    DokumentmetadataAvsender,
    SaksDokumenter
} from 'src/generated/modiapersonoversikt-api';
import { DokumentDokumentStatus } from 'src/generated/modiapersonoversikt-api';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';
import baseurlsResource from 'src/rest/resources/baseurlsResource';
import { formatterDato, formatterDatoTid } from 'src/utils/date-utils';
import { datoEllerNull } from 'src/utils/string-utils';

export const SakDetailPage = () => {
    const routeApi = getRouteApi('/new/person/saker');
    const fnr = usePersonAtomValue();
    const {
        data: { person }
    } = usePersonData();
    const brukersNavn = hentBrukerNavn(person);

    const JournalPostVedlegg = ({ journalPost }: { journalPost: Dokumentmetadata }) => {
        if (journalPost.vedlegg.length === 0) {
            return (
                <Alert variant="info" className="my-4">
                    Valgte sak har ikke vedlegg.
                </Alert>
            );
        }
        const [openMap, setOpenMap] = useState<{
            [key: string]: boolean;
        }>({});

        const handleAccordionChange = (id: string, isOpen: boolean) => {
            setOpenMap({
                ...openMap,
                [id]: isOpen
            });
        };

        return (
            <Accordion size="small" headingSize="xsmall">
                {journalPost.vedlegg.map((vedlegg, index) => {
                    const key = `${index}`;
                    const isOpen = openMap[key] ?? false;
                    return (
                        <Accordion.Item
                            key={key}
                            open={isOpen}
                            onOpenChange={() => handleAccordionChange(key, !isOpen)}
                        >
                            <Accordion.Header>
                                {vedlegg.tittel}({tekstBasertPaRetning(brukersNavn, journalPost)})
                            </Accordion.Header>
                            <Accordion.Content>
                                {isOpen && (
                                    <VStack gap="4" flexGrow="1" className="overflow-scroll">
                                        <Dokument
                                            journalPost={journalPost}
                                            kanVises={!vedlegg.logiskDokument}
                                            dokument={vedlegg}
                                        />
                                    </VStack>
                                )}
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        );
    };

    const JournalPoster = ({ journalPoster, columns }: { journalPoster: Dokumentmetadata[]; columns?: number }) => {
        if (journalPoster.length === 0) {
            return <Alert variant="info">Valgte sak har ikke dokumenter.</Alert>;
        }
        const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});

        const getDokumentEntries = (journalPost: Dokumentmetadata, dokument: Dokument) => {
            return {
                Dato: datoEllerNull(journalPost.dato),
                JournalpostId: journalPost.journalpostId,
                Avsender: journalPost.avsender,
                Mottaker: journalPost.mottaker,
                Status: dokument.dokumentStatus,
                Lestdato: journalPost.lestDato ? formatterDatoTid(new Date(journalPost.lestDato)) : 'Ikke lest',
                Vedlegg: `Dokumentet har ${journalPost.vedlegg.length} vedlegg`
            };
        };

        const handleAccordionChange = (id: string, isOpen: boolean) => {
            setOpenMap({
                ...openMap,
                [id]: isOpen
            });
        };

        return (
            <VStack gap="2">
                <Accordion size="small" headingSize="xsmall">
                    {journalPoster.map((journalPost) => {
                        const hovedDokument = journalPost.hoveddokument;
                        const tilgangTilHoveddokument = dokumentKanVises(journalPost, hovedDokument);
                        const isOpen = openMap[journalPost.id] ?? false;
                        return (
                            <Accordion.Item
                                key={journalPost.id}
                                open={isOpen}
                                onOpenChange={() => handleAccordionChange(journalPost.id, !isOpen)}
                            >
                                <Accordion.Header>
                                    <VStack gap="2">
                                        <BodyShort size="small" weight="semibold">
                                            {tekstBasertPaRetning(brukersNavn, journalPost)} (
                                            {datoEllerNull(journalPost.dato)})
                                        </BodyShort>
                                        <BodyShort size="small"> {hovedDokument.tittel}</BodyShort>
                                    </VStack>
                                </Accordion.Header>
                                <Accordion.Content>
                                    {isOpen && (
                                        <VStack gap="4" flexGrow="1" className="overflow-scroll">
                                            <TitleValuePairsComponent
                                                entries={getDokumentEntries(journalPost, hovedDokument)}
                                                columns={columns}
                                            />
                                            <Tabs size="small" defaultValue="hoveddokument">
                                                <Tabs.List>
                                                    <Tabs.Tab value="hoveddokument" label="Hoveddokument" />
                                                    <Tabs.Tab value="vedlegg" label="Vedlegg" />
                                                </Tabs.List>
                                                <Tabs.Panel lazy={true} value="hoveddokument">
                                                    <Dokument
                                                        journalPost={journalPost}
                                                        dokument={hovedDokument}
                                                        kanVises={tilgangTilHoveddokument}
                                                    />
                                                </Tabs.Panel>
                                                <Tabs.Panel lazy={true} value="vedlegg">
                                                    <JournalPostVedlegg journalPost={journalPost} />
                                                </Tabs.Panel>
                                            </Tabs>
                                        </VStack>
                                    )}
                                </Accordion.Content>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            </VStack>
        );
    };

    const Dokument = ({
        journalPost,
        dokument,
        kanVises
    }: { journalPost: Dokumentmetadata; dokument: Dokument; kanVises: boolean }) => {
        const journalpostId = journalPost.journalpostId;
        const dokumentReferanse = dokument.dokumentreferanse;
        const ikkeTilgjengelig = journalpostId === null || dokumentReferanse === null;

        const dokumentTekst = (dokument: Dokument) => {
            return (
                dokument.tittel +
                (dokument.skjerming ? ' (Skjermet)' : '') +
                (dokument.dokumentStatus === DokumentDokumentStatus.KASSERT ? ' (Kassert)' : '') +
                (ikkeTilgjengelig ? ' (Dokument er ikke tilgjengelig)' : '')
            );
        };

        if (!kanVises || ikkeTilgjengelig) {
            return (
                <Alert variant="warning" className="my-4">
                    {dokumentTekst(dokument)}
                </Alert>
            );
        }

        const dokumentUrl = getSaksdokumentUrl(journalpostId, dokumentReferanse);

        return <DokumentVisning fnr={fnr} url={dokumentUrl} />;
    };

    const NorgLenke = ({
        valgtSak
    }: {
        valgtSak?: SaksDokumenter;
        geografiskTilknytning?: string | null;
    }) => {
        const {
            data: { person }
        } = usePersonData();
        const geografiskTilknytning = person?.geografiskTilknytning;

        const baseUrlResource = baseurlsResource.useFetch();
        const norg2Frontend = baseUrlResource.data?.norg2Frontend ?? '';

        const norgUrl = constructNorg2FrontendLink(norg2Frontend, valgtSak, geografiskTilknytning);

        return (
            <HStack>
                <Button
                    size="small"
                    variant="tertiary"
                    as={Link}
                    to={norgUrl}
                    iconPosition="right"
                    target="_blank"
                    aria-label="Oversikt over enheter og tema de behandler"
                    icon={<ExternalLinkIcon aria-hidden fontSize="1rem" />}
                >
                    Oversikt over enheter og tema de behandler
                </Button>
            </HStack>
        );
    };

    const DokumentAvsenderFilter = () => {
        const [selectedAvsender, setSelectedAvsender] = useAtom(sakerFilterAvsenderAtom);
        const onToggleSelected = useCallback(
            (option: DokumentmetadataAvsender) => {
                setSelectedAvsender(option);
            },
            [setSelectedAvsender]
        );

        return (
            <Fieldset size="small" legend="Avsender">
                <HStack gap="2">
                    {sakerAvsender.map((status) => (
                        <Switch
                            key={status.value}
                            size="small"
                            checked={selectedAvsender.includes(status.value)}
                            onChange={() => onToggleSelected(status.value)}
                        >
                            <p className="capitalize font-medium">{status.label}</p>
                        </Switch>
                    ))}
                </HStack>
            </Fieldset>
        );
    };

    const SakDetails = () => {
        const { id } = routeApi.useSearch();
        const saker = useFilterSaker();
        const { avsender } = useAtomValue(sakerFilterAtom);
        const valgtSak = saker.find((item) => getSakId(item) === id);
        if (!valgtSak) {
            return (
                <VStack flexGrow="1" minHeight="0" className="mt-6">
                    <Alert variant="info">Ingen valgte sak.</Alert>
                </VStack>
            );
        }

        if (!valgtSak.harTilgang) {
            return (
                <VStack flexGrow="1" minHeight="0" className="mt-6">
                    <Alert variant="warning">
                        Du kan ikke se innholdet i denne saken fordi du ikke har tilgang til tema {valgtSak.temanavn}.
                    </Alert>
                </VStack>
            );
        }

        const filterDokumenter = (dokumenter: Dokumentmetadata[]): Dokumentmetadata[] => {
            if (!dokumenter || dokumenter.length === 0) {
                return [];
            }

            let filteredList = dokumenter;
            if (avsender?.length) {
                filteredList = filteredList.filter((dokument) => avsender.includes(dokument.avsender));
            }

            return filteredList;
        };

        const journalPoster = valgtSak?.tilhorendeDokumenter ? filterDokumenter(valgtSak?.tilhorendeDokumenter) : [];

        const sakEntries = {
            Tema: valgtSak.temanavn,
            SakId: valgtSak.saksid,
            Fagsaksnummer: valgtSak.fagsaksnummer,
            Opprettet: datoEllerNull(valgtSak.opprettet),
            Status: valgtSak.avsluttet ? `Avsluttet(${formatterDato(valgtSak.avsluttet)})` : 'Åpen',
            Fagsystem: valgtSak.fagsystem,
            'Har tilgang': valgtSak.harTilgang ? 'Ja' : 'Nei'
        };

        return (
            <VStack gap="2" flexGrow="1" minHeight="0" className="overflow-scroll">
                <NorgLenke valgtSak={valgtSak} />
                <ViktigAaVite valgtSak={valgtSak} />
                <Box.New>
                    <Card padding="4">
                        <Heading as="h4" size="small">
                            Saksdetaljer
                        </Heading>
                        <TitleValuePairsComponent entries={sakEntries} columns={4} />
                    </Card>
                </Box.New>
                <Box.New>
                    <Card padding="4" className="mt-1 mb-4">
                        <HStack>
                            <Heading as="h3" size="small" className="mb-2" level="3">
                                Saksdokumenter
                            </Heading>
                            <Spacer />
                            <DokumentAvsenderFilter />
                        </HStack>
                        <JournalPoster journalPoster={journalPoster} columns={6} />
                    </Card>
                    <Alert variant="info">
                        Modia viser elektroniske dokumenter brukeren har sendt inn via nav.no etter 9. desember 2014.
                        Dokumenter som er journalført vises fra og med 4.juni 2016
                    </Alert>
                </Box.New>
            </VStack>
        );
    };

    return (
        <ErrorBoundary boundaryName="sakDetaljer">
            <Suspense fallback={<Skeleton variant="rounded" height="200" />}>
                <SakDetails />
            </Suspense>
        </ErrorBoundary>
    );
};
