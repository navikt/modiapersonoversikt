import { useOnMount, useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { hasData, isLoading, isNotStarted } from '../../../../rest/utils/restResource';
import { default as React, ReactNode, useMemo } from 'react';
import ForeldrepengerEkspanderbartpanel, {
    getForeldepengerIdDato
} from './foreldrepenger/ForeldrepengerEkspanderbartPanel';
import PleiepengerEkspanderbartpanel, { getPleiepengerIdDato } from './pleiepenger/PleiepengerEkspanderbartPanel';
import SykepengerEkspanderbartpanel, { getSykepengerIdDatp } from './sykepenger/SykepengerEkspanderbartPanel';
import { datoSynkende } from '../../../../utils/dateUtils';

interface YtelseMedDato {
    idDato: string;
    markup: ReactNode;
}

function useBrukersYtelser() {
    const foreldrepengerResource = useRestResource(resources => resources.foreldrepenger);
    const pleiepengerResource = useRestResource(resources => resources.pleiepenger);
    const sykepengerResource = useRestResource(resources => resources.sykepenger);
    const dispatch = useDispatch();

    useOnMount(() => {
        if (isNotStarted(foreldrepengerResource)) {
            dispatch(foreldrepengerResource.actions.fetch);
        }
        if (isNotStarted(pleiepengerResource)) {
            dispatch(pleiepengerResource.actions.fetch);
        }
        if (isNotStarted(sykepengerResource)) {
            dispatch(sykepengerResource.actions.fetch);
        }
    });

    const foreldrepenger: YtelseMedDato[] = useMemo(
        () =>
            hasData(foreldrepengerResource) && foreldrepengerResource.data.foreldrepenger
                ? foreldrepengerResource.data.foreldrepenger.map(foreldrepengerettighet => {
                      const idDato = getForeldepengerIdDato(foreldrepengerettighet);
                      return {
                          idDato: idDato,
                          markup: (
                              <ForeldrepengerEkspanderbartpanel
                                  key={'foreldrepenger' + idDato}
                                  foreldrepenger={foreldrepengerettighet}
                              />
                          )
                      };
                  })
                : [],
        [foreldrepengerResource]
    );

    const pleiepenger: YtelseMedDato[] = useMemo(
        () =>
            hasData(pleiepengerResource) && pleiepengerResource.data.pleiepenger
                ? pleiepengerResource.data.pleiepenger.map(pleiepengerettighet => {
                      const idDato = getPleiepengerIdDato(pleiepengerettighet);
                      return {
                          idDato: idDato,
                          markup: (
                              <PleiepengerEkspanderbartpanel
                                  key={'pleiepenger' + idDato}
                                  pleiepenger={pleiepengerettighet}
                              />
                          )
                      };
                  })
                : [],
        [pleiepengerResource]
    );

    const sykepenger: YtelseMedDato[] = useMemo(
        () =>
            hasData(sykepengerResource) && sykepengerResource.data.sykepenger
                ? sykepengerResource.data.sykepenger.map(sykepengerettighet => {
                      const idDato = getSykepengerIdDatp(sykepengerettighet);
                      return {
                          idDato: idDato,
                          markup: (
                              <SykepengerEkspanderbartpanel
                                  key={'sykepenger' + idDato}
                                  sykepenger={sykepengerettighet}
                              />
                          )
                      };
                  })
                : [],
        [sykepengerResource]
    );

    const rettigheter = useMemo(
        () =>
            [...foreldrepenger, ...pleiepenger, ...sykepenger]
                .sort(datoSynkende(rettighet => rettighet.idDato))
                .map(rettighet => rettighet.markup),
        [foreldrepenger, pleiepenger, sykepenger]
    );

    const pending =
        isLoading(pleiepengerResource) || isLoading(foreldrepengerResource) || isLoading(sykepengerResource);

    return { rettigheter, pending };
}

export default useBrukersYtelser;
