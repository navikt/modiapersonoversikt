import { LinebreakRule } from '@navikt/textparser';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { useState } from 'react';
import { LinkRule, ParagraphRuleOverride } from 'src/components/RichText';
import styled from 'styled-components';
import type { Melding, Traad } from '../../../../../models/meldinger/meldinger';
import theme from '../../../../../styles/personOversiktTheme';
import { formatterDatoTidMedMaanedsnavn } from '../../../../../utils/date-utils';
import { rule as sladdRule } from '../../../../../utils/sladdrule';
import { Avsender } from '../../../infotabs/meldinger/traadvisning/Enkeltmelding';
import { traadstittel } from '../../../infotabs/meldinger/utils/meldingerUtils';

const HeaderStyle = styled.div`
    width: 100%;
    padding-right: 1rem;
`;

const StyledTekstomrade = styled(Tekstomrade)`
    padding: 1.5rem 1rem 1rem;
    overflow-wrap: break-word;
    padding-top: 0;
`;

const StyledEkspanderbartpanelBase = styled(EkspanderbartpanelBase)`
    ${theme.resetEkspanderbartPanelStyling};
    .ekspanderbartPanel__hode:focus {
        ${theme.focusInset};
    }
`;

interface Props {
    traad: Traad;
    melding: Melding;
    erEnkeltstaende: boolean;
    defaultApen: boolean;
    meldingsNummer: number;
}

function EnkeltMelding(props: Props) {
    const [apen, setApen] = useState(props.defaultApen);

    const header = (
        <HeaderStyle>
            <span className="sr-only">Melding {props.meldingsNummer}</span>
            <span className="sr-only">{apen ? 'Åpen' : 'Lukket'}</span>
            <Element tag="h4">{traadstittel(props.traad)}</Element>
            <Undertekst>{formatterDatoTidMedMaanedsnavn(props.melding.opprettetDato)}</Undertekst>
            <Avsender melding={props.melding} />
        </HeaderStyle>
    );

    return (
        <StyledEkspanderbartpanelBase tittel={header} apen={apen} onClick={() => setApen(!apen)} border={false}>
            <StyledTekstomrade rules={[sladdRule, LinebreakRule, LinkRule, ParagraphRuleOverride]}>
                {props.melding.fritekst}
            </StyledTekstomrade>
        </StyledEkspanderbartpanelBase>
    );
}

export default EnkeltMelding;
