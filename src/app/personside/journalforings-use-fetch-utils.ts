import useFetch, { cache, createCacheKey, FetchResult } from '@nutgaard/use-fetch';
import { apiBaseUri, includeCredentials } from '../../api/config';
import { JournalforingsSak } from './infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

const sammensatteSakerUrl = (fnr: string) => `${apiBaseUri}/journalforing/${fnr}/saker/sammensatte`;
const pensjonSakerUrl = (fnr: string) => `${apiBaseUri}/journalforing/${fnr}/saker/pensjon`;

function prefetch(url: string) {
    const cachekey = createCacheKey(url, includeCredentials);
    cache.fetch(cachekey, url, includeCredentials);
}

function remove(url: string) {
    const cachekey = createCacheKey(url, includeCredentials);
    cache.remove(cachekey);
}

function useFetchHook<TYPE>(url: string, lazy: boolean = false): FetchResult<TYPE> {
    return useFetch<TYPE>(url, includeCredentials, { lazy, cacheKey: createCacheKey(url, includeCredentials) });
}

export const prefetchSammensatteSaker = (fnr: string) => prefetch(sammensatteSakerUrl(fnr));
export const prefetchPensjonsaker = (fnr: string) => prefetch(pensjonSakerUrl(fnr));
export const slettCacheForSammensatteSaker = (fnr: string) => remove(sammensatteSakerUrl(fnr));
export const slettCacheForPensjonSaker = (fnr: string) => remove(pensjonSakerUrl(fnr));
export function useSammensatteSaker(fnr: string, lazy: boolean = false): FetchResult<Array<JournalforingsSak>> {
    return useFetchHook(sammensatteSakerUrl(fnr), lazy);
}
export function usePensjonSaker(fnr: string, lazy: boolean = false): FetchResult<Array<JournalforingsSak>> {
    return useFetchHook(pensjonSakerUrl(fnr), lazy);
}
