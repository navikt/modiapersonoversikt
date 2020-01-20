import * as React from 'react';
import { ReactNode, useMemo } from 'react';
import { datoSynkende } from '../../../../utils/dateUtils';
import { getPleiepengerIdDato, Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import { getSykepengerIdDato, Sykepenger } from '../../../../models/ytelse/sykepenger';
import { Foreldrepengerettighet, getForeldepengerIdDato } from '../../../../models/ytelse/foreldrepenger';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { useRestResource } from '../../../../rest/consumer/useRestResource';

interface YtelseMedDato {
    idDato: string;
    markup: ReactNode;
}

interface Props {
    renderPleiepenger: (pleiepenger: Pleiepengerettighet) => ReactNode;
    renderSykepenger: (sykepenger: Sykepenger) => ReactNode;
    renderForeldrepenger: (foreldrepenger: Foreldrepengerettighet) => ReactNode;
}

interface Returns {
    ytelser: ReactNode[];
    pending: boolean;
    feilmeldinger: ReactNode[];
}

function useBrukersYtelserMarkup(props: Props): Returns {
    const foreldrepengerResource = useRestResource(resources => resources.foreldrepenger, undefined, true);
    const pleiepengerResource = useRestResource(resources => resources.pleiepenger, undefined, true);
    const sykepengerResource = useRestResource(resources => resources.sykepenger, undefined, true);

    const foreldrepenger: YtelseMedDato[] = useMemo(
        () =>
            foreldrepengerResource.data && foreldrepengerResource.data.foreldrepenger
                ? foreldrepengerResource.data.foreldrepenger.map(foreldrepengerettighet => {
                      const idDato = getForeldepengerIdDato(foreldrepengerettighet);
                      return {
                          idDato: idDato,
                          markup: props.renderForeldrepenger(foreldrepengerettighet)
                      };
                  })
                : [],
        [foreldrepengerResource, props]
    );

    const pleiepenger: YtelseMedDato[] = useMemo(
        () =>
            pleiepengerResource.data && pleiepengerResource.data.pleiepenger
                ? pleiepengerResource.data.pleiepenger.map(pleiepengerettighet => {
                      const idDato = getPleiepengerIdDato(pleiepengerettighet);
                      return {
                          idDato: idDato,
                          markup: props.renderPleiepenger(pleiepengerettighet)
                      };
                  })
                : [],
        [pleiepengerResource, props]
    );

    const sykepenger: YtelseMedDato[] = useMemo(
        () =>
            sykepengerResource.data && sykepengerResource.data.sykepenger
                ? sykepengerResource.data.sykepenger.map(sykepengerettighet => {
                      const idDato = getSykepengerIdDato(sykepengerettighet);
                      return {
                          idDato: idDato,
                          markup: props.renderSykepenger(sykepengerettighet)
                      };
                  })
                : [],
        [sykepengerResource, props]
    );

    const ytelser = useMemo(
        () =>
            [...foreldrepenger, ...pleiepenger, ...sykepenger]
                .sort(datoSynkende(rettighet => rettighet.idDato))
                .map(rettighet => rettighet.markup),
        [foreldrepenger, pleiepenger, sykepenger]
    );

    const feilmeldinger = [
        foreldrepengerResource.isFailed && (
            <AlertStripeAdvarsel key="foreldrepenger-failed">Kunne ikke laste foreldrepenger</AlertStripeAdvarsel>
        ),
        pleiepengerResource.isFailed && (
            <AlertStripeAdvarsel key="pleiepenger-failed">Kunne ikke laste pleiepenger</AlertStripeAdvarsel>
        ),
        sykepengerResource.isFailed && (
            <AlertStripeAdvarsel key="sykepenger-failed">Kunne ikke laste sykepenger</AlertStripeAdvarsel>
        )
    ].filter(feilmelding => feilmelding);

    const pending = pleiepengerResource.isLoading || foreldrepengerResource.isLoading || sykepengerResource.isLoading;

    return { ytelser, pending, feilmeldinger };
}

export default useBrukersYtelserMarkup;
