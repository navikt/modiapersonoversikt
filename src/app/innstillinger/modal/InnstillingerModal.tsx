import * as React from 'react';
import Modal from 'nav-frontend-modal';
import styled from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';
import InnstillingerModalInnhold from './InnstillingerModalInnhold';

const MinWidthModal = styled(Modal)`
    &.modal {
        width: 100%;
        max-width: 40rem;
        min-height: 20rem;
    }
`;

interface Props {
    isOpen: boolean;
    lukk: () => void;
}

function InnstillingerModal(props: Props) {
    return (
        <MinWidthModal contentLabel="Dine innstillinger" isOpen={props.isOpen} onRequestClose={props.lukk}>
            <Systemtittel tag="h1" className="blokk-xxxs">
                Dine innstillinger
            </Systemtittel>
            <InnstillingerModalInnhold />
        </MinWidthModal>
    );
}

export default InnstillingerModal;
