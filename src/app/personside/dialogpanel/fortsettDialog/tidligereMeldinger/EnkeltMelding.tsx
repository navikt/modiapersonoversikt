import { Melding } from '../../../../../models/meldinger/meldinger';
import { Ingress, Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import { formatterDatoTidMedMaanedsnavn } from '../../../../../utils/dateUtils';
import { meldingstypeTekst } from '../../../infotabs/meldinger/utils/meldingstekster';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import * as React from 'react';
import styled, { css } from 'styled-components';
import Tekstomrade from '../../../../../components/tekstomrade/tekstomrade';
import { temagruppeTekst } from '../../../../../models/Temagrupper';
import { erMeldingFraBruker } from '../../../infotabs/meldinger/utils/meldingerUtils';

function Meldingsforfatter(props: { melding: Melding }) {
    console.log(props.melding.erDokumentMelding);
    if (props.melding.erDokumentMelding || erMeldingFraBruker(props.melding.meldingstype)) {
        return null;
    }
    return <Undertekst>Skrevet av {props.melding.skrevetAvTekst}</Undertekst>;
}

const EnkeltMeldingStyle = styled.div`
    width: 100%;
    padding-right: 1rem;
`;

const InlineStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const StyledTekstomrade = styled(Tekstomrade)`
    padding: 1rem;
    overflow-wrap: break-word;
    padding-top: 0;
`;

const StyledEkspanderbartpanelBase = styled(EkspanderbartpanelBase)<{ erEnkeltstaende: boolean }>`
    &.ekspanderbartPanel {
        ${props =>
            !props.erEnkeltstaende
                ? css`
                      border-radius: 0;
                  `
                : ''};
    }
    border-top: 0.1rem rgba(0, 0, 0, 0.2) solid;
`;

interface Props {
    melding: Melding;
    erEnkeltstaende: boolean;
    defaultApen: boolean;
}

function EnkeltMelding(props: Props) {
    const header = (
        <EnkeltMeldingStyle>
            <Undertekst>{formatterDatoTidMedMaanedsnavn(props.melding.ferdigstiltDato)}</Undertekst>
            <Meldingsforfatter melding={props.melding} />
            <InlineStyle>
                <Ingress>{meldingstypeTekst(props.melding.meldingstype)}</Ingress>
                <UndertekstBold>{temagruppeTekst(props.melding.temagruppe)}</UndertekstBold>
            </InlineStyle>
        </EnkeltMeldingStyle>
    );
    return (
        <StyledEkspanderbartpanelBase heading={header} erEnkeltstaende={props.erEnkeltstaende} apen={props.defaultApen}>
            <StyledTekstomrade>{props.melding.fritekst}</StyledTekstomrade>
        </StyledEkspanderbartpanelBase>
    );
}

export default EnkeltMelding;
