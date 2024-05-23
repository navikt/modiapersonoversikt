import { useMemo } from 'react';
import { InfotabConfig, INFOTABS } from '../personside/infotabs/InfoTabEnum';

export const paths = {
    personUri: '/person',
    sakerFullscreen: `/saker`,
    saksdokumentEgetVindu: `/dokument`,
    brukerprofil: '/brukerprofil',
    basePath: '',
    standaloneKomponenter: '/components',
    landingPage: '/landingpage'
};

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
