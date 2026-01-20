import KnappBase from 'nav-frontend-knapper';
import RawModal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { useState } from 'react';
import styled from 'styled-components';
import ErrorIkon from '../../../../svg/alvorlig-advarsel.svg';
import GyldighetsPeriode from '../body/GyldighetsPeriode';
import type { Sikkerhetstiltak } from '../PersondataDomain';

const Modal = styled(RawModal)`
    text-align: center;
    min-width: 20rem;
`;
const Knapp = styled(KnappBase)`
    width: 100%;
`;

interface Props {
    sikkerhetstiltak: Sikkerhetstiltak[];
}

function SikkerhetstiltakModal(props: Props) {
    const [open, setOpen] = useState(props.sikkerhetstiltak.isNotEmpty());
    const sikkerhetstiltak = props.sikkerhetstiltak.map((it, index) => (
        <li key={index} className="blokk-xxs">
            <GyldighetsPeriode gyldighetsPeriode={it.gyldighetsPeriode} />
            <Normaltekst>{it.beskrivelse}</Normaltekst>
        </li>
    ));
    return (
        <Modal
            isOpen={open}
            contentLabel="Sikkerhetstiltak"
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => {
                setOpen(false);
            }}
        >
            <ErrorIkon width="2rem" className="blokk-xs" />
            <Systemtittel tag="h1" className="blokk-xs" role="alert" aria-live="assertive">
                Sikkerhetstiltak
            </Systemtittel>

            <div className="noncenter typo-normal blokk-m">
                <ul>{sikkerhetstiltak}</ul>
            </div>

            <Knapp type="hoved" className="blokk-xxxs" onClick={() => setOpen(false)}>
                Ok
            </Knapp>
        </Modal>
    );
}

export default SikkerhetstiltakModal;
