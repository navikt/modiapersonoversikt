import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { usePaths } from '../../../../routes/routing';
import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { useQueryParams } from '../../../../../utils/url-utils';
import { erSakerFullscreen } from './erSakerFullscreen';
import { sakstemakodeAlle, sakstemakodeIngen } from './saksoversiktUtils';

interface QueryParamsForSak {
    dokument?: string;
    sakstema?: string;
}

export interface SakerRouting {
    link: (sakstema?: Sakstema, valgtDokument?: Dokument, standalone?: boolean) => string;
    route: string;
    erValgtSakstema: (sakstema: Sakstema) => boolean;
    erValgtJournalpost: (journalpost: Journalpost) => boolean;
    erValgtSaksdokument: (dokument: Dokument) => boolean;
    erIngenSakstemaValgt: boolean;
}

export function useSakerRouting(): SakerRouting {
    const pathname = useLocation().pathname;
    const paths = usePaths();
    const queryParams = useQueryParams<QueryParamsForSak>();

    return useMemo(
        () => ({
            link: (sakstema, valgtDokumentId, standalone) =>
                `${
                    standalone || erSakerFullscreen(pathname) ? paths.sakerFullscreen : paths.saker
                }?${getSaksoversiktQueryParametere(valgtDokumentId, sakstema)}`,
            route: `${paths.saker}`,
            erValgtSakstema: (sakstema) =>
                (queryParams.sakstema?.split('-').includes(sakstema.temakode.split('-')[0]) ||
                    sakstema.temakode.split('-')[0] === sakstemakodeAlle) ??
                false,
            erValgtSaksdokument: (dokument) => dokument.dokumentreferanse === queryParams.dokument,
            erValgtJournalpost: (journalpost) => inneholderValgtDokument(journalpost, queryParams.dokument),
            erIngenSakstemaValgt: queryParams.sakstema?.includes(sakstemakodeIngen) ?? false
        }),
        [paths, pathname, queryParams]
    );
}

function inneholderValgtDokument(journalpost: Journalpost, dokumentId?: string): boolean {
    return (
        !!dokumentId &&
        [
            journalpost.hoveddokument.dokumentreferanse,
            ...journalpost.vedlegg.flatMap((it) => it.dokumentreferanse)
        ].includes(dokumentId)
    );
}

function getSaksoversiktQueryParametere(dokument?: Dokument, valgtSakstema?: Sakstema) {
    const sakstemaQuery =
        valgtSakstema !== undefined && valgtSakstema.temakode !== '' ? `sakstema=${valgtSakstema.temakode}` : '';
    const dokumentQuery = dokument ? `dokument=${dokument.dokumentreferanse}` : '';
    return [sakstemaQuery, dokumentQuery].filter((it) => it).join('&');
}
