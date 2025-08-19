import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Box, Button, HStack, Heading, Skeleton, Spacer, Switch, VStack } from '@navikt/ds-react';
import { Link, getRouteApi } from '@tanstack/react-router';
import { useAtom, useAtomValue } from 'jotai/index';
import { Suspense, useCallback } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import JournalPoster from 'src/components/saker/Detail/JournalPoster';
import ViktigAaVite from 'src/components/saker/Detail/viktigavite/ViktigAaVite';
import { sakerFilterAtom, sakerFilterAvsenderAtom } from 'src/components/saker/List/Filter';
import {
    constructNorg2FrontendLink,
    getSakId,
    hentBrukerNavn,
    sakerAvsender,
    useFilterSaker
} from 'src/components/saker/utils';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { Dokumentmetadata, DokumentmetadataAvsender, SaksDokumenter } from 'src/generated/modiapersonoversikt-api';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import baseurlsResource from 'src/rest/resources/baseurlsResource';
import { formatterDato } from 'src/utils/date-utils';
import { datoEllerNull } from 'src/utils/string-utils';

export const SakDetailPage = () => {
    const routeApi = getRouteApi('/new/person/saker');
    const {
        data: { person }
    } = usePersonData();
    const brukersNavn = hentBrukerNavn(person);

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
            <HStack gap="2" align="center">
                <BodyLong size="small">Avsender: </BodyLong>
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
                        <JournalPoster journalPoster={journalPoster} brukersNavn={brukersNavn} columns={4} />
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
