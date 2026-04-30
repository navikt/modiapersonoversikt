import { VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import { type ImperativePanelHandle, Panel } from 'react-resizable-panels';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { meldingPanelIsOpenAtom } from 'src/lib/state/dialog';
import { SendMelding } from './SendMelding';

const PANEL_SIZE = 30;

export function IkkeLukkbarNyMelding() {
    const panelRef = useRef<ImperativePanelHandle>(null);

    const isOpen = useAtomValue(meldingPanelIsOpenAtom);

    if (!isOpen) {
        return null;
    }

    return (
        <Panel ref={panelRef} defaultSize={PANEL_SIZE} minSize={20} maxSize={60} order={3}>
            <VStack height="100%" gap="space-4" overflow="auto">
                <ErrorBoundary boundaryName="sendmelding">
                    <SendMelding />
                </ErrorBoundary>
            </VStack>
        </Panel>
    );
}
