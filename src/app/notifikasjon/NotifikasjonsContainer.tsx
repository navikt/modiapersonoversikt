import React, { useCallback, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import useListener from '../../utils/hooks/use-listener';
import Notifikasjon from './Notifikasjon';
import { Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components';

export interface Notifikasjon {
    id: string;
    tittel: string;
    beskrivelse: string;
}

const StyledModalWrapper = styled(ModalWrapper)`
    padding: 3rem;
`;

function NotifikasjonsContainer() {
    const [apen, settApen] = useState(false);
    const handleOnClose = () => {
        settApen(false);
    };
    const listener = useCallback(() => settApen(a => !a), [settApen]);
    useListener('#notifikasjon-button', 'click', listener, document.querySelector('dekorator'));

    return (
        <StyledModalWrapper contentLabel="Notifikasjon" isOpen={apen} onRequestClose={handleOnClose}>
            <Sidetittel>Notifikasjon</Sidetittel>
            <Notifikasjon />
        </StyledModalWrapper>
    );
}

export default NotifikasjonsContainer;
