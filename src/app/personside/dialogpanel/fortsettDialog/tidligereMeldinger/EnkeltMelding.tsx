import { Melding, Meldingstype } from '../../../../../models/meldinger/meldinger';
import { Ingress, Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import { capitalizeName } from '../../../../../utils/stringFormatting';
import { formatterDatoTidMedMaanedsnavn } from '../../../../../utils/dateUtils';
import { meldingstypeTekst, temagruppeTekst } from '../../../infotabs/meldinger/utils/meldingstekster';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import * as React from 'react';
import styled, { css } from 'styled-components';
import Tekstomrade from '../../../../../components/tekstomrade/tekstomrade';

function Meldingsforfatter(props: { melding: Melding }) {
    if (
        props.melding.erDokumentMelding ||
        [Meldingstype.SPORSMAL_SKRIFTLIG, Meldingstype.SPORSMAL_SKRIFTLIG_DIREKTE].includes(props.melding.meldingstype)
    ) {
        return null;
    }
    const forfatter = props.melding.skrevetAv;
    return (
        <Undertekst>
            Skrevet av {capitalizeName(forfatter.fornavn)} {capitalizeName(forfatter.etternavn)} ({forfatter.ident})
        </Undertekst>
    );
}

const EnkeltMeldingStyle = styled.div`
    width: 100%;
    padding-right: 1rem;
`;

const InlineStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledTekstomrade = styled(Tekstomrade)`
    padding: 1rem;
`;

const StyledEkspanderbartpanelBase = styled(EkspanderbartpanelBase)<{ erEnkeltsaende: boolean }>`
    &.ekspanderbartPanel {
        ${props =>
            !props.erEnkeltsaende
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
        <StyledEkspanderbartpanelBase heading={header} erEnkeltsaende={props.erEnkeltstaende} apen={props.defaultApen}>
            <StyledTekstomrade>{props.melding.fritekst}</StyledTekstomrade>
        </StyledEkspanderbartpanelBase>
    );
}

export default EnkeltMelding;
