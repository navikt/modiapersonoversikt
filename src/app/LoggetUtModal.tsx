import AdvarselIkon from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import ErrorIkon from 'nav-frontend-ikoner-assets/assets/feil-sirkel-fyll.svg';
import KnappBase from 'nav-frontend-knapper';
import RawModal from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import type { PersistentLoginState } from 'src/login/use-persistent-ww-login';
import styled from 'styled-components';

const Modal = styled(RawModal)`
  text-align: center;
`;
const Knapp = styled(KnappBase)`
  display: block;
  width: 100%;
`;

interface Props {
    loginState: PersistentLoginState;
}
type Config = {
    visModal: boolean;
    ikon: React.ComponentType<{ width?: string | number; className?: string }> | string;
    header: string;
    tekst: string;
};
function finnConfig(state: PersistentLoginState): Config {
    if (state.errorStatus) {
        return {
            ikon: ErrorIkon,
            header: 'Feil ved login-sjekk',
            tekst: `Det skjedde en feil ved verifisering av login (${state.errorStatus}). Prøv å laste inn siden på nytt.`,
            visModal: true
        };
    }
    if (!state.isLoggedIn) {
        return {
            ikon: AdvarselIkon,
            header: 'Du har blitt logget ut',
            tekst: 'Velg last siden på nytt så blir du automatisk logget inn igjen.',
            visModal: true
        };
    }
    return {
        ikon: '',
        header: '',
        tekst: '',
        visModal: false
    };
}

function LoggetUtModal(props: Props) {
    const [overstyrt, settOverstyrt] = React.useState(false);
    const config = finnConfig(props.loginState);

    return (
        <Modal
            isOpen={!overstyrt && config.visModal}
            contentLabel={config.header}
            closeButton={false}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => {}}
        >
            {React.createElement(config.ikon, {
                width: '2rem',
                className: 'blokk-xs'
            })}
            <Systemtittel tag="h1" className="blokk-xxxs">
                {config.header}
            </Systemtittel>
            <Normaltekst className="blokk-m">{config.tekst}</Normaltekst>

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
