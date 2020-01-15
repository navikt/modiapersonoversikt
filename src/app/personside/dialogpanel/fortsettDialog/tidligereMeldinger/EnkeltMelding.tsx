import { Melding } from '../../../../../models/meldinger/meldinger';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { formatterDatoTidMedMaanedsnavn } from '../../../../../utils/dateUtils';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import * as React from 'react';
import styled from 'styled-components/macro';
import Tekstomrade from '../../../../../components/tekstomrade/tekstomrade';
import { meldingstittel } from '../../../infotabs/meldinger/utils/meldingerUtils';
import theme from '../../../../../styles/personOversiktTheme';
import { Avsender } from '../../../infotabs/meldinger/traadvisning/Enkeltmelding';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';

const EnkeltMeldingStyle = styled.div`
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
    melding: Melding;
    erEnkeltstaende: boolean;
    defaultApen: boolean;
}

function EnkeltMelding(props: Props) {
    const tittelId = useRef(guid());

    const header = (
        <EnkeltMeldingStyle>
            <Element tag="h4" id={tittelId.current}>
                {meldingstittel(props.melding)}
            </Element>
            <Undertekst>{formatterDatoTidMedMaanedsnavn(props.melding.opprettetDato)}</Undertekst>
            <Avsender melding={props.melding} />
        </EnkeltMeldingStyle>
    );

    return (
        <li>
            <article aria-describedby={tittelId.current}>
                <StyledEkspanderbartpanelBase heading={header} apen={props.defaultApen}>
                    <StyledTekstomrade>{props.melding.fritekst}</StyledTekstomrade>
                </StyledEkspanderbartpanelBase>
            </article>
        </li>
    );
}

export default EnkeltMelding;
