import { Behandlingsstatus, Sakstema } from '../../../../../models/saksoversikt/sakstema';
import * as React from 'react';
import { saksikon, SVGStyling, visAntallSakerSomHarBehandlingsstatus } from './SakstemaListeUtils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentFormattertDatoForSisteHendelse } from '../utils/saksoversiktUtils';
import styled from 'styled-components/macro';

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
    sakstema: Sakstema;
}

function SakstemaListeElementCheckboks(props: CheckboksProps) {
    const sakerUnderBehandling = visAntallSakerSomHarBehandlingsstatus(
        props.sakstema,
        Behandlingsstatus.UnderBehandling,
        'under behandling'
    );

    const sakerFerdigBehandlet = visAntallSakerSomHarBehandlingsstatus(
        props.sakstema,
        Behandlingsstatus.FerdigBehandlet,
        'ferdig behandlet'
    );

    return (
        <CheckboksElement>
            <div>
                <Normaltekst>{hentFormattertDatoForSisteHendelse(props.sakstema)}</Normaltekst>
                <Element>{props.sakstema.temanavn}</Element>
                {sakerUnderBehandling}
                {sakerFerdigBehandlet}
            </div>
            <SVGStyling>{saksikon(props.sakstema.harTilgang)}</SVGStyling>
        </CheckboksElement>
    );
}

export default React.memo(SakstemaListeElementCheckboks);
