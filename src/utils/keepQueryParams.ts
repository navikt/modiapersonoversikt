import { getDefaultStore } from 'jotai';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { router } from 'src/main';

/** Search middleware for @tanstack/react-router to keep a history of search params.
 *
 * E.g.
 *```
 * middleware: [keepQueryParams('myParam')]
 *````
 * This will keep the `myParam` search value in a cache and apply it whenever the route is
 * navigated to later.
 *
 * The middleware automatically clears the cache when the active user changes.
 * One can also manually clear the cache by calling the `clear` method on the middleware
 *
 */

export const keepQueryParams = <TSearch extends Record<string, unknown>>(searchParamsToKeep: (keyof TSearch)[]) => {
    const searchHistory: Partial<TSearch> = {};

    const store = getDefaultStore();

    const user = {
        previousUser: store.get(aktivBrukerAtom),
        hasBeenInitialized: false
    };

    const clearCacheAndUrlParams = () => {
        // Fjern søkeverdi cache
        for (const key of Object.keys(searchHistory)) {
            delete searchHistory[key as keyof TSearch];
        }
        // Fjern URL params
        router.navigate({
            to: router.state.location.pathname,
            search: (prev) => {
                const filtered = Object.fromEntries(
                    Object.entries(prev).filter(([key]) => !(searchParamsToKeep as string[]).includes(key))
                );
                return filtered as TSearch;
            },
            // Sørger for at state beholdes ved navigasjon. F.eks umami-event
            state: router?.state?.location?.state
        });
    };

    // Lytt til endringer på aktiv bruker
    store.sub(aktivBrukerAtom, () => {
        const currentUser = store.get(aktivBrukerAtom);
        if (!user.hasBeenInitialized) {
            user.hasBeenInitialized = true;
            user.previousUser = currentUser;
            return;
        }

        if (currentUser !== user.previousUser && currentUser !== undefined) {
            clearCacheAndUrlParams();
        }

        user.previousUser = currentUser;
    });

    const middleware = ({ search, next }: { search: TSearch; next: (newSearch: TSearch) => TSearch }) => {
        const result = next(search);

        for (const param of searchParamsToKeep) {
            const newVal = result?.[param] ?? searchHistory[param];
            searchHistory[param] = newVal;
        }

        return {
            ...result,
            ...searchHistory
        };
    };

    middleware.clear = clearCacheAndUrlParams;
    return middleware;
};
