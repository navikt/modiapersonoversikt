import { BodyShort, Box, Heading, Modal } from '@navikt/ds-react';
import { useCallback, useRef, useState } from 'react';
import type { PersonsokRequest } from 'src/lib/types/modiapersonoversikt-api';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import useListener from 'src/utils/hooks/use-listener';
import { PersonsokForm } from './form';
import { PersonsokResult } from './PersonsokResult';

// Fast bredde, så modalen ikke endrer størrelse etter innholdet i resultattabellen.
const MODAL_BREDDE = 1100;

const Personsok = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const listener = useCallback(() => {
        ref?.current?.showModal();
    }, []);

    useListener('#toggle-personsok', 'click', listener, document.querySelector('internarbeidsflate-decorator'));
    const [searchQuery, setSearchQuery] = useState<PersonsokRequest | undefined>(undefined);
    const [sokNummer, setSokNummer] = useState(0);

    return (
        <Modal ref={ref} aria-labelledby="personsok-modalheader" width={MODAL_BREDDE}>
            <Modal.Header>
                <Heading size="medium" id="personsok-modalheader">
                    Avansert søk
                </Heading>
                <BodyShort textColor="subtle">
                    Søk etter personer med navn, adresse, utenlandsk ID eller telefonnummer
                </BodyShort>
            </Modal.Header>
            <Modal.Body>
                <PersonsokForm
                    onSubmit={(query) => {
                        setSearchQuery(query);
                        setSokNummer((n) => n + 1);
                        const queryKeys = query
                            ? Object.keys(query).filter((key) => query[key as keyof PersonsokRequest] !== undefined)
                            : [];
                        trackGenereltUmamiEvent(trackingEvents.avansertSok, { queryKeys: queryKeys });
                    }}
                    onReset={() => setSearchQuery(undefined)}
                />
                {searchQuery && (
                    <Box marginBlock="space-16">
                        {/* Ny key per søk gjør at resultatlisten alltid starter på side 1 */}
                        <PersonsokResult key={sokNummer} query={searchQuery} onClick={() => ref.current?.close()} />
                    </Box>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default Personsok;
