import * as React from 'react';
import { ReactNode, useMemo } from 'react';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { datoSynkende } from '../../../../utils/date-utils';
import { getYtelseIdDato, Ytelse } from '../../../../models/ytelse/ytelse-utils';
import sykepengerFetcher from '../../../../rest/resources/sykepenger';
import pleiepengerFetcher from '../../../../rest/resources/pleiepenger';
import { hasData, isPending, hasError, FetchResult } from '@nutgaard/use-fetch';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

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
function placeholder(resource: FetchResult<any>, tekster: Placeholder) {
    if (resource.statusCode === 404) {
        return <AlertStripeAdvarsel>{tekster.returnOnNotFound}</AlertStripeAdvarsel>;
    } else if (resource.statusCode === 403) {
        return <AlertStripeAdvarsel>{tekster.returnOnForbidden}</AlertStripeAdvarsel>;
    } else if (hasError(resource)) {
        return <AlertStripeAdvarsel>{tekster.returnOnError}</AlertStripeAdvarsel>;
    } else {
        return null;
    }
}

function useBrukersYtelser(): Returns {
    const foreldrepengerResource = useRestResource(
        (resources) => resources.foreldrepenger,
        foreldrepengerPlaceholder,
        true
    );
    const pleiepengerResource = pleiepengerFetcher.useFetch();
    const sykepengerResource = sykepengerFetcher.useFetch();

    return useMemo(() => {
        const pending =
            isPending(pleiepengerResource) || foreldrepengerResource.isLoading || isPending(sykepengerResource);
        const foreldrepenger = foreldrepengerResource.data?.foreldrepenger || [];
        const pleiepenger = hasData(pleiepengerResource) ? pleiepengerResource.data.pleiepenger || [] : [];
        const sykepenger = hasData(sykepengerResource) ? sykepengerResource.data.sykepenger || [] : [];

        const ytelser = [...foreldrepenger, ...pleiepenger, ...sykepenger];
        const ytelserSortert = ytelser.sort(datoSynkende((ytelse: Ytelse) => getYtelseIdDato(ytelse)));
        const placeholders = [
            foreldrepengerResource.placeholder,
            placeholder(pleiepengerResource, pleiepengerPlaceholder),
            placeholder(sykepengerResource, sykepengerPlaceholder)
        ];

        const harFeil =
            foreldrepengerResource.hasError || hasError(pleiepengerResource) || hasError(sykepengerResource);
        return { ytelser: ytelserSortert, pending: pending, placeholders: placeholders, harFeil: harFeil };
    }, [foreldrepengerResource, pleiepengerResource, sykepengerResource]);
}

export default useBrukersYtelser;
