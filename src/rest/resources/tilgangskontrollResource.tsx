import * as React from 'react';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import AlertStripe from 'nav-frontend-alertstriper';
import { apiBaseUri } from '../../api/config';
import { BigCenteredLazySpinner } from '../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

const defaults: DefaultConfig = {
    ifPending: BigCenteredLazySpinner,
    ifError: (
        <FillCenterAndFadeIn>
            <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved sjekking av tilgang til bruker.</AlertStripe>
        </FillCenterAndFadeIn>
    )
};

export type TilgangDTO = HarTilgang | HarIkkeTilgang;

interface HarTilgang {
    harTilgang: true;
}

export interface HarIkkeTilgang {
    harTilgang: false;
    ikkeTilgangArsak: IkkeTilgangArsak;
}

export enum IkkeTilgangArsak {
    Kode6 = 'FP1_KODE6',
    Kode7 = 'FP2_KODE7',
    EgenAnsatt = 'FP3_EGEN_ANSATT',
    Geografi = 'FP4_GEOGRAFISK',
    AdRoller = 'AD_ROLLE',
    Ukjent = 'UNKNOWN'
}
function queryKey(fnr: string | undefined) {
    return ['tilgangskontroll', fnr];
}
function url(fnr: string | undefined) {
    if (fnr) {
        return `${apiBaseUri}/tilgang/${fnr}`;
    }
    return `${apiBaseUri}/tilgang`;
}

const resource = {
    useFetch(): UseQueryResult<TilgangDTO, FetchError> {
        const fnr = useGjeldendeBruker();
        return useQuery(queryKey(fnr), () => get(url(fnr)));
    },
    useRenderer(renderer: RendererOrConfig<TilgangDTO>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
