import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { Dokument, Dokumentmetadata, Sakstema } from 'src/generated/modiapersonoversikt-api';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import { filterType, trackFilterEndret } from 'src/utils/analytics';
import { sakstemakodeAlle, sakstemakodeIngen } from './utils/saksoversiktUtilsV2';

interface SakstemaURLStateV2 {
    valgteSakstemaer: Sakstema[];
    valgtDokument: Dokument | undefined;
    valgtJournalpost: Dokumentmetadata | undefined;
    setIngenValgte(): void;
    setAlleValgte(): void;
    toggleValgtSakstema(sakstema: Sakstema): void;
}

interface SakstemaResourceV2 {
    alleSakstema: Sakstema[];
    isLoading: boolean;
}

export function useSakstemaURLStateV2(alleSakstemaer: Sakstema[]): SakstemaURLStateV2 {
    const { data: sakerData } = useSakerDokumenter();
    const navigate = useNavigate({ from: '/person/saker' });
    const query = useSearch({ strict: false });
    const queryParams = useSearch({ strict: false }); //SYK-BAR-AAP
    return useMemo(() => {
        const sakstemaerFraUrl: string[] = queryParams.sakstema?.split('-') ?? [sakstemakodeAlle];
        const valgteSakstemaer: Sakstema[] = sakstemaerFraUrl.includes(sakstemakodeAlle)
            ? alleSakstemaer
            : alleSakstemaer.filter((sakstema) => sakstemaerFraUrl.includes(sakstema.temakode));

        const journalposter: Dokumentmetadata[] = sakerData?.dokumenter ?? [];
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
            } else if (nyTemaliste.length === alleSakstemaer.length) {
                setAlleValgte();
            } else {
                const nyURL = nyTemaliste.map((sakstema) => sakstema.temakode).join('-');
                navigate({
                    search: { ...query, sakstema: nyURL }
                });
            }
            trackFilterEndret('saker', filterType.TEMA);
        };

        return {
            valgteSakstemaer,
            valgtDokument,
            valgtJournalpost,
            setAlleValgte,
            setIngenValgte,
            toggleValgtSakstema
        };
    }, [queryParams, alleSakstemaer, sakerData]);
}

export function useHentAlleSakstemaFraResourceV2(): SakstemaResourceV2 {
    const { data, isLoading } = useSakerDokumenter();
    return { alleSakstema: data?.temaer ?? [], isLoading };
}

function inneholderValgtDokument(journalpost: Dokumentmetadata, dokumentId?: string): boolean {
    return (
        !!dokumentId &&
        [
            journalpost.hoveddokument.dokumentreferanse,
            ...journalpost.vedlegg.flatMap((dokument) => dokument.dokumentreferanse)
        ].includes(dokumentId)
    );
}
