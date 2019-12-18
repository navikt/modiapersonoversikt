import * as React from 'react';
import { Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import OppmoteIkon from '../../../../../svg/OppmoteIkon';
import TelefonIkon from '../../../../../svg/TelefonIkon';
import OppgaveIkon from '../../../../../svg/OppgaveIkon';
import DokumentIkon from '../../../../../svg/DokumentIkon';
import MonologIkon from '../../../../../svg/MonologIkon';
import DialogIkon from '../../../../../svg/DialogIkon';
import styled, { css } from 'styled-components';
import { pxToRem } from '../../../../../styles/personOversiktTheme';
import { UndertekstBold } from 'nav-frontend-typografi';
import { erMonolog, erUbesvartHenvendelseFraBruker, nyesteMelding } from './meldingerUtils';
import BrevIkon from '../../../../../svg/BrevIkon';

interface MeldingsikonProps {
    traad: Traad;
}

const Styling = styled.span<{ visNumberBadge: boolean }>`
    position: relative;
    svg {
        height: ${pxToRem(25)};
        width: ${pxToRem(25)};
        ${props =>
            props.visNumberBadge &&
            css`
                clip-path: polygon(0 0, 73% 0, 73% 51%, 100% 52%, 100% 100%, 0 100%);
            `};
    }
`;

const NumberBadge = styled(UndertekstBold)`
    position: absolute;
    top: ${pxToRem(-3)};
    right: ${pxToRem(-4)};
    border-radius: 50%;
    padding: 0 0.1rem;
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
                    {antallMeldinger} <span className="sr-only">meldinger</span>
                </NumberBadge>
            )}
        </Styling>
    );
}

export default Meldingsikon;
