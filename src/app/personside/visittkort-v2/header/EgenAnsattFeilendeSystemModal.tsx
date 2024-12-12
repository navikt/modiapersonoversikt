import KnappBase from 'nav-frontend-knapper';
import RawModal from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { useState } from 'react';
import styled from 'styled-components';
import ErrorIkon from '../../../../svg/alvorlig-advarsel.svg';

const Modal = styled(RawModal)`
    text-align: center;
    min-width: 20rem;
`;
const Knapp = styled(KnappBase)`
    width: 100%;
`;

interface Props {
    egenAnsattFeiler: boolean;
}

function EgenAnsattFeilendeSystemModal(props: Props) {
    const [open, setOpen] = useState(props.egenAnsattFeiler);

    return (
        <Modal
            isOpen={open}
            contentLabel="FeilendeSystemEgenAnsatt"
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => {
                setOpen(false);
            }}
        >
            <ErrorIkon width="2rem" className="blokk-xs" />
            <Systemtittel tag="h1" className="blokk-xs" role="alert" aria-live="assertive">
                OBS!!
            </Systemtittel>

            <div className="noncenter typo-normal blokk-m">
                <p>Feilet ved uthenting av informasjon om egen ansatt.</p>
                <p>Vær obs på at etikett vil mangle på egen ansatt.</p>
            </div>

            <Knapp type="hoved" className="blokk-xxxs" onClick={() => setOpen(false)}>
                Ok
            </Knapp>
        </Modal>
    );
}

export default EgenAnsattFeilendeSystemModal;
