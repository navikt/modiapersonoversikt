import * as React from 'react';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import AlertStripe from 'nav-frontend-alertstriper';
import { apiBaseUri } from '../../api/config';
import { BigCenteredLazySpinner } from '../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get, post } from '../../api/api';
import { useValgtenhet } from '../../context/valgtenhet-state';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

const defaults: DefaultConfig = {
    ifPending: BigCenteredLazySpinner,
    ifError: (
        <FillCenterAndFadeIn>
            <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved sjekking av tilgang til bruker.</AlertStripe>
        </FillCenterAndFadeIn>
    )
};

export type TilgangDTO = HarTilgang | HarIkkeTilgang;

export interface HarTilgang {
    harTilgang: true;
    aktivIdent?: string;
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
function url(fnr: string | undefined, enhet: string | undefined) {
    const params = enhet ? `?enhet=${enhet}` : '';
    if (fnr) {
        return `${apiBaseUri}/tilgang/${fnr}${params}`;
    }
    return `${apiBaseUri}/tilgang${params}`;
}

function urlV2(enhet: string | undefined) {
    const params = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/tilgang${params}`;
}

const resource = {
    useFetch(): UseQueryResult<TilgangDTO, FetchError> {
        const fnr = useGjeldendeBruker();
        const enhet = useValgtenhet().enhetId;
        const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);
        return useQuery(queryKey(fnr), () => (isOn ? post(urlV2(enhet), fnr) : get(url(fnr, enhet))));
    },
    useRenderer(renderer: RendererOrConfig<TilgangDTO>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
