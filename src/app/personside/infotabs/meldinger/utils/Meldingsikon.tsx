import * as React from 'react';
import { Meldingstype } from '../../../../../models/meldinger/meldinger';
import OppmoteIkon from '../../../../../svg/OppmoteIkon';
import TelefonIkon from '../../../../../svg/TelefonIkon';
import OppgaveIkon from '../../../../../svg/OppgaveIkon';
import DokumentIkon from '../../../../../svg/DokumentIkon';
import MonologIkon from '../../../../../svg/MonologIkon';
import DialogIkon from '../../../../../svg/DialogIkon';
import styled from 'styled-components';
import { theme } from '../../../../../styles/personOversiktTheme';

interface MeldingsikonProps {
    type: Meldingstype;
    erFerdigstiltUtenSvar: boolean;
    erMonolog: boolean;
}

const SVGStyling = styled.span`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
    }
`;

function Ikon({ props }: { props: MeldingsikonProps }) {
    switch (props.type) {
        case Meldingstype.SamtalereferatOppmøte:
            return <OppmoteIkon />;
        case Meldingstype.SamtalereferatTelefon:
            return <TelefonIkon />;
        case Meldingstype.OppgaveVarsel:
            return <OppgaveIkon />;
        case Meldingstype.DokumentVarsel:
            return <DokumentIkon />;
        default: {
            // TODO Vi må legge på et ekstra besvart / ubesvart ikon...
            if (props.erMonolog) {
                return <MonologIkon />;
            } else {
                return <DialogIkon />;
            }
        }
    }
}

function Meldingsikon(props: MeldingsikonProps) {
    return (
        <SVGStyling>
            <Ikon props={props} />
        </SVGStyling>
    );
}

export default Meldingsikon;
