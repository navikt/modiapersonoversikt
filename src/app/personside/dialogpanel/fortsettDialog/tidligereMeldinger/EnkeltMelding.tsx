import { Melding } from '../../../../../models/meldinger/meldinger';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { formatterDatoTidMedMaanedsnavn } from '../../../../../utils/dateUtils';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import Tekstomrade from '../../../../../components/tekstomrade/tekstomrade';
import { meldingstittel } from '../../../infotabs/meldinger/utils/meldingerUtils';
import theme from '../../../../../styles/personOversiktTheme';
import { SkrevetAv } from '../../../infotabs/meldinger/traadvisning/Enkeltmelding';

const EnkeltMeldingStyle = styled.div`
    width: 100%;
    padding-right: 1rem;
`;

const StyledTekstomrade = styled(Tekstomrade)`
    padding: 1rem;
    overflow-wrap: break-word;
    padding-top: 0;
`;

const StyledEkspanderbartpanelBase = styled(({ erEnkeltstaende, ...rest }) => <EkspanderbartpanelBase {...rest} />)<{
    erEnkeltstaende: boolean;
}>`
    &.ekspanderbartPanel {
        ${props =>
            !props.erEnkeltstaende
                ? css`
                      border-radius: 0;
                  `
                : ''};
    }
    border-top: 0.1rem rgba(0, 0, 0, 0.2) solid;
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
    const header = (
        <EnkeltMeldingStyle>
            <Element>{meldingstittel(props.melding)}</Element>
            <Undertekst>{formatterDatoTidMedMaanedsnavn(props.melding.opprettetDato)}</Undertekst>
            <SkrevetAv melding={props.melding} />
        </EnkeltMeldingStyle>
    );
    return (
        <StyledEkspanderbartpanelBase heading={header} erEnkeltstaende={props.erEnkeltstaende} apen={props.defaultApen}>
            <StyledTekstomrade>{props.melding.fritekst}</StyledTekstomrade>
        </StyledEkspanderbartpanelBase>
    );
}

export default EnkeltMelding;
