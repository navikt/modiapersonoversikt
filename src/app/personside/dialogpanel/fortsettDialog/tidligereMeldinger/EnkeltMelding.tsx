import { useState } from 'react';
import styled from 'styled-components';
import Tekstomrade, { defaultRules } from 'nav-frontend-tekstomrade';
import { rule as sladdRule } from '../../../../../utils/sladdrule';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { Melding, Traad } from '../../../../../models/meldinger/meldinger';
import { formatterDatoTidMedMaanedsnavn } from '../../../../../utils/date-utils';
import { traadstittel } from '../../../infotabs/meldinger/utils/meldingerUtils';
import theme from '../../../../../styles/personOversiktTheme';
import { Avsender } from '../../../infotabs/meldinger/traadvisning/Enkeltmelding';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

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
            <StyledTekstomrade rules={[sladdRule, ...defaultRules]}>{props.melding.fritekst}</StyledTekstomrade>
        </StyledEkspanderbartpanelBase>
    );
}

export default EnkeltMelding;
