import * as React from 'react';
import { ReactNode, useMemo } from 'react';
import { datoSynkende } from '../../../../utils/date-utils';
import { getYtelseIdDato, Ytelse } from '../../../../models/ytelse/ytelse-utils';
import { useSykepenger } from '../../../../rest/resources/sykepengerResource';
import { usePleiepenger } from '../../../../rest/resources/pleiepengerResource';
import { useForeldrepenger } from '../../../../rest/resources/foreldrepengerResource';
import { useTiltakspenger } from '../../../../rest/resources/tiltakspengerResource';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { UseQueryResult } from '@tanstack/react-query';
import { FetchError } from '../../../../api/api';
import { useFodselsnummer } from '../../../../utils/customHooks';
import { FraTilDato } from '../../../../redux/utbetalinger/types';

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

type Placeholder = { returnOnForbidden: string; returnOnError: string; returnOnNotFound: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function placeholder(resource: UseQueryResult<any, FetchError>, tekster: Placeholder) {
    if (!resource.isError) {
        return null;
    } else if (resource.error.response.status === 404) {
        return <AlertStripeAdvarsel>{tekster.returnOnNotFound}</AlertStripeAdvarsel>;
    } else if (resource.error.response.status === 403) {
        return <AlertStripeAdvarsel>{tekster.returnOnForbidden}</AlertStripeAdvarsel>;
    } else {
        return <AlertStripeAdvarsel>{tekster.returnOnError}</AlertStripeAdvarsel>;
    }
}

function useBrukersYtelser(periode: FraTilDato): Returns {
    const fnr = useFodselsnummer();
    const foreldrepengerResponse = useForeldrepenger(fnr, periode.fra, periode.til);
    const pleiepengerResponse = usePleiepenger(fnr, periode.fra, periode.til);
    const sykepengerResponse = useSykepenger(fnr, periode.fra, periode.til);
    const tiltakspengerResponse = useTiltakspenger(fnr, periode.fra, periode.til);

    return useMemo(() => {
        const pending =
            pleiepengerResponse.isLoading ||
            foreldrepengerResponse.isLoading ||
            sykepengerResponse.isLoading ||
            tiltakspengerResponse.isLoading;
        const foreldrepenger = foreldrepengerResponse.data?.foreldrepenger ?? [];
        const pleiepenger = pleiepengerResponse.data?.pleiepenger ?? [];
        const sykepenger = sykepengerResponse.data?.sykepenger ?? [];
        const tiltakspenger = tiltakspengerResponse.data ?? [];

        const ytelser = [...foreldrepenger, ...pleiepenger, ...sykepenger, ...tiltakspenger];
        const ytelserSortert = ytelser.sort(datoSynkende((ytelse: Ytelse) => getYtelseIdDato(ytelse)));

        const placeholders = [
            placeholder(foreldrepengerResponse, foreldrepengerPlaceholder),
            placeholder(pleiepengerResponse, pleiepengerPlaceholder),
            placeholder(sykepengerResponse, sykepengerPlaceholder),
            placeholder(tiltakspengerResponse, tiltakspengerPlaceholder)
        ];

        const harFeil =
            foreldrepengerResponse.isError ||
            pleiepengerResponse.isError ||
            sykepengerResponse.isError ||
            tiltakspengerResponse.isError;
        return { ytelser: ytelserSortert, pending: pending, placeholders: placeholders, harFeil: harFeil };
    }, [foreldrepengerResponse, pleiepengerResponse, sykepengerResponse, tiltakspengerResponse]);
}

export default useBrukersYtelser;
