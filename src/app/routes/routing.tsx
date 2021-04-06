import { useCallback, useMemo } from 'react';
import { History } from 'history';
import { useFodselsnummer } from '../../utils/customHooks';
import { INFOTABS, InfotabsType } from '../personside/infotabs/InfoTabEnum';

export const paths = {
    personUri: '/person',
    sakerFullscreen: `/saker`,
    saksdokumentEgetVindu: `/dokument`,
    brukerprofil: '/brukerprofil',
    basePath: '',
    standaloneKomponenter: '/components'
};

export function usePaths() {
    const fnr = useFodselsnummer();

    const getPath = useCallback(
        (tab: InfotabsType) => {
            return `${paths.personUri}/${fnr}/${INFOTABS[tab].path}`;
        },
        [fnr]
    );

    return useMemo(
        () => ({
            ...paths,
            sakerFullscreen: `${paths.basePath}/saker/${fnr}`,
            oversikt: getPath(InfotabsType.OVERSIKT),
            oppfolging: getPath(InfotabsType.OPPFOLGING),
            meldinger: getPath(InfotabsType.MELDINGER),
            utbetlainger: getPath(InfotabsType.UTBETALING),
            saker: getPath(InfotabsType.SAKER),
            ytelser: getPath(InfotabsType.YTELSER),
            varsler: getPath(InfotabsType.VARSLER)
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
