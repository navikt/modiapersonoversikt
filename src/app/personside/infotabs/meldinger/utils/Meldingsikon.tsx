import * as React from 'react';
import { Meldingstype } from '../../../../../models/meldinger/meldinger';
import OppmoteIkon from '../../../../../svg/OppmoteIkon';
import TelefonIkon from '../../../../../svg/TelefonIkon';
import OppgaveIkon from '../../../../../svg/OppgaveIkon';
import DokumentIkon from '../../../../../svg/DokumentIkon';
import MonologIkon from '../../../../../svg/MonologIkon';
import DialogIkon from '../../../../../svg/DialogIkon';
import styled from 'styled-components';
import { pxToRem, theme } from '../../../../../styles/personOversiktTheme';
import { UndertekstBold } from 'nav-frontend-typografi';

interface MeldingsikonProps {
    type: Meldingstype;
    erFerdigstiltUtenSvar: boolean;
    erMonolog: boolean;
    antallMeldinger: number;
}

const Styling = styled.span`
    position: relative;
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
    }
`;

const NumberBadge = styled(UndertekstBold)`
    position: absolute;
    top: ${pxToRem(-3)};
    right: ${pxToRem(9)};
    background-color: white;
    border-radius: 50%;
    padding: 0 0.1rem;
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
        <Styling>
            <Ikon props={props} />
            {props.antallMeldinger > 1 && <NumberBadge>{props.antallMeldinger}</NumberBadge>}
        </Styling>
    );
}

export default Meldingsikon;
