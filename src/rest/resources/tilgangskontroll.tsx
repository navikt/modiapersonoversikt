import * as React from 'react';
import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import AlertStripe from 'nav-frontend-alertstriper';
import { apiBaseUri } from '../../api/config';
import { FetchResult } from '@nutgaard/use-fetch';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { BigCenteredLazySpinner } from '../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';

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

function url(fnr: string | undefined) {
    if (fnr) {
        return `${apiBaseUri}/tilgang/${fnr}`;
    }
    return `${apiBaseUri}/tilgang`;
}

function useFnrEnhet(): string | undefined {
    return useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
}

const resource = {
    useFetch(): FetchResult<TilgangDTO> {
        const fnr = useFnrEnhet();
        return useFetch(url(fnr));
    },
    useRenderer(renderer: RendererOrConfig<TilgangDTO>) {
        const fnr = useFnrEnhet();
        return useRest(url(fnr), applyDefaults(defaults, renderer));
    }
};

export default resource;
