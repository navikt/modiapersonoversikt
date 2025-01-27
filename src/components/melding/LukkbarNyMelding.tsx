import { ChatIcon, MinusIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';
import { useState } from 'react';
import NyMelding from 'src/components/melding/NyMelding';

export function LukkbarNyMelding() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <HStack>
            {!isOpen && (
                <Button type="button" icon={<ChatIcon title="Skriv ny melding" />} onClick={() => setIsOpen(true)} />
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
