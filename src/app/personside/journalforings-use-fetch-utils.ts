import useFetch, { cache, createCacheKey, FetchResult } from '@nutgaard/use-fetch';
import { apiBaseUri, includeCredentials } from '../../api/config';
import { Result } from './infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

const sakerUrl = (fnr: string) => `${apiBaseUri}/journalforing/${fnr}/saker/`;

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

export const prefetchSaker = (fnr: string) => prefetch(sakerUrl(fnr));
export const slettCacheForSaker = (fnr: string) => remove(sakerUrl(fnr));
export function useSaker(fnr: string, lazy: boolean = false): FetchResult<Result> {
    return useFetchHook(sakerUrl(fnr), lazy);
}
