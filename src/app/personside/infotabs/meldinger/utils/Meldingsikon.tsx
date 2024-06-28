import * as React from 'react';
import { Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import OppmoteIkon from '../../../../../svg/OppmoteIkon';
import TelefonIkon from '../../../../../svg/TelefonIkon';
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

const StyledBrevIkon = styled(BrevIkon)`
    opacity: 1 !important;
    g {
        fill: ${theme.color.navRod} !important;
    }
`;

function Ikon({ props }: { props: MeldingsikonProps }) {
    const sisteMelding = nyesteMelding(props.traad);

    switch (sisteMelding.meldingstype) {
        case Meldingstype.SAMTALEREFERAT_OPPMOTE:
            return <OppmoteIkon />;
        case Meldingstype.SAMTALEREFERAT_TELEFON:
            return <TelefonIkon />;
        default: {
            if (erUbesvartHenvendelseFraBruker(props.traad)) {
                return (
                    <span>
                        <StyledBrevIkon />
                        <span className="sr-only">Ubesvart</span>
                    </span>
                );
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
            {visNumberBadge && <NumberBadge aria-hidden="true">{antallMeldinger}</NumberBadge>}
        </Styling>
    );
}

export default Meldingsikon;
