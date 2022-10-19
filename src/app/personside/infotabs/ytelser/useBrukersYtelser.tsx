import * as React from 'react';
import { ReactNode, useMemo } from 'react';
import { datoSynkende } from '../../../../utils/date-utils';
import { getYtelseIdDato, Ytelse } from '../../../../models/ytelse/ytelse-utils';
import sykepengerResource from '../../../../rest/resources/sykepengerResource';
import pleiepengerResource from '../../../../rest/resources/pleiepengerResource';
import foreldrepengerResource from '../../../../rest/resources/foreldrepengerResource';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { UseQueryResult } from '@tanstack/react-query';
import { FetchError } from '../../../../api/api';

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

type Placeholder = { returnOnForbidden: string; returnOnError: string; returnOnNotFound: string };
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

function useBrukersYtelser(): Returns {
    const foreldrepengerResponse = foreldrepengerResource.useFetch();
    const pleiepengerResponse = pleiepengerResource.useFetch();
    const sykepengerResponse = sykepengerResource.useFetch();

    return useMemo(() => {
        const pending =
            pleiepengerResponse.isLoading || foreldrepengerResponse.isLoading || sykepengerResponse.isLoading;
        const foreldrepenger = foreldrepengerResponse.data ? foreldrepengerResponse.data.foreldrepenger || [] : [];
        const pleiepenger = pleiepengerResponse.data ? pleiepengerResponse.data.pleiepenger || [] : [];
        const sykepenger = sykepengerResponse.data ? sykepengerResponse.data.sykepenger || [] : [];

        const ytelser = [...foreldrepenger, ...pleiepenger, ...sykepenger];
        const ytelserSortert = ytelser.sort(datoSynkende((ytelse: Ytelse) => getYtelseIdDato(ytelse)));

        const placeholders = [
            placeholder(foreldrepengerResponse, foreldrepengerPlaceholder),
            placeholder(pleiepengerResponse, pleiepengerPlaceholder),
            placeholder(sykepengerResponse, sykepengerPlaceholder)
        ];

        const harFeil = foreldrepengerResponse.isError || pleiepengerResponse.isError || sykepengerResponse.isError;
        return { ytelser: ytelserSortert, pending: pending, placeholders: placeholders, harFeil: harFeil };
    }, [foreldrepengerResponse, pleiepengerResponse, sykepengerResponse]);
}

export default useBrukersYtelser;
