import { ReactNode, useMemo } from 'react';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { datoSynkende } from '../../../../utils/date-utils';
import { getYtelseIdDato, Ytelse } from '../../../../models/ytelse/ytelse-utils';

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

function useBrukersYtelser(): Returns {
    const foreldrepengerResource = useRestResource(
        resources => resources.foreldrepenger,
        foreldrepengerPlaceholder,
        true
    );
    const pleiepengerResource = useRestResource(resources => resources.pleiepenger, pleiepengerPlaceholder, true);
    const sykepengerResource = useRestResource(resources => resources.sykepenger, sykepengerPlaceholder, true);

    return useMemo(() => {
        const pending =
            pleiepengerResource.isLoading || foreldrepengerResource.isLoading || sykepengerResource.isLoading;
        const foreldrepenger = foreldrepengerResource.data?.foreldrepenger || [];
        const pleiepenger = pleiepengerResource.data?.pleiepenger || [];
        const sykepenger = sykepengerResource.data?.sykepenger || [];

        const ytelser = [...foreldrepenger, ...pleiepenger, ...sykepenger];
        const ytelserSortert = ytelser.sort(datoSynkende(rettighet => getYtelseIdDato(rettighet)));
        const placeholders = [
            foreldrepengerResource.placeholder,
            pleiepengerResource.placeholder,
            sykepengerResource.placeholder
        ];

        const harFeil = foreldrepengerResource.hasError || pleiepengerResource.hasError || sykepengerResource.hasError;
        return { ytelser: ytelserSortert, pending: pending, placeholders: placeholders, harFeil: harFeil };
    }, [foreldrepengerResource, pleiepengerResource, sykepengerResource]);
}

export default useBrukersYtelser;
