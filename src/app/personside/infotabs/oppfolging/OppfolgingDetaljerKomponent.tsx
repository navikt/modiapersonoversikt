import AlertStripe, { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import styled from 'styled-components';
import DescriptionList from '../../../../components/DescriptionList';
import type { DetaljertOppfolging } from '../../../../models/oppfolging';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import { datoEllerNull } from '../../../../utils/string-utils';
import { getErUnderOppfolging, getOppfolgingEnhet, getVeileder } from './oppfolging-utils';

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

    const siste14aVedtak = {
        'Har 14a vedtak': detaljer.siste14aVedtak ? 'Ja' : 'Nei',
        Innsatsgruppe: detaljer.siste14aVedtak?.innsatsgruppe.beskrivelse,
        'Hovedmål': detaljer.siste14aVedtak?.hovedmal?.beskrivelse,
        'Fattet dato': datoEllerNull(detaljer.siste14aVedtak?.fattetDato)
    };

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            <article>
                {errorLoadingData}
                {ikkeFullstendigData}
                <Undertittel id={headerId.current}>Arbeidsoppfølging</Undertittel>
                <DescriptionList entries={descriptionListProps} />
                <br/>
                <Undertittel id={headerId.current}>14a vedtak</Undertittel>
                <DescriptionList entries={siste14aVedtak} />
            </article>
        </StyledPanel>
    );
}

export default VisOppfolgingDetaljer;
