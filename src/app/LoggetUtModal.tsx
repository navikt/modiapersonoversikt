import * as React from 'react';
import styled from 'styled-components/macro';
import RawModal from 'nav-frontend-modal';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { ReactComponent as AdvarselIkon } from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import KnappBase from 'nav-frontend-knapper';

const Modal = styled(RawModal)`
    text-align: center;
`;
const Knapp = styled(KnappBase)`
    display: block;
    width: 100%;
`;

interface Props {
    erLoggetInn: boolean;
}

function LoggetUtModal(props: Props) {
    const [overstyrt, settOverstyrt] = React.useState(false);
    return (
        <Modal
            isOpen={!overstyrt && !props.erLoggetInn}
            contentLabel="Du har blitt logget ut"
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => {}}
        >
            <AdvarselIkon width="2rem" className="blokk-xs" />
            <Systemtittel tag="h1" className="blokk-xxxs">
                Du har blitt logget ut
            </Systemtittel>
            <Normaltekst className="blokk-m">
                Ved å laste inn siden på nytt vil du bli automatisk logget inn igjen.
            </Normaltekst>

            <Knapp type="hoved" className="blokk-xxxs" onClick={() => window.location.reload()}>
                Last siden på nytt
            </Knapp>
            <Knapp type="flat" onClick={() => settOverstyrt(true)}>
                Fjern advarsel
            </Knapp>
        </Modal>
    );
}

export default LoggetUtModal;
