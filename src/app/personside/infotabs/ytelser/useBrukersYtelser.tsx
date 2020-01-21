import { ReactNode, useMemo } from 'react';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { datoSynkende } from '../../../../utils/dateUtils';
import { getYtelseIdDato, Ytelse } from '../../../../models/ytelse/ytelse-utils';

interface Returns {
    ytelser: Ytelse[];
    pending: boolean;
    feilmeldinger: ReactNode[];
}

function useBrukersYtelser(): Returns {
    const foreldrepengerResource = useRestResource(
        resources => resources.foreldrepenger,
        { returnOnError: 'Kunne ikke laste foreldrepenger' },
        true
    );
    const pleiepengerResource = useRestResource(
        resources => resources.pleiepenger,
        { returnOnError: 'Kunne ikke laste pleiepenger' },
        true
    );
    const sykepengerResource = useRestResource(
        resources => resources.sykepenger,
        { returnOnError: 'Kunne ikke laste sykepenger' },
        true
    );

    const pending = pleiepengerResource.isLoading || foreldrepengerResource.isLoading || sykepengerResource.isLoading;

    const foreldrepenger = foreldrepengerResource.data?.foreldrepenger || [];
    const pleiepenger = pleiepengerResource.data?.pleiepenger || [];
    const sykepenger = sykepengerResource.data?.sykepenger || [];
    const ytelser = [...foreldrepenger, ...pleiepenger, ...sykepenger];

    const ytelserSortert = ytelser.sort(datoSynkende(rettighet => getYtelseIdDato(rettighet)));

    const feilmeldinger = [
        foreldrepengerResource.placeholder,
        pleiepengerResource.placeholder,
        sykepengerResource.placeholder
    ].filter(it => it);

    return useMemo(() => ({ ytelser: ytelserSortert, pending: pending, feilmeldinger: feilmeldinger }), [
        ytelserSortert,
        pending,
        feilmeldinger
    ]);
}

export default useBrukersYtelser;
