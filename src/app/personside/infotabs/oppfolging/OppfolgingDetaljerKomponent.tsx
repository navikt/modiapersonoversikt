import { Detail } from '@navikt/ds-react';
import AlertStripe, { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import Siste14aVedtakDetaljer from 'src/app/personside/infotabs/oppfolging/Gjeldende14aVedtakDetaljer';
import LazySpinner from 'src/components/LazySpinner';
import type {
    AggregertPeriodeArbeidssoekerregisteretDto,
    ArbeidsOppfolgingDto
} from 'src/generated/modiapersonoversikt-api';
import { useArbeidsoppfolging, useOppslagArbeidssoekerregisteret } from 'src/lib/clients/modiapersonoversikt-api';
import { pxToRem } from 'src/styles/personOversiktTheme';
import { formatterDato } from 'src/utils/date-utils';
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
    detaljertOppfolging?: ArbeidsOppfolgingDto;
    oppslagArbeidssoekerRegisteret?: AggregertPeriodeArbeidssoekerregisteretDto;
    isErrorOppfolging?: boolean;
    isErrorArbeidssoekerRegisteret?: boolean;
}

function VisOppfolgingDetaljer(props: Props) {
    const { isLoading } = useArbeidsoppfolging();
    const { isLoading: isLoadingArbeidssoekerRegisteret } = useOppslagArbeidssoekerregisteret();

    const headerId = useRef(guid());
    const detaljer = props.detaljertOppfolging;
    const oppslagArbeidssoekerRegisteret = props.oppslagArbeidssoekerRegisteret;

    const ikkeFullstendigData =
        detaljer?.oppfolging == null ? (
            <AlertStripeAdvarsel>Kunne ikke hente ut all oppfølgings-informasjon</AlertStripeAdvarsel>
        ) : null;
    const errorLoadingData = props.isErrorOppfolging ? (
        <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>
    ) : null;

    const errorLoadingDataArbeidssoekerRegisteret = props.isErrorArbeidssoekerRegisteret ? (
        <AlertStripe type="advarsel">Kunne ikke laste inn informasjon fra arbeidssøkerregisteret</AlertStripe>
    ) : null;

    const erRegistrertSomArbeidssoker = oppslagArbeidssoekerRegisteret && !oppslagArbeidssoekerRegisteret.avsluttet;
    const arbeidssoekerregisteretOpplysinger = oppslagArbeidssoekerRegisteret?.opplysning;

    const descriptionListProps = {
        'Er under arbeidsrettet oppfølging': getErUnderOppfolging(detaljer?.oppfolging),
        Oppfølgingsenhet: getOppfolgingEnhet(detaljer?.oppfolging),
        Veileder: getVeileder(detaljer?.oppfolging?.veileder),
        ...(!errorLoadingDataArbeidssoekerRegisteret
            ? {
                  Arbeidssøkerstatus: (
                      <>
                          {erRegistrertSomArbeidssoker
                              ? 'Er registrert som arbeidssøker'
                              : 'Er ikke registrert som arbeidssøker'}
                          {arbeidssoekerregisteretOpplysinger && (
                              <Detail>
                                  Dato:{' '}
                                  {arbeidssoekerregisteretOpplysinger?.tidspunkt
                                      ? formatterDato(arbeidssoekerregisteretOpplysinger.tidspunkt)
                                      : 'Ikke angitt'}
                              </Detail>
                          )}{' '}
                      </>
                  )
              }
            : {})
    };

    return (
        <StyledPanel aria-labelledby={headerId.current}>
            {isLoading || isLoadingArbeidssoekerRegisteret ? (
                <LazySpinner type="L" />
            ) : (
                <article>
                    {errorLoadingData}
                    {errorLoadingDataArbeidssoekerRegisteret}
                    {ikkeFullstendigData}
                    <Undertittel id={headerId.current}>Arbeidsoppfølging</Undertittel>
                    <DescriptionList entries={descriptionListProps} />
                    <br />
                    <Siste14aVedtakDetaljer />
                </article>
            )}
        </StyledPanel>
    );
}

export default VisOppfolgingDetaljer;
