import { Alert, BodyShort, HGrid, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TraadDetail } from 'src/components/Meldinger/Detail';
import { getOppgaveId, useFilterOppgave } from 'src/components/Oppgave/List/utils';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { datoEllerNull } from 'src/utils/string-utils';

const routeApi = getRouteApi('/new/person/oppgaver');

const OppgaveDetailInfo = ({ oppgave }: { oppgave: OppgaveDto }) => {
    const { data: gsakTema } = useGsakTema();
    const tema = gsakTema.find((item) => item.kode === oppgave.tema);
    const oppgaveTyper = tema?.oppgavetyper ?? [];
    const oppgavetype = oppgaveTyper.find((o) => o.kode === oppgave.oppgavetype);
    const prioritering = tema?.prioriteter.find((o) => o.kode === oppgave.prioritet);

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Om oppgave
            </Heading>
            <HGrid gap="4" columns={{ sm: 2, md: 3 }} className="mt-4">
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Tema:
                    </BodyShort>
                    <BodyShort size="small">{tema?.tekst ?? 'Ukjent tema'}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        TildeltEnhetsnr:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.tildeltEnhetsnr}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Oppgavetype:
                    </BodyShort>
                    <BodyShort size="small">{oppgavetype?.tekst ?? 'Ukjent oppgavetype'}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Status:
                    </BodyShort>
                    <BodyShort size="small">{oppgave?.status}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Prioritering:
                    </BodyShort>
                    <BodyShort size="small">{prioritering?.tekst ?? ''}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Aktivdato:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(oppgave?.aktivDato)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Forfallsdato:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(oppgave?.fristFerdigstillelse)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Saksreferanse:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.saksreferanse}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Er STO oppgave:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.erSTOOppgave ? 'Ja' : 'Nei'}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Opprettet av enhet:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.opprettetAvEnhetsnr}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Opprettet:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(oppgave?.opprettetTidspunkt)}</BodyShort>
                </VStack>
            </HGrid>

            <VStack justify="space-between" className="mt-6">
                <BodyShort size="small" weight="semibold">
                    Beskrivelse:
                </BodyShort>
                <BodyShort size="small">{oppgave?.beskrivelse}</BodyShort>
            </VStack>
        </Card>
    );
};

const OppgaveOgDialogDetail = () => {
    const { id } = routeApi.useSearch();
    const oppgaver = useFilterOppgave();
    const oppgave = oppgaver.find((item) => getOppgaveId(item) === id);

    if (!oppgave) {
        return (
            <VStack flexGrow="1" minHeight="0" className="mt-6">
                <Alert variant="info">Ingen valgte oppgave.</Alert>
            </VStack>
        );
    }

    return (
        <VStack gap="4">
            <OppgaveDetailInfo oppgave={oppgave} />
            {oppgave.traadId ? (
                <TraadDetail traadId={oppgave.traadId} />
            ) : (
                <Alert variant="info">Ingen dialog funnet.</Alert>
            )}
        </VStack>
    );
};

export const OppgaveDetail = () => {
    return (
        <ErrorBoundary boundaryName="oppgaveDetaljer">
            <Suspense fallback={<Skeleton variant="rounded" height="200" />}>
                <OppgaveOgDialogDetail />
            </Suspense>
        </ErrorBoundary>
    );
};
