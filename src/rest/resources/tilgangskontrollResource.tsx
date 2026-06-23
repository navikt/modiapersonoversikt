import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import AlertStripe from 'nav-frontend-alertstriper';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { BigCenteredLazySpinner } from '../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import { useValgtenhet } from '../../context/valgtenhet-state';
import { applyDefaults, type DefaultConfig, type RendererOrConfig, useRest } from '../useRest';

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

interface HarIkkeTilgang {
    harTilgang: false;
    message?: string;
}

function queryKey(fnr: string | undefined) {
    return ['tilgangskontroll', fnr];
}

function url(enhet: string | undefined) {
    const params = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/tilgang${params}`;
}

const resource = {
    useFetch(fnr: string): UseQueryResult<TilgangDTO, FetchError> {
        const enhet = useValgtenhet().enhetId;
        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(url(enhet), { fnr })
        });
    },
    useRenderer(fnr: string, renderer: RendererOrConfig<TilgangDTO>) {
        const response = this.useFetch(fnr);
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
