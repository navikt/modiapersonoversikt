import * as React from 'react';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import AlertStripe from 'nav-frontend-alertstriper';
import { apiBaseUri } from '../../api/config';
import { BigCenteredLazySpinner } from '../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { useValgtenhet } from '../../context/valgtenhet-state';

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

function urlV2(enhet: string | undefined) {
    const params = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/v2/tilgang${params}`;
}

const resource = {
    useFetch(fnr: string): UseQueryResult<TilgangDTO, FetchError> {
        const enhet = useValgtenhet().enhetId;
        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(urlV2(enhet), { fnr })
        });
    },
    useRenderer(fnr: string, renderer: RendererOrConfig<TilgangDTO>) {
        const response = this.useFetch(fnr);
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
