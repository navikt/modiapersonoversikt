import AlertStripe, { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import IfFeatureToggleOn from 'src/components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
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
    const { isOn } = useFeatureToggle(FeatureToggles.VisSiste14aVedtak);
    const descriptionListProps = isOn
        ? {
              'Er under oppfølging': getErUnderOppfolging(detaljer.oppfolging),
              Oppfølgingsenhet: getOppfolgingEnhet(detaljer.oppfolging),
              Rettighetsgruppe: detaljer.rettighetsgruppe,
              Veileder: getVeileder(detaljer.oppfolging?.veileder),
              Meldeplikt: meldeplikt,
              Formidlingsgruppe: detaljer.formidlingsgruppe,
              Oppfølgingsvedtak: datoEllerNull(detaljer.vedtaksdato)
          }
        : {
              'Er under oppfølging': getErUnderOppfolging(detaljer.oppfolging),
              Oppfølgingsenhet: getOppfolgingEnhet(detaljer.oppfolging),
              Innsatsgruppe: detaljer.innsatsgruppe,
              Rettighetsgruppe: detaljer.rettighetsgruppe,
              Veileder: getVeileder(detaljer.oppfolging?.veileder),
              Meldeplikt: meldeplikt,
              Formidlingsgruppe: detaljer.formidlingsgruppe,
              Oppfølgingsvedtak: datoEllerNull(detaljer.vedtaksdato)
          };

    const siste14aVedtak = {
        'Har 14a vedtak': detaljer.siste14aVedtak ? 'Ja' : 'Nei',
        Innsatsgruppe: detaljer.siste14aVedtak?.innsatsgruppe.beskrivelse,
        Hovedmål: detaljer.siste14aVedtak?.hovedmal?.beskrivelse,
        Vedtaksdato: datoEllerNull(detaljer.siste14aVedtak?.fattetDato)
    };

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            <article>
                {errorLoadingData}
                {ikkeFullstendigData}
                <Undertittel id={headerId.current}>Arbeidsoppfølging</Undertittel>
                <DescriptionList entries={descriptionListProps} />
                <br />
                <IfFeatureToggleOn toggleID={FeatureToggles.VisSiste14aVedtak}>
                    <Undertittel id={headerId.current}>14a vedtak</Undertittel>
                    <DescriptionList entries={siste14aVedtak} />
                </IfFeatureToggleOn>
            </article>
        </StyledPanel>
    );
}

export default VisOppfolgingDetaljer;
