import * as React from 'react';
import { useState } from 'react';
import RawModal from 'nav-frontend-modal';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components/macro';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as ErrorIkon } from '../../../../svg/alvorlig-advarsel.svg';

const Modal = styled(RawModal)`
    text-align: center;
    min-width: 20rem;
`;
const Knapp = styled(KnappBase)`
    width: 100%;
`;

interface Props {
    feilendeSystemer: Array<string>;
}

function FeilendeSystemerModal(props: Props) {
    const [open, setOpen] = useState(props.feilendeSystemer.isNotEmpty());
    const feilendeSystem = props.feilendeSystemer.map((it, index) => (
        <li key={index} className="blokk-xxs">
            <Normaltekst>{it}</Normaltekst>
        </li>
    ));
    return (
        <Modal
            isOpen={open}
            contentLabel="FeilendeSystem"
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => {
                setOpen(false);
            }}
        >
            <ErrorIkon width="2rem" className="blokk-xs" />
            <Systemtittel tag="h1" className="blokk-xs" role="alert" aria-live="assertive">
                Feilende system
            </Systemtittel>

            <div className="noncenter typo-normal blokk-m">
                <ul>{feilendeSystem}</ul>
            </div>

            <Knapp type="hoved" className="blokk-xxxs" onClick={() => setOpen(false)}>
                Ok
            </Knapp>
        </Modal>
    );
}

export default FeilendeSystemerModal;
