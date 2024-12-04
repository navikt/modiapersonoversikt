/** Search middleware for @tanstack/react-router to keep a history of search params.
 *
 * E.g.
 *```
 * middleware: [keepQueryParams('myParam')]
 *````
 * This will keep the `myParam` search value in a cache and apply it whenever a the route is
 * navigated to later.
 */
export const keepQueryParams = <TSearch extends Record<string, unknown>>(searchParamsToKeep: (keyof TSearch)[]) => {
    const searchHistory: Partial<TSearch> = {};

    return ({ search, next }: { search: TSearch; next: (newSearch: TSearch) => TSearch }) => {
        const result = next(search);

        for (const param of searchParamsToKeep) {
            const newVal = result[param] ?? searchHistory[param];
            searchHistory[param] = newVal;
        }
        return {
            ...result,
            ...searchHistory
        };
    };
};
