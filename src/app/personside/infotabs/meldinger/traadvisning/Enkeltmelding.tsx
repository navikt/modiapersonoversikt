import * as React from 'react';
import { Melding } from '../../../../../models/meldinger/meldinger';
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
import { useState } from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

interface Props {
    melding: Melding;
    sokeord: string;
}

const SnakkebobleWrapper = styled.div`
    text-align: left;
    em {
        font-style: normal;
        ${theme.highlight}
    }
`;

const EtikettGul = styled(EtikettLiten)`
    color: ${theme.color.lenke};
`;

const JournalforingPanel = styled(EkspanderbartpanelBase)`
    .ekspanderbartPanel__hode {
        padding: 0.5rem 0 0 0;
    }
    .ekspanderbartPanel__innhold {
        padding: 0.5rem 0 0 0;
    }
`;

function journalfortMelding(melding: Melding) {
    const navn = melding.journalfortAv && saksbehandlerTekst(melding.journalfortAv);
    const dato = melding.journalfortDato && formaterDato(melding.journalfortDato);
    return `Journalført av ${navn} ${dato} på tema ${melding.journalfortTemanavn} med saksid ${melding.journalfortSaksid}`;
}

function Journalforing({ melding }: { melding: Melding }) {
    const [open, setOpen] = useState(false);
    return melding.journalfortAv && melding.journalfortDato ? (
        <JournalforingPanel
            heading={<EtikettGul>Meldingen er journalført</EtikettGul>}
            apen={open}
            onClick={() => setOpen(!open)}
        >
            {journalfortMelding(melding)}
        </JournalforingPanel>
    ) : null;
}

function EnkeltMelding(props: Props) {
    const fraNav = erMeldingFraNav(props.melding.meldingstype);
    const topptekst = meldingstittel(props.melding, true);
    const datoTekst = formatterDatoTid(props.melding.opprettetDato);
    const skrevetAv = saksbehandlerTekst(props.melding.skrevetAv);
    const highlightRule = createDynamicHighligtingRule(props.sokeord.split(' '));

    return (
        <div className="snakkeboble_ikoner">
            <Snakkeboble pilHoyre={fraNav} ikonClass={fraNav ? 'nav-ikon' : 'bruker-ikon'}>
                <SnakkebobleWrapper>
                    <Element>{topptekst}</Element>
                    <Normaltekst>{datoTekst}</Normaltekst>
                    <Normaltekst>Skrevet av: {skrevetAv}</Normaltekst>
                    <hr />
                    <Tekstomrade rules={[ParagraphRule, highlightRule, LinkRule]}>{props.melding.fritekst}</Tekstomrade>
                    <Journalforing melding={props.melding} />
                </SnakkebobleWrapper>
            </Snakkeboble>
        </div>
    );
}

export default EnkeltMelding;
