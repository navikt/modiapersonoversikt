import { Alert, Box, Button, HStack, InlineMessage, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useCallback, useEffect, useRef, useState } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { MeldingActionMenu } from 'src/components/Meldinger/Detail/MeldingActionMenu';
import { TraadOppgaver } from 'src/components/Meldinger/Detail/TraadOppgaver';
import { meldingerFilterAtom } from 'src/components/Meldinger/List/Filter';
import { useFilterMeldinger, useTraader } from 'src/components/Meldinger/List/utils';
import { useSetTraadIdQueryParam } from 'src/components/Meldinger/useSetTraadIdQueryParam';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { formatterDatoTid } from 'src/utils/date-utils';
import { formaterDato } from 'src/utils/string-utils';
import { nyesteMelding, saksbehandlerTekst, traadKanBesvares } from '../List/utils';

import { Journalposter } from './Journalposter';
import { Meldinger } from './Meldinger';

const TraadDetailContent = ({ traad }: { traad: Traad }) => {
    const setDialogUnderArbeid = useSetAtom(dialogUnderArbeidAtom);

    const svarSamtale = useCallback(() => {
        setDialogUnderArbeid(traad.traadId);
    }, [traad.traadId, setDialogUnderArbeid]);

    const kanBesvares = traadKanBesvares(traad);
    const melding = nyesteMelding(traad);
    const avsluttetDato = traad.avsluttetDato || melding.avsluttetDato;
    const avsluttetAv = traad.avsluttetAv || melding.skrevetAvTekst;

    return (
        <Card as={VStack} padding="2" overflow="auto">
            <VStack as="section" gap="1" padding="2" height="100%" aria-label="Dialogdetaljer">
                <MeldingActionMenu traad={traad} />
                <Journalposter journalposter={traad.journalposter} />
                <TraadOppgaver traadId={traad.traadId} />
                <Meldinger meldinger={traad.meldinger} />
                <Box.New>
                    <HStack justify="end">
                        {kanBesvares && (
                            <Box.New>
                                <Button size="small" onClick={svarSamtale}>
                                    Svar
                                </Button>
                            </Box.New>
                        )}
                    </HStack>
                    <VStack gap="2">
                        {avsluttetDato && !kanBesvares && (
                            <InlineMessage status="warning" size="small">
                                Samtalen er avsluttet av {avsluttetAv ?? 'Systembruker'}{' '}
                                {formatterDatoTid(avsluttetDato)}
                            </InlineMessage>
                        )}
                        {melding.markertSomFeilsendtAv && (
                            <InlineMessage status="warning" size="small">
                                Markert som feilsendt av {saksbehandlerTekst(melding.markertSomFeilsendtAv)}{' '}
                                {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}
                            </InlineMessage>
                        )}
                        {melding.sendtTilSladding && (
                            <InlineMessage status="warning" size="small">
                                Tråden ligger til behandling for sladding
                            </InlineMessage>
                        )}
                        {traad.sattTilSladdingAv && (
                            <InlineMessage status="warning" size="small">
                                Tråden er satt til sladding av {traad.sattTilSladdingAv}
                            </InlineMessage>
                        )}
                    </VStack>
                </Box.New>
            </VStack>
        </Card>
    );
};

const routeApi = getRouteApi('/new/person/meldinger');

const TraadDetailSection = ({ traader }: { traader: Traad[] }) => {
    const { traadId } = routeApi.useSearch();
    const filters = useAtomValue(meldingerFilterAtom);
    const filteredTraader = useFilterMeldinger(traader, filters);
    const selectedTraad = traadId ? filteredTraader.find((t) => t.traadId === traadId) : undefined;

    useSetTraadIdQueryParam(traader);

    if (!filteredTraader.length) return null;

    if (traadId && !selectedTraad) {
        return (
            <InlineMessage className="p-2" status="warning">
                Tråden du valgte, ble ikke funnet.
            </InlineMessage>
        );
    }

    if (!selectedTraad) return null;

    return <TraadDetailContent traad={selectedTraad} />;
};

export const TraadDetail = () => {
    const { data: traader, isLoading } = useTraader();
    return (
        <ErrorBoundary boundaryName="traaddetail" errorText="Det oppstod en feil under visning av melding detailjer">
            {isLoading ? <Skeleton variant="rectangle" height="4rem" /> : <TraadDetailSection traader={traader} />}
        </ErrorBoundary>
    );
};
