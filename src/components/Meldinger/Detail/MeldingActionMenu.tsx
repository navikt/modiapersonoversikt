import {
    ArrowUndoIcon,
    Chat2Icon,
    ChatElipsisIcon,
    CheckmarkCircleIcon,
    FileTextIcon,
    LeaveIcon,
    MenuHamburgerIcon,
    NotePencilDashIcon,
    PrinterSmallIcon,
    TasklistIcon,
    XMarkOctagonIcon
} from '@navikt/aksel-icons';
import { ActionMenu, Box, Button, Heading, HStack } from '@navikt/ds-react';
import { useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { JournalForingModal } from 'src/components/Meldinger/Journalforing';
import {
    eldsteMelding,
    erBehandlet,
    erChatTraad,
    erFeilsendt,
    erJournalfort,
    erMeldingstypeSamtalereferat,
    kanBesvares,
    traadKanBesvares,
    traadstittel,
    useTraader
} from 'src/components/Meldinger/List/utils';
import MeldingerPrint from 'src/components/Meldinger/MeldingerPrint';
import { AvsluttDialogModal, MarkerFeilsendtModal, SladdTraadModal } from 'src/components/Meldinger/Merk';
import { OppgaveModal } from 'src/components/Meldinger/Oppgave';
import { SvarPaaTraadKnapp } from 'src/components/melding/BetaKommunikasjon/SvarPaaTraadKnapp';
import usePrinter from 'src/components/Print/usePrinter';
import { svarUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { type Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';

function visStandardvalg(traad: Traad): boolean {
    return !erJournalfort(traad) && !erFeilsendt(traad) && erBehandlet(traad) && !erChatTraad(traad);
}
function traadKanLukkes(traad: Traad): boolean {
    const melding = eldsteMelding(traad);
    return kanBesvares(traad) && !erMeldingstypeSamtalereferat(melding.meldingstype);
}

export const MeldingActionMenu = ({ traad }: { traad: Traad }) => {
    const [journalforingOpen, setJournalforingOpen] = useState(false);
    const [oppgaveOpen, setOppgaveOpen] = useState(false);
    const [printAllThreads, setPrintAllThreads] = useState(false);
    const printer = usePrinter();
    const [avsluttOpen, setAvsluttOpen] = useState(false);
    const [sladdOpen, setSladdOpen] = useState(false);
    const [feilsendtOpen, setFeilsendtOpen] = useState(false);
    const { isOn: isNyKommunikasjonEnabled } = useFeatureToggle(FeatureToggles.NyKommunikasjon);

    const PrinterWrapper = printer.printerWrapper;
    const { data: traader } = useTraader();
    const triggerPrinting = (printAllThreads = false) => {
        setPrintAllThreads(printAllThreads);
        printer.triggerPrint();
    };

    const setDialogUnderArbeid = useSetAtom(svarUnderArbeidAtom);

    const svarSamtale = useCallback(() => {
        setDialogUnderArbeid(traad.traadId);
    }, [traad.traadId, setDialogUnderArbeid]);

    const kanBesvares = traadKanBesvares(traad);

    return (
        <HStack justify="space-between" gap="space-8">
            <Heading size="xsmall" level="3">
                {traadstittel(traad)} - {temagruppeTekst(traad.temagruppe as Temagruppe)}
            </Heading>
            <HStack gap="space-8" justify="end" align="start">
                {kanBesvares &&
                    (isNyKommunikasjonEnabled ? (
                        <SvarPaaTraadKnapp traad={traad} />
                    ) : (
                        <Box>
                            <Button size="small" onClick={svarSamtale} variant="primary" icon={<ArrowUndoIcon />}>
                                Svar
                            </Button>
                        </Box>
                    ))}
                <ActionMenu>
                    <ActionMenu.Trigger>
                        <Button
                            data-color="neutral"
                            variant="tertiary"
                            icon={<MenuHamburgerIcon title="Åpne menyvalg for tråd" />}
                            size="small"
                        />
                    </ActionMenu.Trigger>
                    <ActionMenu.Content>
                        <ActionMenu.Item onSelect={() => setJournalforingOpen(true)} icon={<FileTextIcon />}>
                            Journalfør
                        </ActionMenu.Item>
                        <ActionMenu.Sub key="merk">
                            <ActionMenu.SubTrigger icon={<CheckmarkCircleIcon />}>Merk</ActionMenu.SubTrigger>
                            <ActionMenu.SubContent>
                                <ActionMenu.Item
                                    key="sladding"
                                    icon={<NotePencilDashIcon />}
                                    onSelect={() => setSladdOpen(true)}
                                >
                                    Send til sladding
                                </ActionMenu.Item>
                                <ActionMenu.Item
                                    key="feilsendt"
                                    icon={<XMarkOctagonIcon />}
                                    disabled={!visStandardvalg(traad)}
                                    onSelect={() => setFeilsendtOpen(true)}
                                >
                                    Feilsendt
                                </ActionMenu.Item>
                            </ActionMenu.SubContent>
                        </ActionMenu.Sub>
                        <ActionMenu.Item onSelect={() => setOppgaveOpen(true)} icon={<TasklistIcon />}>
                            Ny oppgave
                        </ActionMenu.Item>
                        <ActionMenu.Sub>
                            <ActionMenu.SubTrigger icon={<PrinterSmallIcon />}>Skriv ut</ActionMenu.SubTrigger>
                            <ActionMenu.SubContent>
                                <ActionMenu.Item
                                    icon={<ChatElipsisIcon />}
                                    onSelect={() => {
                                        trackGenereltUmamiEvent(trackingEvents.skrivUt, { tekst: 'enkel dialog' });
                                        triggerPrinting();
                                    }}
                                >
                                    Gjeldende dialog
                                </ActionMenu.Item>
                                <ActionMenu.Item
                                    icon={<Chat2Icon />}
                                    onSelect={() => {
                                        trackGenereltUmamiEvent(trackingEvents.skrivUt, { tekst: 'alle dialoger' });
                                        triggerPrinting(true);
                                    }}
                                >
                                    Alle dialoger
                                </ActionMenu.Item>
                            </ActionMenu.SubContent>
                        </ActionMenu.Sub>
                        <ActionMenu.Item
                            variant="danger"
                            icon={<LeaveIcon />}
                            disabled={!traadKanLukkes(traad)}
                            onSelect={() => setAvsluttOpen(true)}
                        >
                            Avslutt dialog
                        </ActionMenu.Item>
                    </ActionMenu.Content>
                </ActionMenu>
            </HStack>
            <JournalForingModal isOpen={journalforingOpen} close={() => setJournalforingOpen(false)} traad={traad} />
            <OppgaveModal open={oppgaveOpen} setOpen={setOppgaveOpen} traad={traad} />
            <PrinterWrapper>
                {printAllThreads ? (
                    traader.map((traad) => <MeldingerPrint key={traad.traadId} traad={traad} />)
                ) : (
                    <MeldingerPrint traad={traad} />
                )}
            </PrinterWrapper>
            <AvsluttDialogModal traad={traad} open={avsluttOpen} onClose={() => setAvsluttOpen(false)} />
            <SladdTraadModal traad={traad} open={sladdOpen} onClose={() => setSladdOpen(false)} />
            <MarkerFeilsendtModal traad={traad} open={feilsendtOpen} onClose={() => setFeilsendtOpen(false)} />
        </HStack>
    );
};
