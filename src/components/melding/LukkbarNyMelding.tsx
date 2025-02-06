import { ChatIcon, MinusIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack } from '@navikt/ds-react';
import { useState } from 'react';
import NyMelding from 'src/components/melding/NyMelding';

export function LukkbarNyMelding() {
    const [isOpen, setIsOpen] = useState(false);

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
                <NyMelding
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
