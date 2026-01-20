import { BodyShort, Box, Heading, Modal } from '@navikt/ds-react';
import { useCallback, useRef, useState } from 'react';
import type { PersonsokRequest } from 'src/lib/types/modiapersonoversikt-api';
import useListener from 'src/utils/hooks/use-listener';
import { PersonsokForm } from './form';
import { PersonsokResult } from './PersonsokResult';

const Personsok = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const listener = useCallback(() => {
        ref?.current?.showModal();
    }, []);

    useListener('#toggle-personsok', 'click', listener, document.querySelector('dekorator'));
    const [searchQuery, setSearchQuery] = useState<PersonsokRequest | undefined>(undefined);

    return (
        <Modal ref={ref} aria-labelledby="personsok-modalheader" className="max-w-[calc(100%-2em)]">
            <Modal.Header>
                <Heading size="medium" id="personsok-modalheader">
                    Avansert søk
                </Heading>
                <BodyShort textColor="subtle">
                    Søk etter personer med navn, adrese, utenlandsk ID eller telefonnummer
                </BodyShort>
            </Modal.Header>
            <Modal.Body>
                <PersonsokForm onSubmit={setSearchQuery} onReset={() => setSearchQuery(undefined)} />
                {searchQuery && (
                    <Box marginBlock="4">
                        <PersonsokResult query={searchQuery} onClick={() => ref.current?.close()} />
                    </Box>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default Personsok;
