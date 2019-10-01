import * as React from 'react';
import { LestStatus, Melding } from '../../../../../models/meldinger/meldinger';
import Snakkeboble from 'nav-frontend-snakkeboble';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { erMeldingFraNav, meldingstittel, saksbehandlerTekst } from '../utils/meldingerUtils';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { formaterDato } from '../../../../../utils/stringFormatting';
import styled from 'styled-components';
import Tekstomrade, {
    createDynamicHighligtingRule,
    LinkRule,
    ParagraphRule
} from '../../../../../components/tekstomrade/tekstomrade';
import theme from '../../../../../styles/personOversiktTheme';
import './enkeltmelding.less';
import Etikett from 'nav-frontend-etiketter';
import { useState } from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

interface Props {
    melding: Melding;
    sokeord: string;
}

const Inline = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const Topptekst = styled.div`
    /* SnakkebobleWrapper styler borders på dette elementet som inneholder alle topptekst elementene */
`;
const SnakkebobleWrapper = styled.div`
    text-align: left;
    em {
        font-style: normal;
        ${theme.highlight}
    }
    > *:not(:last-child) {
        border-bottom: ${theme.border.skilleSvak};
        padding-bottom: 0.5rem;
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
`;

function journalfortMelding(melding: Melding) {
    const navn = melding.journalfortAv && saksbehandlerTekst(melding.journalfortAv);
    const dato = melding.journalfortDato && formaterDato(melding.journalfortDato);
    return `Journalført av ${navn} ${dato} på tema ${melding.journalfortTemanavn} med saksid ${melding.journalfortSaksid}`;
}

function Journalforing({ melding }: { melding: Melding }) {
    const [open, setOpen] = useState(false);
    if (!melding.journalfortDato) {
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
    return melding.status === LestStatus.Lest ? (
        <Etikett type="suksess">Lest</Etikett>
    ) : (
        <Etikett type="advarsel">Ulest</Etikett>
    );
}

function EnkeltMelding(props: Props) {
    const fraNav = erMeldingFraNav(props.melding.meldingstype);
    const topptekst = meldingstittel(props.melding);
    const datoTekst = formatterDatoTid(props.melding.opprettetDato);
    const skrevetAv = saksbehandlerTekst(props.melding.skrevetAv);
    const highlightRule = createDynamicHighligtingRule(props.sokeord.split(' '));

    return (
        <div className="snakkeboble_ikoner">
            <Snakkeboble pilHoyre={fraNav} ikonClass={fraNav ? 'nav-ikon' : 'bruker-ikon'}>
                <SnakkebobleWrapper>
                    <Topptekst>
                        <Inline>
                            <Element>{topptekst}</Element>
                            <MeldingLestEtikett melding={props.melding} />
                        </Inline>
                        <Normaltekst>{datoTekst}</Normaltekst>
                        <Normaltekst>Skrevet av: {skrevetAv}</Normaltekst>
                    </Topptekst>
                    <Tekstomrade rules={[ParagraphRule, highlightRule, LinkRule]}>{props.melding.fritekst}</Tekstomrade>
                    <Journalforing melding={props.melding} />
                </SnakkebobleWrapper>
            </Snakkeboble>
        </div>
    );
}

export default EnkeltMelding;
