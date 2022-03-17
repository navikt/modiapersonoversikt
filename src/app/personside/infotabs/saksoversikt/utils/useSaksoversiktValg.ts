import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { useMemo } from 'react';
import { useSakerRouting } from './saksoversiktRoutingUtils';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';

export interface SaksoversiktValg {
    saksdokument?: Dokument;
    journalpost?: Journalpost;
}

export function useSaksoversiktValg(): SaksoversiktValg {
    const valgtSaksdokument = useValgtSaksdokumentIUrl();
    const valgtJournalpost = useValgtJournalpostIUrl();

    //TODO: erstattes på noen måte?

    return useMemo(
        () => ({
            saksdokument: valgtSaksdokument,
            journalpost: valgtJournalpost
        }),
        [valgtJournalpost, valgtSaksdokument]
    );
}

function useValgtJournalpostIUrl(): Journalpost | undefined {
    const saker = useRestResource((resources) => resources.sakstema);
    const sakerRouting = useSakerRouting();
    return useMemo(() => {
        if (!saker.data) {
            return undefined;
        }

        const journalPoster = saker.data.resultat.flatMap((it) => it.dokumentMetadata);
        return journalPoster.find((it) => sakerRouting.erValgtJournalpost(it));
    }, [saker, sakerRouting]);
}

function useValgtSaksdokumentIUrl(): Dokument | undefined {
    const saker = useRestResource((resources) => resources.sakstema);
    const sakerRouting = useSakerRouting();

    return useMemo(() => {
        if (!saker.data) {
            return undefined;
        }

        const saksDokumenter = saker.data.resultat
            .flatMap((it) => it.dokumentMetadata)
            .flatMap((it) => [it.hoveddokument, ...it.vedlegg]);
        return saksDokumenter.find((it) => sakerRouting.erValgtSaksdokument(it));
    }, [sakerRouting, saker]);
}
