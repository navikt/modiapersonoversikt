import dayjs from 'dayjs';
import { personPaths } from '../../routes/routing';
import { Utbetaling } from '../../../models/utbetalinger';
import { useLocation, useParams } from '@tanstack/react-router';
import { Traad } from '../../../models/meldinger/meldinger';
import { useMemo } from 'react';
import { useQueryParams } from '../../../utils/url-utils';
import { getUnikYtelseKey, Ytelse } from '../../../models/ytelse/ytelse-utils';
import { Dokument } from '../../../models/saksoversikt/journalpost';
import { Sakstema } from '../../../models/saksoversikt/sakstema';
import { erSakerFullscreen } from './saksoversikt/utils/erSakerFullscreen';

interface Dyplenker {
    utbetaling: {
        link: (utbetaling: Utbetaling) => string;
        route: string;
        erValgt: (utbetaling: Utbetaling) => boolean;
    };
    meldinger: {
        link: (traad: Traad) => string;
        route: string;
        erValgt: (traad: Traad) => boolean;
    };
    saker: {
        link: (sakstema?: Sakstema, valgtDokument?: Dokument, standalone?: boolean) => string;
        route: string;
    };
    ytelser: {
        link: (ytelse: Ytelse) => string;
        route: string;
        erValgt: (ytelse: Ytelse) => boolean;
    };
}

type DyplenkeParams = {
    posteringsdato?: string;
};

type DyplenkerQueryParams = {
    traadId?: string;
    ytelse?: string;
};

export function useInfotabsDyplenker(): Dyplenker {
    const params = useParams<DyplenkeParams>({});
    const posteringsdato: string | undefined = params.posteringsdato;

    const queryParams = useQueryParams<DyplenkerQueryParams>();
    const paths = personPaths;
    const pathname = useLocation().pathname;

    return useMemo(
        () => ({
            utbetaling: {
                link: (utbetaling: Utbetaling) => `${paths.utbetlainger}/${dayjs(utbetaling.posteringsdato).unix()}`,
                route: `${paths.utbetlainger}/:posteringsdato?`,
                erValgt: (utbetaling: Utbetaling) => {
                    const posteringsdatoFraUrl = dayjs.unix(posteringsdato as unknown as number);
                    return dayjs(utbetaling.posteringsdato).isSame(posteringsdatoFraUrl);
                }
            },
            meldinger: {
                link: (traad: Traad) => `${paths.meldinger}?traadId=${traad.traadId}`,
                route: `${paths.meldinger}`,
                erValgt: (traad: Traad) => traad.traadId === queryParams.traadId
            },
            saker: {
                link: (sakstema, valgtDokumentId, standalone) =>
                    `${
                        standalone || erSakerFullscreen(pathname) ? paths.sakerFullscreen : paths.saker
                    }?${getSaksoversiktQueryParametere(valgtDokumentId, sakstema)}`,
                route: `${paths.saker}`
            },
            ytelser: {
                link: (ytelse: Ytelse) => `${paths.ytelser}?ytelse=${getUnikYtelseKey(ytelse)}`,
                route: `${paths.ytelser}`,
                erValgt: (ytelse: Ytelse) => getUnikYtelseKey(ytelse) === queryParams.ytelse
            }
        }),
        [pathname, paths, posteringsdato, queryParams]
    );
}

function getSaksoversiktQueryParametere(dokument?: Dokument, valgtSakstema?: Sakstema) {
    const sakstemaQuery =
        valgtSakstema !== undefined && valgtSakstema.temakode !== '' ? `sakstema=${valgtSakstema.temakode}` : '';
    const dokumentQuery = dokument ? `dokument=${dokument.dokumentreferanse}` : '';
    return [sakstemaQuery, dokumentQuery].filter((it) => it).join('&');
}
