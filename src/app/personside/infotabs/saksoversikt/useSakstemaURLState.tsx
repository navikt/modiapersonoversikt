import { useMemo } from 'react';
import { useHistory } from 'react-router';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { datoSynkende } from '../../../../utils/date-utils';
import { hentDatoForSisteHendelse, sakstemakodeAlle, sakstemakodeIngen } from './utils/saksoversiktUtils';
import { useQueryParams } from '../../../../utils/url-utils';
import { Dokument, Journalpost } from '../../../../models/saksoversikt/journalpost';
import sakstemaLoader from '../../../../rest/resources/sakstemaResource';
import { filtrerSakstemaerUtenData } from './sakstemaliste/SakstemaListeUtils';

interface SakstemaURLState {
    valgteSakstemaer: Sakstema[];
    valgtDokument: Dokument | undefined;
    valgtJournalpost: Journalpost | undefined;
    setIngenValgte(): void;
    setAlleValgte(): void;
    toggleValgtSakstema(sakstema: Sakstema): void;
}

interface QueryParamsForSak {
    sakstema?: string;
    dokument?: string;
}

interface SakstemaResource {
    alleSakstema: Sakstema[];
    isLoading: boolean;
}

export function useSakstemaURLState(alleSakstemaer: Sakstema[]): SakstemaURLState {
    const filtrertAlleSakstemaer = filtrerSakstemaerUtenData(alleSakstemaer);
    const history = useHistory();
    const queryParams = useQueryParams<QueryParamsForSak>(); //SYK-BAR-AAP
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
            history.push({
                search: `?sakstema=${sakstemakodeIngen}`
            });
        };

        const setAlleValgte = () => {
            history.push({
                search: `?sakstema=${sakstemakodeAlle}`
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
                    .sort(datoSynkende((sakstema) => hentDatoForSisteHendelse(sakstema)))
                    .map((sakstema) => sakstema.temakode)
                    .join('-');
                history.push({
                    search: `?sakstema=${nyURL}`
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

export function useHentAlleSakstemaFraResource(): SakstemaResource {
    const resource = sakstemaLoader.useFetch();

    return useMemo(() => {
        if (resource.data) {
            return {
                alleSakstema: resource.data.resultat.sort(datoSynkende((it) => hentDatoForSisteHendelse(it))),
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
