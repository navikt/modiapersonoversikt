import * as React from 'react';
import { useRef } from 'react';
import { LestStatus, Melding } from '../../../../../models/meldinger/meldinger';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { erMeldingFraBruker, erMeldingFraNav } from '../utils/meldingerUtils';
import { formatterDatoTid } from '../../../../../utils/date-utils';
import styled from 'styled-components/macro';
import Tekstomrade, { createDynamicHighlightingRule, defaultRules, Rule } from 'nav-frontend-tekstomrade';
import { rule as sladdRule } from '../../../../../utils/sladdrule';
import { guid } from 'nav-frontend-js-utils';
import theme from '../../../../../styles/personOversiktTheme';
import './enkeltmelding.less';

interface Props {
    melding: Melding;
    sokeord: string;
    meldingsNummer: number;
}

const StyledLi = styled.li`
    .snakkeboble-panel {
        flex-basis: 40rem;
        padding: 0.5rem 0.5rem 0.3rem;
    }
    a {
        word-break: break-word; /* Hvis ikke kan snakkeboblen vokse seg ut av container uten mulighet for scroll */
    }
    .snakkeboble {
        margin: 0;
    }
    @media print {
        page-break-inside: avoid;
        border: ${theme.border.skille};
        margin-bottom: 2rem;

        .snakkeboble__snakkeboble-pil-container,
        .nav-ikon,
        .bruker-ikon {
            display: none;
        }

        .snakkeboble-panel {
            flex-basis: 100%;
        }
    }
`;

const MeldingInfoWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const SnakkebobleWrapper = styled.div`
    text-align: left;
    em {
        font-style: normal;
        ${theme.highlight}
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const StyledText = styled.p`
    font-size: 0.75rem;
`;

export function Avsender({ melding, rule }: { melding: Melding; rule?: Rule }) {
    if (erMeldingFraBruker(melding.meldingstype)) {
        return null;
    }
    const avsender = `Skrevet av ${melding.skrevetAvTekst}`;
    return <StyledText>{avsender}</StyledText>;
}

export function LestDato({ melding }: { melding: Melding }) {
    if (melding.status === LestStatus.IkkeLest || erMeldingFraBruker(melding.meldingstype)) {
        return null;
    }
    const lestDato = melding.lestDato ? `Lest: ${formatterDatoTid(melding.lestDato)}` : 'Ikke lest';
    return <StyledText>{lestDato}</StyledText>;
}
function NyEnkeltMelding(props: Props) {
    const fraNav = erMeldingFraNav(props.melding.meldingstype);
    const tittelId = useRef(guid());
    const datoTekst = props.melding.ferdigstiltDato
        ? formatterDatoTid(props.melding.ferdigstiltDato)
        : formatterDatoTid(props.melding.opprettetDato);
    const highlightRule = createDynamicHighlightingRule(props.sokeord.split(' '));

    return (
        <StyledLi className="snakkeboble_ikoner">
            <article aria-labelledby={tittelId.current}>
                <Snakkeboble pilHoyre={fraNav} ikonClass={fraNav ? 'nav-ikon' : 'bruker-ikon'}>
                    <SnakkebobleWrapper>
                        <Tekstomrade rules={[sladdRule, highlightRule, ...defaultRules]}>
                            {props.melding.fritekst}
                        </Tekstomrade>
                        <div>
                            <MeldingInfoWrapper>
                                <StyledText>{datoTekst}</StyledText>
                                <Avsender melding={props.melding} />
                                <LestDato melding={props.melding} />
                            </MeldingInfoWrapper>
                        </div>
                    </SnakkebobleWrapper>
                </Snakkeboble>
            </article>
        </StyledLi>
    );
}

export default NyEnkeltMelding;
