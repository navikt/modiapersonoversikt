import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Alert, Box, Button, HStack, Heading, InlineMessage, Skeleton, VStack } from '@navikt/ds-react';
import { useLocation } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { Suspense, memo, useCallback, useState } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PrintThreadsMemo } from 'src/components/Meldinger';
import { TraadOppgaver } from 'src/components/Meldinger/Detail/TraadOppgaver';
import MeldingerPrint from 'src/components/Meldinger/MeldingerPrint';
import usePrinter from 'src/components/Print/usePrinter';
import { useTraadById } from 'src/lib/clients/modiapersonoversikt-api';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { type Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { formatterDatoTid } from 'src/utils/date-utils';
import { formaterDato } from 'src/utils/string-utils';
import { JournalForingModal } from '../Journalforing';
import { nyesteMelding, saksbehandlerTekst, traadKanBesvares, traadstittel } from '../List/utils';
import { DialogMerkMeny } from '../Merk';
import { OppgaveModal } from '../Oppgave';
import { Journalposter } from './Journalposter';
import { Meldinger } from './Meldinger';

const PrintThread = ({ traad }: { traad: Traad }) => {
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;

    return (
        <>
            <Button
                className="justify-start"
                role="menuitem"
                variant="tertiary"
                size="small"
                onClick={() => {
                    printer.triggerPrint();
                }}
            >
                <span className="text-ax-text-neutral font-light">Skriv ut dialog</span>
            </Button>
            <PrinterWrapper>
                <MeldingerPrint traad={traad} />
            </PrinterWrapper>
        </>
    );
};

const PrintThreadMemo = memo(PrintThread);

const TraadMeta = ({ traad }: { traad: Traad }) => {
    const [journalforingOpen, setJournalforingOpen] = useState(false);
    const [oppgaveOpen, setOppgaveOpen] = useState(false);
    return (
        <HStack justify="space-between" gap="2">
            <Heading size="xsmall" level="3">
                {traadstittel(traad)} - {temagruppeTekst(traad.temagruppe as Temagruppe)}
            </Heading>
            <HStack gap="2" justify="end" align="start">
                <ActionMenu>
                    <ActionMenu.Trigger>
                        <Button
                            variant="secondary"
                            size="small"
                            icon={<ChevronDownIcon aria-hidden />}
                            iconPosition="right"
                        >
                            Skriv ut
                        </Button>
                    </ActionMenu.Trigger>
                    <ActionMenu.Content>
                        <VStack gap="2">
                            <PrintThreadMemo traad={traad} />
                            <PrintThreadsMemo />
                        </VStack>
                    </ActionMenu.Content>
                </ActionMenu>
                <Button variant="secondary" size="small" onClick={() => setJournalforingOpen(true)}>
                    Journalfør
                </Button>
                <Button variant="secondary" size="small" onClick={() => setOppgaveOpen(true)}>
                    Ny oppgave
                </Button>
                <DialogMerkMeny traadId={traad.traadId} />
            </HStack>
            {journalforingOpen && (
                <JournalForingModal
                    isOpen={journalforingOpen}
                    close={() => setJournalforingOpen(false)}
                    traad={traad}
                />
            )}
            {oppgaveOpen && <OppgaveModal open={oppgaveOpen} setOpen={setOppgaveOpen} traad={traad} />}
        </HStack>
    );
};

export const TraadDetail = ({ traadId }: { traadId: string }) => (
    <ErrorBoundary boundaryName="traaddetail">
        <Suspense fallback={<Skeleton variant="rounded" height="4rem" />}>
            <TraadDetailContent traadId={traadId} />
        </Suspense>
    </ErrorBoundary>
);

const TraadDetailContent = ({ traadId }: { traadId: string }) => {
    const setDialogUnderArbeid = useSetAtom(dialogUnderArbeidAtom);

    const pathname = useLocation().pathname;
    const erIMeldingerfane = pathname.includes('meldinger');

    const traad = useTraadById(traadId);

    const svarSamtale = useCallback(() => {
        setDialogUnderArbeid(traadId);
    }, [traadId, setDialogUnderArbeid]);

    if (!traad) {
        return (
            <VStack flexGrow="1" minHeight="0" className="mt-6">
                <Alert variant="error">Tråden du valgte, ble ikke funnet.</Alert>
            </VStack>
        );
    }

    const kanBesvares = traadKanBesvares(traad);
    const melding = nyesteMelding(traad);
    const avsluttetDato = traad.avsluttetDato || melding.avsluttetDato;
    const avsluttetAv = traad.avsluttetAv || melding.skrevetAvTekst;

    return (
        <Card as={VStack} padding="2" overflow="auto">
            <VStack as="section" gap="1" padding="2" height="100%" aria-label="Dialogdetaljer">
                <TraadMeta traad={traad} />
                <Journalposter journalposter={traad.journalposter} />
                {erIMeldingerfane && <TraadOppgaver traadId={traadId} />}
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
