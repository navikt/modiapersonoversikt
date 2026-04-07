import type { UseQueryResult } from '@tanstack/react-query';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { type ReactNode, useMemo } from 'react';
import type { FetchError } from 'src/api/api';
import { usePersonAtomValue } from 'src/lib/state/context';
import { getYtelseIdDato, type Ytelse } from 'src/models/ytelse/ytelse-utils';
import type { FraTilDato } from 'src/redux/utbetalinger/types';
import { useArbeidsavklaringspenger } from 'src/rest/resources/arbeidsavklaringspengerResource';
import { useForeldrepenger } from 'src/rest/resources/foreldrepengerResource';
import { usePensjon } from 'src/rest/resources/pensjonResource';
import { useSykepenger } from 'src/rest/resources/sykepengerResource';
import { useSykepengerSpokelse } from 'src/rest/resources/sykepengerSpokelseResource';
import { useTiltakspenger } from 'src/rest/resources/tiltakspengerResource';
import { datoSynkende } from 'src/utils/date-utils';

interface Returns {
    ytelser: Ytelse[];
    pending: boolean;
    placeholders: ReactNode[];
    harFeil: boolean;
}

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

const foreldrepegerPlaceholder = {
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
    const sykepengerResponse = useSykepenger(fnr, periode.fra, periode.til);
    const sykepengerSpokelseResponse = useSykepengerSpokelse(fnr, periode.fra, periode.til);
    const tiltakspengerResponse = useTiltakspenger(fnr, periode.fra, periode.til);
    const pensjonResponse = usePensjon(fnr, periode.fra, periode.til);
    const arbeidsavklaringspengerResponse = useArbeidsavklaringspenger(fnr, periode.fra, periode.til);
    const foreldrepengerResponse = useForeldrepenger(fnr, periode.fra, periode.til);

    return useMemo(() => {
        const pending =
            sykepengerResponse.isLoading ||
            sykepengerSpokelseResponse.isLoading ||
            tiltakspengerResponse.isLoading ||
            pensjonResponse.isLoading ||
            arbeidsavklaringspengerResponse.isLoading ||
            foreldrepengerResponse.isLoading;

        const sykepenger = sykepengerResponse.data?.sykepenger ?? [];
        const tiltakspenger = tiltakspengerResponse.data ?? [];
        const pensjon = pensjonResponse.data ?? [];
        const arbeidsavklaringspenger = arbeidsavklaringspengerResponse.data ?? [];
        const foreldrePenger = foreldrepengerResponse.data ?? [];
        const sykepengerSpokelse =
            sykepengerSpokelseResponse.data && sykepengerSpokelseResponse.data.utbetaltePerioder.length > 0
                ? [sykepengerSpokelseResponse.data]
                : [];

        const ytelser = [
            ...sykepenger,
            ...sykepengerSpokelse,
            ...tiltakspenger,
            ...pensjon,
            ...arbeidsavklaringspenger,
            ...foreldrePenger
        ];
        const ytelserSortert = ytelser.sort(datoSynkende((ytelse: Ytelse) => getYtelseIdDato(ytelse)));

        const placeholders = [
            placeholder(sykepengerResponse, sykepengerPlaceholder),
            placeholder(sykepengerSpokelseResponse, sykepengerPlaceholder),
            placeholder(tiltakspengerResponse, tiltakspengerPlaceholder),
            placeholder(pensjonResponse, pensjonPlaceholder),
            placeholder(arbeidsavklaringspengerResponse, arbeidsavklaringsPengerPlaceholder),
            placeholder(foreldrepengerResponse, foreldrepegerPlaceholder)
        ];

        const harFeil =
            sykepengerResponse.isError ||
            sykepengerSpokelseResponse.isError ||
            tiltakspengerResponse.isError ||
            pensjonResponse.isError ||
            arbeidsavklaringspengerResponse.isError ||
            foreldrepengerResponse.isError;
        return { ytelser: ytelserSortert, pending: pending, placeholders: placeholders, harFeil: harFeil };
    }, [
        sykepengerResponse,
        sykepengerSpokelseResponse,
        tiltakspengerResponse,
        pensjonResponse,
        arbeidsavklaringspengerResponse,
        foreldrepengerResponse
    ]);
}

export default useBrukersYtelser;
