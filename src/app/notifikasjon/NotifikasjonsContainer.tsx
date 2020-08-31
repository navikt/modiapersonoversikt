import React, { useCallback, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import useListener from '../../utils/hooks/use-listener';

function NotifikasjonsContainer() {
    const [apen, settApen] = useState(false);
    const handleOnClose = () => {
        settApen(false);
    };
    const listener = useCallback(() => settApen(a => !a), [settApen]);
    useListener('#notifikasjon-button', 'click', listener, document.querySelector('dekorator'));

    return (
        <ModalWrapper contentLabel="Notifikasjon" isOpen={apen} onRequestClose={handleOnClose}>
            <Normaltekst>Notifikasjon</Normaltekst>
        </ModalWrapper>
    );
}

export default NotifikasjonsContainer;
