import { useCallback, useMemo } from 'react';
import { History } from 'history';
import { useFodselsnummer } from '../../utils/customHooks';
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
    const fnr = useFodselsnummer();

    const getPath = useCallback(
        (tab: InfotabConfig) => {
            return `${paths.personUri}/${fnr}/${tab.path}`;
        },
        [fnr]
    );

    return useMemo(
        () => ({
            ...paths,
            sakerFullscreen: `${paths.basePath}/saker/${fnr}`,
            oversikt: getPath(INFOTABS.OVERSIKT),
            oppfolging: getPath(INFOTABS.OPPFOLGING),
            meldinger: getPath(INFOTABS.MELDINGER),
            utbetlainger: getPath(INFOTABS.UTBETALING),
            saker: getPath(INFOTABS.SAKER),
            ytelser: getPath(INFOTABS.YTELSER),
            varsler: getPath(INFOTABS.VARSLER)
        }),
        [getPath, fnr]
    );
}

export function setNyBrukerIPath(history: History, fødselsnummer: string) {
    history.push(`${paths.personUri}/${fødselsnummer}`);
}

export function fjernBrukerFraPath(history: History) {
    history.push(`${paths.basePath}`);
}
