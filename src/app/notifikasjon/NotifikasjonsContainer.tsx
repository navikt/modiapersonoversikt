import React, { useCallback, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import useListener from '../../utils/hooks/use-listener';
import Notifikasjon from './Notifikasjon';
import { Sidetittel } from 'nav-frontend-typografi';

function NotifikasjonsContainer() {
    const [apen, settApen] = useState(false);
    const handleOnClose = () => {
        settApen(false);
    };
    const listener = useCallback(() => settApen(a => !a), [settApen]);
    useListener('#notifikasjon-button', 'click', listener, document.querySelector('dekorator'));

    return (
        <ModalWrapper contentLabel="Notifikasjon" isOpen={apen} onRequestClose={handleOnClose}>
            <Sidetittel>Notifikasjon</Sidetittel>
            <Notifikasjon />
        </ModalWrapper>
    );
}

export default NotifikasjonsContainer;
