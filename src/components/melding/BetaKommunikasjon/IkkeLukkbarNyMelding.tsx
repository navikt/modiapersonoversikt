import { VStack } from '@navikt/ds-react';
import { atom, useAtomValue } from 'jotai';
import { useRef } from 'react';
import { type ImperativePanelHandle, Panel } from 'react-resizable-panels';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { meldingPanelIsOpenAtom } from 'src/lib/state/dialog';
import { SendMelding } from '../SendMelding';

export const dialogSuksessMeldingAtom = atom<string | null>(null);
export const dialogFeilMeldingAtom = atom<string | null>(null);

const PANEL_SIZE = 30;

export function IkkeLukkbarNyMelding() {
    const panelRef = useRef<ImperativePanelHandle>(null);
    const suksessMelding = useAtomValue(dialogSuksessMeldingAtom);
    const feilMelding = useAtomValue(dialogFeilMeldingAtom);

    const isOpen = useAtomValue(meldingPanelIsOpenAtom);
    const feedBackMelding = suksessMelding || feilMelding;

    const panel = (
        <Panel id="ikke-lukkbar-ny-melding" ref={panelRef} defaultSize={PANEL_SIZE} minSize={20} maxSize={60} order={3}>
            <VStack height="100%" gap="space-4" overflow="auto">
                <ErrorBoundary boundaryName="sendmelding">
                    <SendMelding />
                </ErrorBoundary>
            </VStack>
        </Panel>
    );

    console.log(isOpen);
    if (isOpen || feedBackMelding) return panel;
    return null;
}
