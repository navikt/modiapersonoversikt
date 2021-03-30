import useFetch, { cache, createCacheKey, FetchResult } from '@nutgaard/use-fetch';
import { apiBaseUri, includeCredentials } from '../../api/config';
import { Result } from './infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

const sammensatteSakerUrl = (fnr: string) => `${apiBaseUri}/journalforing/${fnr}/saker/`;

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
export const slettCacheForSammensatteSaker = (fnr: string) => remove(sammensatteSakerUrl(fnr));
export function useSammensatteSaker(fnr: string, lazy: boolean = false): FetchResult<Result> {
    return useFetchHook(sammensatteSakerUrl(fnr), lazy);
}
