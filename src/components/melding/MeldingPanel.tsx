import { VStack } from '@navikt/ds-react';
import { atom, useAtomValue } from 'jotai';
import { Panel } from 'react-resizable-panels';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import { meldingPanelIsOpenAtom } from 'src/lib/state/dialog';
import { SendMelding } from './SendMelding';

export const dialogSuksessMeldingAtom = atom<string | null>(null);
export const dialogFeilMeldingAtom = atom<string | null>(null);
export const referatResultatAtom = atom<{
    fnr: string;
    enhet: string;
    melding: string;
    variant: 'success' | 'error';
    traadId?: string;
} | null>(null);

export function useReferatResultat() {
    const resultat = useAtomValue(referatResultatAtom);
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom);
    return resultat?.fnr === fnr && resultat.enhet === enhet ? resultat : null;
}

const PANEL_SIZE = '30vh';

export function MeldingPanel() {
    const suksessMelding = useAtomValue(dialogSuksessMeldingAtom);
    const feilMelding = useAtomValue(dialogFeilMeldingAtom);
    const referatResultat = useReferatResultat();

    const isOpen = useAtomValue(meldingPanelIsOpenAtom);
    const feedbackMelding = referatResultat || suksessMelding || feilMelding;

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
