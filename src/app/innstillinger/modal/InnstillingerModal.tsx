import Modal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
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
