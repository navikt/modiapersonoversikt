import { useCallback, useMemo } from 'react';
import { History } from 'history';
import { useFødselsnummer } from '../../utils/customHooks';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';

export const paths = {
    personUri: '/person',
    sakerFullscreen: `/saker`,
    saksdokumentEgetVindu: `/dokument`,
    brukerprofil: '/brukerprofil',
    basePath: '',
    standaloneKomponenter: '/components'
};

export function usePaths() {
    const fnr = useFødselsnummer();

    const getPath = useCallback(
        (tab: INFOTABS) => {
            return `${paths.personUri}/${fnr}/${tab.toLowerCase()}`;
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
            varsler: getPath(INFOTABS.VARSEL)
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
