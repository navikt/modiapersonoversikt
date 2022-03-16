import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { useMemo } from 'react';
import { aggregertSakstema } from './saksoversiktUtils';
import { useSakerRouting } from './saksoversiktRoutingUtils';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';
import { useInfotabsDyplenker } from '../../dyplenker';

export interface SaksoversiktValg {
    sakstema?: Sakstema;
    saksdokument?: Dokument;
    journalpost?: Journalpost;
}

export function useSaksoversiktValg(): SaksoversiktValg {
    const valgtSakstema = useValgtSakstemaIUrl();
    const valgtSaksdokument = useValgtSaksdokumentIUrl();
    const valgtJournalpost = useValgtJournalpostIUrl();

    return useMemo(
        () => ({
            sakstema: valgtSakstema,
            saksdokument: valgtSaksdokument,
            journalpost: valgtJournalpost
        }),
        [valgtJournalpost, valgtSaksdokument, valgtSakstema]
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

export function useValgtSakstemaIUrl(): Sakstema | undefined {
    const dyplenker = useInfotabsDyplenker();
    const sakstemaResource = useRestResource((resources) => resources.sakstema);

    return useMemo(() => {
        if (!sakstemaResource.data) {
            return undefined;
        }
        const valgteSakstemaer = sakstemaResource.data.resultat.filter(dyplenker.saker.erValgtSakstema);
        return aggregertSakstema(sakstemaResource.data.resultat, valgteSakstemaer);
    }, [dyplenker.saker, sakstemaResource]);
}
