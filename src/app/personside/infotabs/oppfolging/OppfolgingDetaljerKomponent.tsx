import AlertStripe, { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import Siste14aVedtakDetaljer from 'src/app/personside/infotabs/oppfolging/Gjeldende14aVedtakDetaljer';
import type { DetaljertOppfolging } from 'src/models/oppfolging';
import { pxToRem } from 'src/styles/personOversiktTheme';
import { datoEllerNull } from 'src/utils/string-utils';
import styled from 'styled-components';
import DescriptionList from '../../../../components/DescriptionList';
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
        Veileder: getVeileder(detaljer.oppfolging?.veileder),
        Meldeplikt: meldeplikt,
        Formidlingsgruppe: detaljer.formidlingsgruppe,
        Oppfølgingsvedtak: datoEllerNull(detaljer.vedtaksdato)
    };

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            <article>
                {errorLoadingData}
                {ikkeFullstendigData}
                <Undertittel id={headerId.current}>Arbeidsoppfølging</Undertittel>
                <DescriptionList entries={descriptionListProps} />
                <br />
                <Siste14aVedtakDetaljer />
            </article>
        </StyledPanel>
    );
}

export default VisOppfolgingDetaljer;
