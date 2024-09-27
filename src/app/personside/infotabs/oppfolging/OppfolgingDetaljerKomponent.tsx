import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import DescriptionList from '../../../../components/DescriptionList';
import { datoEllerNull } from '../../../../utils/string-utils';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { getErUnderOppfolging, getOppfolgingEnhet, getVeileder } from './oppfolging-utils';
import AlertStripe, { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

const StyledPanel = styled(Panel)`
    padding: ${pxToRem(15)};
    > *:first-child {
        margin-bottom: 1rem;
    }
`;

interface Props {
    detaljertOppfolging: DetaljertOppfolging;
    isError?: boolean;
}

function VisOppfolgingDetaljer(props: Props) {
    const headerId = useRef(guid());
    const detaljer = props.detaljertOppfolging;
    const meldeplikt = detaljer.meldeplikt ? 'Ja' : detaljer.meldeplikt === false ? 'Nei' : 'Meldeplikt Ukjent';
    const ikkeFullstendigData =
        detaljer.oppfolging === null ? (
            <AlertStripeAdvarsel>Kunne ikke hente ut all oppfølgings-informasjon</AlertStripeAdvarsel>
        ) : null;
    const errorLoadingData = props.isError ? (
        <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>
    ) : null;
    const descriptionListProps = {
        'Er under oppfølging': getErUnderOppfolging(detaljer.oppfolging),
        Oppfølgingsenhet: getOppfolgingEnhet(detaljer.oppfolging),
        Rettighetsgruppe: detaljer.rettighetsgruppe,
        Innsatsgruppe: detaljer.innsatsgruppe,
        Veileder: getVeileder(detaljer.oppfolging?.veileder),
        Meldeplikt: meldeplikt,
        Formidlingsgruppe: detaljer.formidlingsgruppe,
        Oppfølgingsvedtak: datoEllerNull(detaljer.vedtaksdato)
    };

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            <article>
                <Undertittel id={headerId.current}>Arbeidsoppfølging</Undertittel>
                {errorLoadingData}
                {ikkeFullstendigData}
                <DescriptionList entries={descriptionListProps} />
            </article>
        </StyledPanel>
    );
}

export default VisOppfolgingDetaljer;
