import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { Dokument, Journalpost } from '../../../../models/saksoversikt/journalpost';
import type { Sakstema } from '../../../../models/saksoversikt/sakstema';
import sakstemaResource from '../../../../rest/resources/sakstemaResource';
import { datoSynkende } from '../../../../utils/date-utils';
import { filtrerSakstemaerUtenDataV2 } from './sakstemaliste/SakstemaListeUtils';
import { sakstemakodeAlle, sakstemakodeIngen } from './utils/saksoversiktUtilsV2';
import { hentDatoForSisteHendelseV2 } from './utils/saksoversiktUtilsV2';

interface SakstemaURLStateV2 {
    valgteSakstemaer: Sakstema[];
    valgtDokument: Dokument | undefined;
    valgtJournalpost: Journalpost | undefined;
    setIngenValgte(): void;
    setAlleValgte(): void;
    toggleValgtSakstema(sakstema: Sakstema): void;
}

interface SakstemaResourceV2 {
    alleSakstema: Sakstema[];
    isLoading: boolean;
}

export function useSakstemaURLStateV2(alleSakstemaer: Sakstema[]): SakstemaURLStateV2 {
    const filtrertAlleSakstemaer = filtrerSakstemaerUtenDataV2(alleSakstemaer);
    const navigate = useNavigate({ from: '/person/saker' });
    const query = useSearch({ strict: false });
    const queryParams = useSearch({ strict: false }); //SYK-BAR-AAP
    return useMemo(() => {
        const sakstemaerFraUrl: string[] = queryParams.sakstema?.split('-') ?? [sakstemakodeAlle];
        const valgteSakstemaer: Sakstema[] = sakstemaerFraUrl.includes(sakstemakodeAlle)
            ? filtrertAlleSakstemaer
            : filtrertAlleSakstemaer.filter((sakstema) => sakstemaerFraUrl.includes(sakstema.temakode));

        const journalposter = filtrertAlleSakstemaer.flatMap((sakstema) => sakstema.dokumentMetadata);
        const dokumenter = journalposter.flatMap((journalpost) => [journalpost.hoveddokument, ...journalpost.vedlegg]);
        const dokumentReferanseFraUrl = queryParams.dokument ?? '';
        const valgtDokument = dokumenter.find((dokument) => dokument.dokumentreferanse === dokumentReferanseFraUrl);
        const valgtJournalpost = journalposter.find((journalpost) =>
            inneholderValgtDokument(journalpost, dokumentReferanseFraUrl)
        );

        const setIngenValgte = () => {
            navigate({
                search: { ...query, sakstema: sakstemakodeIngen }
            });
        };

        const setAlleValgte = () => {
            navigate({
                search: { ...query, sakstema: sakstemakodeAlle }
            });
        };

        const toggleValgtSakstema = (sakstema: Sakstema) => {
            const nyTemaliste = valgteSakstemaer.includes(sakstema)
                ? valgteSakstemaer.filter((tema) => tema !== sakstema)
                : [...valgteSakstemaer, sakstema];

            if (nyTemaliste.isEmpty()) {
                setIngenValgte();
            } else if (nyTemaliste.length === filtrertAlleSakstemaer.length) {
                setAlleValgte();
            } else {
                const nyURL = nyTemaliste
                    .sort(datoSynkende((sakstema) => hentDatoForSisteHendelseV2(sakstema) ?? Date()))
                    .map((sakstema) => sakstema.temakode)
                    .join('-');
                navigate({
                    search: { ...query, sakstema: nyURL }
                });
            }
        };

        return {
            valgteSakstemaer,
            valgtDokument,
            valgtJournalpost,
            setAlleValgte,
            setIngenValgte,
            toggleValgtSakstema
        };
    }, [history, queryParams, filtrertAlleSakstemaer]);
}

export function useHentAlleSakstemaFraResourceV2(): SakstemaResourceV2 {
    const resource = sakstemaResource.useFetch();

    return useMemo(() => {
        if (resource.data) {
            return {
                alleSakstema: resource.data.resultat.sort(
                    datoSynkende((it) => hentDatoForSisteHendelseV2(it) ?? Date())
                ),
                isLoading: false
            };
        }
        return { alleSakstema: [], isLoading: true };
    }, [resource]);
}

function inneholderValgtDokument(journalpost: Journalpost, dokumentId?: string): boolean {
    return (
        !!dokumentId &&
        [
            journalpost.hoveddokument.dokumentreferanse,
            ...journalpost.vedlegg.flatMap((dokument) => dokument.dokumentreferanse)
        ].includes(dokumentId)
    );
}
