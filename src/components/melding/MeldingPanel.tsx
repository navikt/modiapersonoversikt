import { VStack } from '@navikt/ds-react';
import { atom, useAtomValue } from 'jotai';
import { Panel } from 'react-resizable-panels';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { meldingPanelIsOpenAtom } from 'src/lib/state/dialog';
import { SendMelding } from './SendMelding';

export const dialogSuksessMeldingAtom = atom<string | null>(null);
export const dialogFeilMeldingAtom = atom<string | null>(null);

const PANEL_SIZE = '30vh';

export function MeldingPanel() {
    const suksessMelding = useAtomValue(dialogSuksessMeldingAtom);
    const feilMelding = useAtomValue(dialogFeilMeldingAtom);

    const isOpen = useAtomValue(meldingPanelIsOpenAtom);
    const feedbackMelding = suksessMelding || feilMelding;

    const panel = (
        <Panel id="ikke-lukkbar-ny-melding" defaultSize={PANEL_SIZE} minSize="20vh" maxSize="60vh">
            <VStack height="100%" gap="space-4" overflow="auto">
                <ErrorBoundary>
                    <SendMelding />
                </ErrorBoundary>
            </VStack>
        </Panel>
    );

    if (isOpen || feedbackMelding) return panel;
    return null;
}
