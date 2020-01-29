import { Melding } from '../../../../../models/meldinger/meldinger';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { formatterDatoTidMedMaanedsnavn } from '../../../../../utils/dateUtils';
import { EkspanderbartpanelBasePure } from 'nav-frontend-ekspanderbartpanel';
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/macro';
import Tekstomrade from '../../../../../components/tekstomrade/tekstomrade';
import { meldingstittel } from '../../../infotabs/meldinger/utils/meldingerUtils';
import theme from '../../../../../styles/personOversiktTheme';
import { Avsender } from '../../../infotabs/meldinger/traadvisning/Enkeltmelding';

const HeaderStyle = styled.div`
    width: 100%;
    padding-right: 1rem;
`;

const StyledTekstomrade = styled(Tekstomrade)`
    padding: 1.5rem 1rem 1rem;
    overflow-wrap: break-word;
    padding-top: 0;
`;

const StyledEkspanderbartpanelBasePure = styled(EkspanderbartpanelBasePure)`
    ${theme.resetEkspanderbartPanelStyling};
    .ekspanderbartPanel__hode:focus {
        ${theme.focusInset};
    }
`;

interface Props {
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
            <Element tag="h4">{meldingstittel(props.melding)}</Element>
            <Undertekst>{formatterDatoTidMedMaanedsnavn(props.melding.opprettetDato)}</Undertekst>
            <Avsender melding={props.melding} />
        </HeaderStyle>
    );

    return (
        <li>
            <StyledEkspanderbartpanelBasePure heading={header} apen={apen} onClick={() => setApen(!apen)}>
                <StyledTekstomrade>{props.melding.fritekst}</StyledTekstomrade>
            </StyledEkspanderbartpanelBasePure>
        </li>
    );
}

export default EnkeltMelding;
