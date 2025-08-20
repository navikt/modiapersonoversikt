import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, Button, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useSetAtom } from 'jotai';
import { Suspense, useCallback, useState } from 'react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import usePrinter from 'src/components/Print/usePrinter';
import { useOppgaveForTraad, useTraadById } from 'src/lib/clients/modiapersonoversikt-api';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { type Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { formatterDatoTid } from 'src/utils/date-utils';
import { formaterDato } from 'src/utils/string-utils';
import { AvsluttOppgaveModal } from '../AvsluttOppgave';
import { JournalForingModal } from '../Journalforing';
import { nyesteMelding, saksbehandlerTekst, traadKanBesvares, traadstittel } from '../List/utils';
import MeldingerPrint from '../MeldingerPrint';
import { DialogMerkMeny } from '../Merk';
import { OppgaveModal } from '../Oppgave';
import { Journalposter } from './Journalposter';
import { Meldinger } from './Meldinger';

const PrintThread = ({ traad }: { traad: Traad }) => {
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;

    return (
        <>
            <Button icon={<PrinterSmallIcon />} size="xsmall" variant="tertiary" onClick={() => printer.triggerPrint()}>
                Skriv ut dialog
            </Button>
            <PrinterWrapper>
                <MeldingerPrint traad={traad} />
            </PrinterWrapper>
        </>
    );
};

const TraadMeta = ({ traad }: { traad: Traad }) => (
    <HStack justify="space-between">
        <VStack>
            <Heading size="small" as="h3" level="3">
                {traadstittel(traad)} - {temagruppeTekst(traad.temagruppe as Temagruppe)}
            </Heading>
            <VStack>
                {traad.opprettetDato && (
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Opprettet:
                        </BodyShort>
                        <BodyShort size="small">{formaterDato(traad.opprettetDato)}</BodyShort>
                    </HStack>
                )}
            </VStack>
        </VStack>
        <Box>
            <PrintThread traad={traad} />
        </Box>
    </HStack>
);

export const TraadDetail = ({ traadId }: { traadId: string }) => (
    <ErrorBoundary boundaryName="traaddetail">
        <Suspense fallback={<Skeleton variant="rounded" height="200" />}>
            <TraadDetailContent traadId={traadId} />
        </Suspense>
    </ErrorBoundary>
);

const AvsluttOppgaveButton = ({ traadId }: { traadId: string }) => {
    const [open, setOpen] = useState(false);
    const { oppgave } = useOppgaveForTraad(traadId);

    if (!oppgave) return null;

    return (
        <>
            <Button size="small" variant="primary" onClick={() => setOpen(true)}>
                Avslutt oppgave
            </Button>
            <AvsluttOppgaveModal oppgave={oppgave} open={open} onClose={() => setOpen(false)} />
        </>
    );
};

const TraadDetailContent = ({ traadId }: { traadId: string }) => {
    const setDialogUnderArbeid = useSetAtom(dialogUnderArbeidAtom);
    const [journalforingOpen, setJournalforingOpen] = useState(false);
    const [oppgaveOpen, setOppgaveOpen] = useState(false);

    const traad = useTraadById(traadId);

    const svarSamtale = useCallback(() => {
        setDialogUnderArbeid(traadId);
    }, [traadId, setDialogUnderArbeid]);

    if (!traad) {
        return <span> fant ikke traaden</span>;
    }

    const kanBesvares = traadKanBesvares(traad);
    const melding = nyesteMelding(traad);
    const avsluttetDato = traad.avsluttetDato || melding.avsluttetDato;
    const avsluttetAv = melding.skrevetAvTekst;

    return (
        <Card as={VStack} padding="2" minHeight={{ xs: '100%', md: '0' }} overflow="auto">
            <VStack minHeight={{ xs: '100%', md: '0' }} gap="2" as="section" aria-label="Dialogdetaljer">
                <TraadMeta traad={traad} />
                <HStack gap="4">
                    <Button variant="secondary" size="small" onClick={() => setJournalforingOpen(true)}>
                        Journalfør
                    </Button>
                    <Button variant="secondary" size="small" onClick={() => setOppgaveOpen(true)}>
                        Ny oppgave
                    </Button>
                    <DialogMerkMeny traadId={traadId} />
                    <AvsluttOppgaveButton traadId={traadId} />
                </HStack>

                {avsluttetDato && !kanBesvares && (
                    <Alert variant="info" size="small">
                        Samtalen er avsluttet av {avsluttetAv ?? 'Systembruker'} {formatterDatoTid(avsluttetDato)}
                    </Alert>
                )}

                {melding.markertSomFeilsendtAv && (
                    <Alert variant="warning" size="small">
                        Markert som feilsendt av {saksbehandlerTekst(melding.markertSomFeilsendtAv)}{' '}
                        {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}
                    </Alert>
                )}
                {melding.sendtTilSladding && (
                    <Alert variant="warning" size="small">
                        Tråden ligger til behandling for sladding
                    </Alert>
                )}

                <Journalposter journalposter={traad.journalposter} />

                <Meldinger meldinger={traad.meldinger} />
                {kanBesvares && (
                    <Box.New marginBlock="space-8">
                        <Button onClick={svarSamtale}>Svar</Button>
                    </Box.New>
                )}
            </VStack>

            {journalforingOpen && (
                <JournalForingModal
                    isOpen={journalforingOpen}
                    close={() => setJournalforingOpen(false)}
                    traad={traad}
                />
            )}
            <OppgaveModal open={oppgaveOpen} setOpen={setOppgaveOpen} traad={traad} />
        </Card>
    );
};
