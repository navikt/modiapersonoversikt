import { Behandlingsstatus, SakstemaSoknadsstatus } from '../../../../../models/saksoversikt/sakstema';
import * as React from 'react';
import { saksikon, SVGStyling, visAntallSakerSomHarbehandlingsstatusV2 } from './SakstemaListeUtils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { hentFormattertDatoForSisteHendelseV2 } from '../utils/saksoversiktUtilsV2';

const CheckboksElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .checkbox {
        label {
            font-weight: bold;
        }
    }
`;

interface CheckboksProps {
    sakstema: SakstemaSoknadsstatus;
}

function SakstemaListeElementCheckboks(props: CheckboksProps) {
    const sakerUnderBehandling = visAntallSakerSomHarbehandlingsstatusV2(
        props.sakstema,
        Behandlingsstatus.UnderBehandling,
        'under behandling'
    );

    const sakerFerdigBehandlet = visAntallSakerSomHarbehandlingsstatusV2(
        props.sakstema,
        Behandlingsstatus.FerdigBehandlet,
        'ferdig behandlet'
    );

    return (
        <CheckboksElement>
            <div>
                <Normaltekst>{hentFormattertDatoForSisteHendelseV2(props.sakstema)}</Normaltekst>
                <Element>{props.sakstema.temanavn}</Element>
                {sakerUnderBehandling}
                {sakerFerdigBehandlet}
            </div>
            <SVGStyling>{saksikon(props.sakstema.harTilgang)}</SVGStyling>
        </CheckboksElement>
    );
}

export default React.memo(SakstemaListeElementCheckboks);
