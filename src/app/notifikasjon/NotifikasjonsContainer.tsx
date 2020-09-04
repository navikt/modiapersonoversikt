import React, { useCallback, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import useListener from '../../utils/hooks/use-listener';
import Notifikasjoner from './Notifikasjoner';
import { Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { NotifikasjonsType } from './EnkeltNotifikasjon';

export interface Notifikasjon {
    id: string;
    tittel: string;
    dato: string;
    ingress: string;
    beskrivelse: string;
    prioritet: number;
    type: NotifikasjonsType;
}

const StyledModalWrapper = styled(ModalWrapper)`
    padding: 2rem;
    width: 80%;
    height: 50%;
`;

const StyledSidetittel = styled(Sidetittel)`
    margin-left: 1rem;
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
            <StyledSidetittel>Notifikasjon</StyledSidetittel>
            <Notifikasjoner />
        </StyledModalWrapper>
    );
}

export default NotifikasjonsContainer;
