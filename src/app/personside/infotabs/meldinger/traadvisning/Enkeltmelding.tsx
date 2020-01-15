import * as React from 'react';
import { useRef, useState } from 'react';
import { LestStatus, Melding } from '../../../../../models/meldinger/meldinger';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import {
    erDelsvar,
    erJournalfort,
    erMeldingFraBruker,
    erMeldingFraNav,
    meldingstittel,
    saksbehandlerTekst
} from '../utils/meldingerUtils';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { formaterDato } from '../../../../../utils/stringFormatting';
import styled from 'styled-components/macro';
import Tekstomrade, {
    createDynamicHighligtingRule,
    LinkRule,
    ParagraphRule
} from '../../../../../components/tekstomrade/tekstomrade';
import theme from '../../../../../styles/personOversiktTheme';
import './enkeltmelding.less';
import Etikett from 'nav-frontend-etiketter';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { SpaceBetween } from '../../../../../components/common-styled-components';
import { Rule } from '../../../../../components/tekstomrade/parser/domain';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    melding: Melding;
    sokeord: string;
}

const StyledLi = styled.li`
    .snakkeboble-panel {
        flex-basis: 40rem;
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
const SkrevetAvTekst = styled(Normaltekst)`
    margin-right: 0.3rem !important;
`;

const SkrevetAvStyle = styled.div`
    display: flex;
`;

const BoldTekstomrade = styled(Tekstomrade)`
    font-weight: 600;
`;
const Topptekst = styled.div`
    /* Trengs for borders */
`;

const SnakkebobleWrapper = styled.div`
    text-align: left;
    em {
        font-style: normal;
        ${theme.highlight}
    }
    > *:not(:last-child) {
        border-bottom: ${theme.border.skilleSvak};
        padding-bottom: 0.7rem;
        margin-bottom: 0.5rem;
    }
`;

const JournalforingLabel = styled(EtikettLiten)`
    color: ${theme.color.lenke};
`;

const StyledJournalforingPanel = styled(EkspanderbartpanelBase)`
    .ekspanderbartPanel__hode,
    .ekspanderbartPanel__innhold {
        padding: 0.3rem 0;
    }
    @media print {
        display: none;
    }
`;

const StyledPrintTekst = styled.div`
    display: none;
    @media print {
        display: inline-block;
    }
`;

function journalfortMelding(melding: Melding) {
    const navn = melding.journalfortAv ? saksbehandlerTekst(melding.journalfortAv) : 'ukjent';
    const dato = melding.journalfortDato ? formaterDato(melding.journalfortDato) : 'ukjent dato';
    const tema = melding.journalfortTemanavn ? `tema ${melding.journalfortTemanavn}` : 'ukjent tema';
    const saksid = melding.journalfortSaksid ? `saksid ${melding.journalfortSaksid}` : 'ukjent saksid';
    return `Journalført av ${navn} ${dato} på ${tema} med ${saksid}`;
}

function Journalforing({ melding }: { melding: Melding }) {
    const [open, setOpen] = useState(false);
    if (!erJournalfort(melding)) {
        return null;
    }

    return (
        <StyledJournalforingPanel
            heading={<JournalforingLabel>Meldingen er journalført</JournalforingLabel>}
            apen={open}
            onClick={() => setOpen(!open)}
        >
            {journalfortMelding(melding)}
        </StyledJournalforingPanel>
    );
}

function MeldingLestEtikett({ melding }: { melding: Melding }) {
    if (erMeldingFraBruker(melding.meldingstype)) {
        return null;
    }
    if (erDelsvar(melding)) {
        return <Etikett type="info">Delsvar</Etikett>;
    }
    if (melding.status === LestStatus.Lest) {
        return <Etikett type="suksess">Lest</Etikett>;
    }
    if (melding.status === LestStatus.IkkeLest) {
        return <Etikett type="advarsel">Ulest</Etikett>;
    }
    return null;
}

function PrintTekst({ melding }: { melding: Melding }) {
    const journalfort = erJournalfort(melding) && <Element>{journalfortMelding(melding)}</Element>;
    return <StyledPrintTekst>{journalfort}</StyledPrintTekst>;
}

export function SkrevetAv({ melding, rule }: { melding: Melding; rule?: Rule }) {
    if (erMeldingFraBruker(melding.meldingstype)) {
        return null;
    }
    return (
        <SkrevetAvStyle>
            <SkrevetAvTekst>Skrevet av:</SkrevetAvTekst>
            <Tekstomrade className={'typo-normal'} rules={rule && [rule]}>
                {melding.skrevetAvTekst}
            </Tekstomrade>
        </SkrevetAvStyle>
    );
}

function EnkeltMelding(props: Props) {
    const fraNav = erMeldingFraNav(props.melding.meldingstype);
    const tittel = meldingstittel(props.melding);
    const tittelId = useRef(guid());
    const datoTekst = props.melding.ferdigstiltDato
        ? formatterDatoTid(props.melding.ferdigstiltDato)
        : formatterDatoTid(props.melding.opprettetDato);
    const highlightRule = createDynamicHighligtingRule(props.sokeord.split(' '));

    return (
        <StyledLi className="snakkeboble_ikoner">
            <article aria-describedby={tittelId.current}>
                <Snakkeboble pilHoyre={fraNav} ikonClass={fraNav ? 'nav-ikon' : 'bruker-ikon'}>
                    <SnakkebobleWrapper>
                        <Topptekst>
                            <SpaceBetween>
                                <h4 id={tittelId.current}>
                                    <BoldTekstomrade rules={[highlightRule]}>{tittel}</BoldTekstomrade>
                                </h4>
                                <MeldingLestEtikett melding={props.melding} />
                            </SpaceBetween>
                            <Tekstomrade rules={[highlightRule]}>{datoTekst}</Tekstomrade>
                            <SkrevetAv melding={props.melding} rule={highlightRule} />
                        </Topptekst>
                        <Tekstomrade rules={[ParagraphRule, highlightRule, LinkRule]}>
                            {props.melding.fritekst}
                        </Tekstomrade>
                        <Journalforing melding={props.melding} />
                        <PrintTekst melding={props.melding} />
                    </SnakkebobleWrapper>
                </Snakkeboble>
            </article>
        </StyledLi>
    );
}

export default EnkeltMelding;
