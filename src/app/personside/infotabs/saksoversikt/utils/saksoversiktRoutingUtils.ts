import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { getUnikSakstemaKey } from './saksoversiktUtils';
import { usePaths } from '../../../../routes/routing';
import { useMemo } from 'react';
import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { useAppState } from '../../../../../utils/customHooks';
import { useQueryParams } from '../../../../../utils/urlUtils';

export interface SakerRouting {
    link: (saksTema?: Sakstema, valgtDokument?: Dokument, standalone?: boolean) => string;
    route: string;
    erValgtSakstema: (sakstema: Sakstema) => boolean;
    erValgtJournalpost: (journalpost: Journalpost) => boolean;
    erValgtSaksdokument: (dokument: Dokument) => boolean;
}

export function useSakerRouting(): SakerRouting {
    const paths = usePaths();
    const queryParams = useQueryParams<{ dokument?: string; sakstema?: string }>();
    const erStandAlone = useAppState(state => state.saksoversikt.erStandaloneVindu);

    return useMemo(
        () => ({
            link: (saksTema, valgtDokumentId, standalone) =>
                `${standalone || erStandAlone ? paths.sakerEgetVindu : paths.saker}?${getSaksoversiktQueryParametere(
                    valgtDokumentId,
                    saksTema
                )}`,
            route: `${paths.saker}`,
            erValgtSakstema: sakstema => getUnikSakstemaKey(sakstema) === queryParams.sakstema,
            erValgtSaksdokument: dokument => dokument.dokumentreferanse === queryParams.dokument,
            erValgtJournalpost: journalpost => inneholderValgtDokument(journalpost, queryParams.dokument)
        }),
        [paths, queryParams, erStandAlone]
    );
}

function inneholderValgtDokument(journalpost: Journalpost, dokumentId?: string): boolean {
    return (
        !!dokumentId &&
        [
            journalpost.hoveddokument.dokumentreferanse,
            ...journalpost.vedlegg.flatMap(it => it.dokumentreferanse)
        ].includes(dokumentId)
    );
}

function getSaksoversiktQueryParametere(dokument?: Dokument, valgtSakstema?: Sakstema) {
    const sakstemaQuery = valgtSakstema ? `sakstema=${getUnikSakstemaKey(valgtSakstema)}` : '';
    const dokumentQuery = dokument ? `dokument=${dokument.dokumentreferanse}` : '';
    return [sakstemaQuery, dokumentQuery].filter(it => it).join('&');
}
