import type { UseQueryResult } from '@tanstack/react-query';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { type ReactNode, useMemo } from 'react';
import type { FetchError } from 'src/api/api';
import { usePersonAtomValue } from 'src/lib/state/context';
import { type Ytelse, getYtelseIdDato } from 'src/models/ytelse/ytelse-utils';
import type { FraTilDato } from 'src/redux/utbetalinger/types';
import { useArbeidsavklaringspenger } from 'src/rest/resources/arbeidsavklaringspengerResource';
import { useForeldrepengerFpSak } from 'src/rest/resources/foreldrepengerFpSakResource';
import { useForeldrepenger } from 'src/rest/resources/foreldrepengerResource';
import { usePensjon } from 'src/rest/resources/pensjonResource';
import { usePleiepenger } from 'src/rest/resources/pleiepengerResource';
import { useSykepenger } from 'src/rest/resources/sykepengerResource';
import { useTiltakspenger } from 'src/rest/resources/tiltakspengerResource';
import { datoSynkende } from 'src/utils/date-utils';

interface Returns {
    ytelser: Ytelse[];
    pending: boolean;
    placeholders: ReactNode[];
    harFeil: boolean;
}
const foreldrepengerPlaceholder = {
    returnOnError: 'Kunne ikke laste foreldrepenger',
    returnOnNotFound: 'Kunne finne foreldrepenger',
    returnOnForbidden: 'Du har ikke tilgang til foreldrepenger'
};
const pleiepengerPlaceholder = {
    returnOnError: 'Kunne ikke laste pleiepenger',
    returnOnNotFound: 'Kunne finne pleiepenger',
    returnOnForbidden: 'Du har ikke tilgang til pleiepenger'
};
const sykepengerPlaceholder = {
    returnOnError: 'Kunne ikke laste sykepenger',
    returnOnNotFound: 'Kunne finne sykepenger',
    returnOnForbidden: 'Du har ikke tilgang til sykepenger'
};
const tiltakspengerPlaceholder = {
    returnOnError: 'Kunne ikke laste tiltakspenger',
    returnOnNotFound: 'Kunne finne tiltakspenger',
    returnOnForbidden: 'Du har ikke tilgang til tiltakspenger'
};
const pensjonPlaceholder = {
    returnOnError: 'Kunne ikke laste pensjon',
    returnOnNotFound: 'Kunne finne pensjon',
    returnOnForbidden: 'Du har ikke tilgang til pensjon'
};
const arbeidsavklaringsPengerPlaceholder = {
    returnOnError: 'Kunne ikke laste arbeidsavklaringspenger',
    returnOnNotFound: 'Kunne finne arbeidsavklaringspenger',
    returnOnForbidden: 'Du har ikke tilgang til arbeidsavklaringspenger'
};

const foreldrepegerFpSakPlaceholder = {
    returnOnError: 'Kunne ikke laste foreldrepenger',
    returnOnNotFound: 'Kunne finne foreldrepenger',
    returnOnForbidden: 'Du har ikke tilgang til foreldrepenger'
};

type Placeholder = { returnOnForbidden: string; returnOnError: string; returnOnNotFound: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
//biome-ignore lint/suspicious/noExplicitAny: biome migration
function placeholder(resource: UseQueryResult<any, FetchError>, tekster: Placeholder) {
    if (!resource.isError) {
        return null;
    }
    if (resource.error.response.status === 404) {
        return <AlertStripeAdvarsel>{tekster.returnOnNotFound}</AlertStripeAdvarsel>;
    }
    if (resource.error.response.status === 403) {
        return <AlertStripeAdvarsel>{tekster.returnOnForbidden}</AlertStripeAdvarsel>;
    }
    return <AlertStripeAdvarsel>{tekster.returnOnError}</AlertStripeAdvarsel>;
}

function useBrukersYtelser(periode: FraTilDato): Returns {
    const fnr = usePersonAtomValue();
    const foreldrepengerResponse = useForeldrepenger(fnr, periode.fra, periode.til);
    const pleiepengerResponse = usePleiepenger(fnr, periode.fra, periode.til);
    const sykepengerResponse = useSykepenger(fnr, periode.fra, periode.til);
    const tiltakspengerResponse = useTiltakspenger(fnr, periode.fra, periode.til);
    const pensjonResponse = usePensjon(fnr, periode.fra, periode.til);
    const arbeidsavklaringspengerResponse = useArbeidsavklaringspenger(fnr, periode.fra, periode.til);
    const foreldrepengerFpSakResponse = useForeldrepengerFpSak(fnr, periode.fra, periode.til);

    return useMemo(() => {
        const pending =
            pleiepengerResponse.isLoading ||
            foreldrepengerResponse.isLoading ||
            sykepengerResponse.isLoading ||
            tiltakspengerResponse.isLoading ||
            pensjonResponse.isLoading ||
            arbeidsavklaringspengerResponse.isLoading ||
            foreldrepengerFpSakResponse.isLoading;
        const foreldrepenger = foreldrepengerResponse.data?.foreldrepenger ?? [];
        const pleiepenger = pleiepengerResponse.data?.pleiepenger ?? [];
        const sykepenger = sykepengerResponse.data?.sykepenger ?? [];
        const tiltakspenger = tiltakspengerResponse.data ?? [];
        const pensjon = pensjonResponse.data ?? [];
        const arbeidsavklaringspenger = arbeidsavklaringspengerResponse.data ?? [];
        const foreldrePengerFpSak = foreldrepengerFpSakResponse.data ?? [];

        const ytelser = [
            ...foreldrepenger,
            ...pleiepenger,
            ...sykepenger,
            ...tiltakspenger,
            ...pensjon,
            ...arbeidsavklaringspenger,
            ...foreldrePengerFpSak
        ];
        const ytelserSortert = ytelser.sort(datoSynkende((ytelse: Ytelse) => getYtelseIdDato(ytelse)));

        const placeholders = [
            placeholder(foreldrepengerResponse, foreldrepengerPlaceholder),
            placeholder(pleiepengerResponse, pleiepengerPlaceholder),
            placeholder(sykepengerResponse, sykepengerPlaceholder),
            placeholder(tiltakspengerResponse, tiltakspengerPlaceholder),
            placeholder(pensjonResponse, pensjonPlaceholder),
            placeholder(arbeidsavklaringspengerResponse, arbeidsavklaringsPengerPlaceholder),
            placeholder(foreldrepengerFpSakResponse, foreldrepegerFpSakPlaceholder)
        ];

        const harFeil =
            foreldrepengerResponse.isError ||
            pleiepengerResponse.isError ||
            sykepengerResponse.isError ||
            tiltakspengerResponse.isError ||
            pensjonResponse.isError ||
            arbeidsavklaringspengerResponse.isError ||
            foreldrepengerFpSakResponse.isError;
        return { ytelser: ytelserSortert, pending: pending, placeholders: placeholders, harFeil: harFeil };
    }, [
        foreldrepengerResponse,
        pleiepengerResponse,
        sykepengerResponse,
        tiltakspengerResponse,
        pensjonResponse,
        arbeidsavklaringspengerResponse,
        foreldrepengerFpSakResponse
    ]);
}

export default useBrukersYtelser;
