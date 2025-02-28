import { ChatIcon, MinusIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import { SendMelding } from './SendMelding';

export function LukkbarNyMelding() {
    const [isOpen, setIsOpen] = useState(localStorage.getItem('ny-melding-is-open') !== 'false');

    useEffect(() => {
        localStorage.setItem('ny-melding-is-open', String(isOpen));
    }, [isOpen]);

    const oppgave = useAtomValue(dialogUnderArbeidAtom);
    useEffect(() => {
        if (oppgave) {
            setIsOpen(true);
        }
    }, [oppgave]);

    return (
        <HStack flexGrow="1">
            {!isOpen && (
                <Box>
                    <Button
                        type="button"
                        icon={<ChatIcon title="Skriv ny melding" />}
                        size="small"
                        onClick={() => setIsOpen(true)}
                    />
                </Box>
            )}
            {isOpen && (
                <SendMelding
                    lukkeKnapp={
                        <Button
                            type="button"
                            icon={<MinusIcon title="Lukk" />}
                            variant="tertiary"
                            size="small"
                            onClick={() => setIsOpen(false)}
                        />
                    }
                />
            )}
        </HStack>
    );
}
