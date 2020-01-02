import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { useMemo } from 'react';
import { useRestResource } from '../../../../../utils/customHooks';
import { hasData } from '../../../../../rest/utils/restResource';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useAgregerteSaker } from './saksoversiktUtils';
import { useSakerRouting } from './saksoversiktRoutingUtils';

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
    const saker = useRestResource(resources => resources.sakstema);
    const sakerRouting = useSakerRouting();
    return useMemo(() => {
        if (!hasData(saker)) {
            return undefined;
        }

        const journalPoster = saker.data.resultat.flatMap(it => it.dokumentMetadata);
        return journalPoster.find(it => sakerRouting.erValgtJournalpost(it));
    }, [saker, sakerRouting]);
}

function useValgtSaksdokumentIUrl(): Dokument | undefined {
    const saker = useRestResource(resources => resources.sakstema);
    const sakerRouting = useSakerRouting();

    return useMemo(() => {
        if (!hasData(saker)) {
            return undefined;
        }

        const saksDokumenter = saker.data.resultat
            .flatMap(it => it.dokumentMetadata)
            .flatMap(it => [it.hoveddokument, ...it.vedlegg]);
        return saksDokumenter.find(it => sakerRouting.erValgtSaksdokument(it));
    }, [sakerRouting, saker]);
}

function useValgtSakstemaIUrl(): Sakstema | undefined {
    const dyplenker = useInfotabsDyplenker();
    const sakstemaResource = useRestResource(resources => resources.sakstema);
    const agregerteSaker = useAgregerteSaker();

    return useMemo(() => {
        if (!hasData(sakstemaResource) || !agregerteSaker) {
            return undefined;
        }
        const alleSakstema = [agregerteSaker, ...sakstemaResource.data.resultat];
        return alleSakstema.find(dyplenker.saker.erValgtSakstema) || agregerteSaker;
    }, [dyplenker, sakstemaResource, agregerteSaker]);
}
