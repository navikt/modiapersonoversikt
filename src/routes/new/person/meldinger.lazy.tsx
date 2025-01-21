import { createLazyFileRoute } from '@tanstack/react-router';
import NyMelding from 'src/components/melding/NyMelding';
import { Button } from '@navikt/ds-react';
import { ChatIcon, MinusIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

export const Route = createLazyFileRoute('/new/person/meldinger')({
    component: RouteComponent
});

function RouteComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && <Button icon={<ChatIcon />} variant="secondary" size="small" onClick={() => setIsOpen(true)} />}
            {isOpen &&
                <NyMelding
                    lukkeKnapp={
                        <Button
                            icon={<MinusIcon title="Lukk" />}
                            variant="tertiary"
                            size="small"
                            onClick={() => setIsOpen(false)}
                        />
                    }
                />
            }
        </>
    );
}
