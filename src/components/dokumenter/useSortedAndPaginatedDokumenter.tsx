import { orderBy } from 'lodash';
import type { DokumenterSortState } from 'src/components/dokumenter/index';
import { type Dokument, DokumentDokumentStatus, type Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';
import sakstemaResource from 'src/rest/resources/sakstemaResource';

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
    const resource = sakstemaResource.useFetch();

    const dokumenterMetadata = resource.data?.resultat.flatMap((sakstema) => sakstema.dokumentMetadata) as
        | Dokumentmetadata[]
        | undefined;

    const dokumenter = dokumenterMetadata?.map((dokument) => ({
        ...dokument,
        beskrivelse:
            dokument.vedlegg.length > 0
                ? '1har vedlegg'
                : dokument.hoveddokument.tittel === '*****'
                  ? 'Kan ikke vises'
                  : dokumentTekst(
                        dokument.hoveddokument,
                        dokument.id === null || dokument.hoveddokument.dokumentreferanse === null
                    )
    }));
    const sortedData = sort
        ? orderBy(dokumenter, [sort.orderBy], [sort.direction === 'ascending' ? 'asc' : 'desc'])
        : dokumenter;

    const paginertData = sortedData?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return { dokumenter: paginertData, antallDokumenter: dokumenter?.length || 0 };
};
