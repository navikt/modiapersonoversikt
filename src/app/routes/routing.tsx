import { useMemo } from 'react';
import { INFOTABS, type InfotabConfig } from 'src/models/infotabs';
import { paths } from 'src/utils/paths';

/**
 * @deprecated use personPaths instead
 */
export function usePaths() {
    const getPath = (tab: InfotabConfig) => `${paths.personUri}/${tab.path}`;

    return useMemo(
        () => ({
            ...paths,
            sakerFullscreen: `${paths.basePath}/saker/`,
            oversikt: getPath(INFOTABS.OVERSIKT),
            oppfolging: getPath(INFOTABS.OPPFOLGING),
            meldinger: getPath(INFOTABS.MELDINGER),
            utbetlainger: getPath(INFOTABS.UTBETALING),
            saker: getPath(INFOTABS.SAKER),
            ytelser: getPath(INFOTABS.YTELSER),
            varsler: getPath(INFOTABS.VARSLER)
        }),
        [getPath]
    );
}

const getPath = <T extends (typeof INFOTABS)[keyof typeof INFOTABS], P extends T['path']>(tab: T) =>
    `${paths.personUri}/${tab.path}` as `${typeof paths.personUri}/${P}`;

export const personPaths = {
    ...paths,
    sakerFullscreen: `${paths.basePath}/saker/`,
    oversikt: getPath(INFOTABS.OVERSIKT),
    oppfolging: getPath(INFOTABS.OPPFOLGING),
    meldinger: getPath(INFOTABS.MELDINGER),
    utbetlainger: getPath(INFOTABS.UTBETALING),
    saker: getPath(INFOTABS.SAKER),
    ytelser: getPath(INFOTABS.YTELSER),
    varsler: getPath(INFOTABS.VARSLER)
} as const;
