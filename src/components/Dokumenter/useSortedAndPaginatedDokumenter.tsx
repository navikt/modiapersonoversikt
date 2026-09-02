import { orderBy } from 'lodash';
import type { DokumenterSortState } from 'src/components/Dokumenter/index';
import { useFilterDokumenter } from 'src/components/Dokumenter/utils';
import { type Dokument, DokumentDokumentStatus } from 'src/generated/modiapersonoversikt-api';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';

export const dokumentTekst = (dokument: Dokument, ikkeTilgjengelig: boolean) => {
    return (
        dokument.tittel +
        (dokument.skjerming ? ' (Skjermet)' : '') +
        (dokument.dokumentStatus === DokumentDokumentStatus.KASSERT ? ' (Kassert)' : '') +
        (ikkeTilgjengelig ? ' (Dokument er ikke tilgjengelig)' : '')
    );
};

export const useSortedAndPaginatedDokumenter = ({
    page,
    rowsPerPage,
    sort
}: {
    sort?: DokumenterSortState;
    rowsPerPage: number;
    page: number;
}) => {
    const { data } = useFilterDokumenter();
    const { data: alleDokumenterData } = useSakerDokumenter();
    const filtrertDokumentmetadata = data.dokumenter;

    const dokumenter = filtrertDokumentmetadata?.map((journalpost) => {
        const alleTilhorendeDokumenter = [...journalpost.vedlegg, journalpost.hoveddokument];
        const harTilgangTilNoenDokumenter = alleTilhorendeDokumenter.some((dok) => dok.saksbehandlerHarTilgang);

        return {
            ...journalpost,
            beskrivelse: dokumentTekst(
                journalpost.hoveddokument,
                journalpost.id === null || journalpost.hoveddokument.dokumentreferanse === null
            ),
            harTilgang: harTilgangTilNoenDokumenter,
            antallVedlegg: journalpost.vedlegg.length
        };
    });
    const sortedData = sort
        ? orderBy(dokumenter, [sort.orderBy], [sort.direction === 'ascending' ? 'asc' : 'desc'])
        : dokumenter;

    const antallFiltrerte = filtrertDokumentmetadata?.length ?? 0;

    const antallSider = Math.max(1, Math.ceil(antallFiltrerte / rowsPerPage));
    const gjeldendeSide = Math.min(page, antallSider);

    const paginertData = sortedData?.slice((gjeldendeSide - 1) * rowsPerPage, gjeldendeSide * rowsPerPage);

    return {
        dokumenterPaSide: paginertData ?? [],
        antallFiltrerte,
        antallTotalt: alleDokumenterData?.dokumenter?.length ?? 0,
        antallSider,
        gjeldendeSide
    };
};
