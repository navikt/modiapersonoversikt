import * as React from 'react';
import { useState } from 'react';
import RawModal from 'nav-frontend-modal';
import KnappBase from 'nav-frontend-knapper';
import styled from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as ErrorIkon } from '../../../../svg/alvorlig-advarsel.svg';
import { InformasjonElement } from '../PersondataDomain';

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
    const tekster = {
        [InformasjonElement.EGEN_ANSATT]: 'Vi fikk ikke hentet ut informasjon om egen ansatt',
        [InformasjonElement.PDL_TREDJEPARTSPERSONER]:
            'Vi får ikke hentet informasjon om foreldre/barn/ektefelle/advokat/etc',
        [InformasjonElement.DKIF]: 'Vi får ikke hentet digital kontaktinformasjon',
        [InformasjonElement.PDL_GT]: 'Vi får ikke hentet informasjon om geografisk tilknytning',
        [InformasjonElement.BANKKONTO]: 'Vi får ikke hentet informasjon om bankkonto',
        [InformasjonElement.VEILEDER_ROLLER]: 'Vi får ikke hentet informasjon om veileders roller',
        [InformasjonElement.NORG_KONTAKTINFORMASJON]: 'Vi får ikke hentet kontaktinformasjonen',
        [InformasjonElement.NORG_NAVKONTOR]: 'Vi får ikke hentet informasjon om NAV-kontor'
    };
    const feilendeSystem = props.feilendeSystemer.map((it) => (
        <li key={it} className="blokk-xxs">
            {tekster[it]}
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
