import * as React from 'react';
import { Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import OppmoteIkon from '../../../../../svg/OppmoteIkon';
import TelefonIkon from '../../../../../svg/TelefonIkon';
import OppgaveIkon from '../../../../../svg/OppgaveIkon';
import DokumentIkon from '../../../../../svg/DokumentIkon';
import MonologIkon from '../../../../../svg/MonologIkon';
import DialogIkon from '../../../../../svg/DialogIkon';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { erMonolog, erUbesvartHenvendelseFraBruker, nyesteMelding } from './meldingerUtils';
import BrevIkon from '../../../../../svg/BrevIkon';
import { Undertekst } from 'nav-frontend-typografi';

interface MeldingsikonProps {
    traad: Traad;
}

const Styling = styled.span<{ visNumberBadge: boolean }>`
    position: relative;
    svg {
        height: ${pxToRem(25)};
        width: ${pxToRem(25)};
        opacity: 0.4;
    }
`;

const NumberBadge = styled(Undertekst)`
    position: absolute;
    top: ${pxToRem(-3)};
    right: ${pxToRem(-8)};
    background-color: ${theme.color.navGra60};
    color: white;
    height: 1.1rem;
    width: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

function Ikon({ props }: { props: MeldingsikonProps }) {
    const sisteMelding = nyesteMelding(props.traad);

    switch (sisteMelding.meldingstype) {
        case Meldingstype.SAMTALEREFERAT_OPPMOTE:
            return <OppmoteIkon />;
        case Meldingstype.SAMTALEREFERAT_TELEFON:
            return <TelefonIkon />;
        case Meldingstype.OPPGAVE_VARSEL:
            return <OppgaveIkon />;
        case Meldingstype.DOKUMENT_VARSEL:
            return <DokumentIkon />;
        default: {
            if (erUbesvartHenvendelseFraBruker(props.traad)) {
                return <BrevIkon alt="Ubesvart henvendelse" />;
            }
            if (erMonolog(props.traad)) {
                return <MonologIkon />;
            } else {
                return <DialogIkon />;
            }
        }
    }
}

function Meldingsikon(props: MeldingsikonProps) {
    const antallMeldinger = props.traad.meldinger.length;
    const visNumberBadge = antallMeldinger > 1;
    return (
        <Styling visNumberBadge={visNumberBadge}>
            <Ikon props={props} />
            {visNumberBadge && (
                <NumberBadge>
                    {antallMeldinger} <span className="sr-only">tekster</span>
                </NumberBadge>
            )}
        </Styling>
    );
}

export default Meldingsikon;
