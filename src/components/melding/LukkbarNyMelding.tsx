import { ChatIcon, ExpandIcon, MinusIcon, ShrinkIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack, VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type ImperativePanelHandle, Panel } from 'react-resizable-panels';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import { SendMelding } from './SendMelding';
import { TildelteOppgaver } from './TildelteOppgaver';
import { UbesvarteMeldinger } from './UbesvarteMeldinger';

const PANEL_SIZE = 30;
const LARGE_SIZE = 50;

export function LukkbarNyMelding() {
    const panelRef = useRef<ImperativePanelHandle>(null);
    const openButtonRef = useRef<HTMLButtonElement | null>(null); // Create a ref for the second button

    const [isLarge, setIsLarge] = useState(false);
    useEffect(() => {
        setIsLarge((panelRef.current?.getSize() ?? PANEL_SIZE) > PANEL_SIZE);
    }, []);
    const [isOpen, setIsOpen] = useState(localStorage.getItem('ny-melding-is-open') !== 'false');

    const minimizeAndSetFocusToOpenButton = () => {
        setIsOpen(false);
        setTimeout(() => {
            if (openButtonRef.current) {
                openButtonRef.current.focus();
            }
        }, 0);
    };

    useEffect(() => {
        localStorage.setItem('ny-melding-is-open', String(isOpen));
    }, [isOpen]);

    const oppgave = useAtomValue(dialogUnderArbeidAtom);
    useEffect(() => {
        if (oppgave) {
            setIsOpen(true);
        }
    }, [oppgave]);

    const onExpand = useCallback(() => {
        if (!panelRef.current) return;

        setIsLarge(panelRef.current.getSize() > PANEL_SIZE);
    }, []);

    if (!isOpen) {
        return (
            <Box>
                <Button
                    type="button"
                    ref={openButtonRef}
                    icon={<ChatIcon title="Skriv ny melding" />}
                    size="small"
                    onClick={() => setIsOpen(true)}
                />
            </Box>
        );
    }

    return (
        <Panel onResize={onExpand} ref={panelRef} defaultSize={PANEL_SIZE} minSize={20} maxSize={60} order={2}>
            <VStack height="100%" gap="2">
                <ErrorBoundary boundaryName="sendmelding">
                    <UbesvarteMeldinger />
                    <TildelteOppgaver />
                    <SendMelding
                        lukkeKnapp={
                            <HStack gap="2">
                                <Button
                                    type="button"
                                    icon={isLarge ? <ShrinkIcon title="Minimer" /> : <ExpandIcon title="Ekspander" />}
                                    variant="tertiary"
                                    size="small"
                                    onClick={() => {
                                        if (!panelRef.current) return;

                                        const newSize = isLarge ? PANEL_SIZE : LARGE_SIZE;
                                        panelRef.current.resize(newSize);
                                    }}
                                />
                                <Button
                                    type="button"
                                    icon={<MinusIcon title="Lukk" />}
                                    variant="tertiary"
                                    size="small"
                                    onClick={minimizeAndSetFocusToOpenButton}
                                />
                            </HStack>
                        }
                    />
                </ErrorBoundary>
            </VStack>
        </Panel>
    );
}
