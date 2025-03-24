import { guid } from 'nav-frontend-js-utils';
import Snakkeboble from 'nav-frontend-snakkeboble';
import Tekstomrade, { createDynamicHighlightingRule, type Rule } from 'nav-frontend-tekstomrade';
import { useRef } from 'react';
import styled from 'styled-components';
import { LestStatus, type Melding } from '../../../../../models/meldinger/meldinger';
import theme from '../../../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../../../utils/date-utils';
import { rule as sladdRule } from '../../../../../utils/sladdrule';
import { erMeldingFraBruker, erMeldingFraNav } from '../utils/meldingerUtils';
import './enkeltmelding.less';
import { LinebreakRule } from '@navikt/textparser';
import { LinkRule, ParagraphRuleOverride } from 'src/components/RichText';
import ReadIcon from '../../../../../svg/ReadIcon';
import UnReadIcon from '../../../../../svg/UnReadIcon';

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
    font-size: 0.85rem;
`;

const StyledMeldingStatus = styled.div`
    display: flex;
    gap: 0.3rem;
    margin-left: auto;
`;

export function Avsender({ melding }: { melding: Melding; rule?: Rule }) {
    if (erMeldingFraBruker(melding.meldingstype)) {
        return null;
    }
    const avsender = `Skrevet av ${melding.skrevetAvTekst}`;
    return <StyledText>{avsender}</StyledText>;
}

function LestDato({ melding }: { melding: Melding }) {
    if (erMeldingFraBruker(melding.meldingstype)) {
        return null;
    }
    const lestDato =
        melding.lestDato && melding.status !== LestStatus.IkkeLest
            ? `Lest: ${formatterDatoTid(melding.lestDato)}`
            : 'Ikke lest';
    return <StyledText>{lestDato}</StyledText>;
}
function LestStatusIcon({ melding }: { melding: Melding }) {
    if (erMeldingFraBruker(melding.meldingstype)) {
        return null;
    }
    return melding.status === LestStatus.IkkeLest ? <UnReadIcon /> : <ReadIcon />;
}

function EnkeltMelding(props: Props) {
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
                        <Tekstomrade rules={[sladdRule, highlightRule, LinebreakRule, LinkRule, ParagraphRuleOverride]}>
                            {props.melding.fritekst}
                        </Tekstomrade>
                        <div>
                            <MeldingInfoWrapper>
                                <StyledText>{datoTekst}</StyledText>
                                <Avsender melding={props.melding} />
                                <StyledMeldingStatus>
                                    <LestDato melding={props.melding} />
                                    <LestStatusIcon melding={props.melding} />
                                </StyledMeldingStatus>
                            </MeldingInfoWrapper>
                        </div>
                    </SnakkebobleWrapper>
                </Snakkeboble>
            </article>
        </StyledLi>
    );
}

export default EnkeltMelding;
