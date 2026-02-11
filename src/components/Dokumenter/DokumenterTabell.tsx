import { EyeSlashIcon, FilesIcon } from '@navikt/aksel-icons';
import { Box, HStack, InlineMessage, Pagination, type SortState, Table, Tag } from '@navikt/ds-react';
import { useState } from 'react';
import { DokumentVisningExpandable } from 'src/components/Dokumenter/DokumentVisningExpandable';
import { useSortedAndPaginatedDokumenter } from 'src/components/Dokumenter/useSortedAndPaginatedDokumenter';
import { hentBrukerNavn } from 'src/components/saker/utils';
import {
    type Dokumentmetadata,
    DokumentmetadataAvsender,
    DokumentmetadataMottaker
} from 'src/generated/modiapersonoversikt-api';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { trackVisDetaljvisning } from 'src/utils/analytics';
import { capitalizeName, formaterDato } from 'src/utils/string-utils';

export interface DokumenterSortState extends SortState {
    orderBy: keyof Dokumentmetadata;
}

export const avsenderMottaker = (
    brukernavn: string,
    avsenderMottaker: DokumentmetadataAvsender | DokumentmetadataMottaker
) => {
    switch (avsenderMottaker) {
        case DokumentmetadataAvsender.SLUTTBRUKER:
        case DokumentmetadataMottaker.SLUTTBRUKER:
            return capitalizeName(brukernavn);
        case DokumentmetadataAvsender.NAV:
        case DokumentmetadataMottaker.NAV:
            return 'Nav';
        case DokumentmetadataAvsender.EKSTERN_PART:
            return 'Ekstern';
        default:
            return 'Ukjent';
    }
};

export const DokumenterTabell = () => {
    const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});

    const [sort, setSort] = useState<DokumenterSortState | undefined>();
    const [page, setPage] = useState(1);
    const rowsPerPage = 50;

    const { dokumenter, antallDokumenter } = useSortedAndPaginatedDokumenter({ page, rowsPerPage, sort });

    const { data } = usePersonData();
    const brukersNavn = hentBrukerNavn(data?.person ?? null);

    const handleOnExpand = (id: string, isOpen: boolean) => {
        setOpenMap({
            ...openMap,
            [id]: isOpen
        });
        if (isOpen) trackVisDetaljvisning('dokumenter', 'åpnet dokumentexpandable');
    };

    const handleSort = (sortKey: DokumenterSortState['orderBy']) => {
        setSort(
            sort && sortKey === sort.orderBy && sort.direction === 'descending'
                ? undefined
                : {
                      orderBy: sortKey,
                      direction:
                          sort && sortKey === sort.orderBy && sort.direction === 'ascending'
                              ? 'descending'
                              : 'ascending'
                  }
        );
    };

    if (antallDokumenter === 0) {
        return (
            <Box.New paddingBlock="4">
                <InlineMessage status="info" aria-live="polite">
                    Ingen resultat
                </InlineMessage>
            </Box.New>
        );
    }

    return (
        <>
            <Table
                size="large"
                sort={sort as SortState | undefined}
                onSortChange={(sortKey) => handleSort(sortKey as DokumenterSortState['orderBy'])}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.ColumnHeader sortKey="beskrivelse" scope="col" sortable>
                            Beskrivelse
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="dato" scope="col" sortable>
                            Dato
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="avsender" scope="col" sortable>
                            Avsender
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="mottaker" scope="col" sortable>
                            Mottaker
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="temakodeVisning" scope="col" sortable>
                            Tema
                        </Table.ColumnHeader>
                        <Table.ColumnHeader sortKey="tilhorendeFagsaksid" scope="col" sortable>
                            SaksID
                        </Table.ColumnHeader>
                        <Table.ColumnHeader />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dokumenter?.map((journalpost) => {
                        const isOpen = openMap[journalpost.id] ?? false;

                        return (
                            <Table.ExpandableRow
                                expansionDisabled={!journalpost.harTilgang}
                                onOpenChange={(open) => handleOnExpand(journalpost.id, open)}
                                key={journalpost.id}
                                content={<DokumentVisningExpandable journalpost={journalpost} isOpen={isOpen} />}
                            >
                                <Table.HeaderCell scope="row" className="font-extralight">
                                    {journalpost.harTilgang ? (
                                        journalpost.beskrivelse
                                    ) : (
                                        <HStack wrap={false} gap="1" align="center">
                                            <EyeSlashIcon
                                                color="var(--ax-text-neutral-subtle)"
                                                fontSize="1.3rem"
                                                aria-hidden
                                            />{' '}
                                            <Box.New className="text-[var(--ax-text-neutral-subtle)]">
                                                Ingen tilgang
                                            </Box.New>
                                        </HStack>
                                    )}
                                </Table.HeaderCell>
                                <Table.DataCell>{formaterDato(journalpost.dato)}</Table.DataCell>
                                <Table.DataCell>{avsenderMottaker(brukersNavn, journalpost.avsender)}</Table.DataCell>
                                <Table.DataCell>{avsenderMottaker(brukersNavn, journalpost.mottaker)}</Table.DataCell>
                                <Table.DataCell>{journalpost.temakodeVisning} </Table.DataCell>
                                <Table.DataCell>{journalpost.tilhorendeFagsaksid}</Table.DataCell>
                                <Table.DataCell>
                                    <Tag
                                        size="small"
                                        variant="info-moderate"
                                        title="Antall vedlegg"
                                        icon={<FilesIcon aria-hidden />}
                                    >
                                        {journalpost.vedlegg.length ? journalpost.vedlegg.length + 1 : 1}
                                    </Tag>
                                </Table.DataCell>
                            </Table.ExpandableRow>
                        );
                    })}
                </Table.Body>
            </Table>
            {antallDokumenter >= rowsPerPage && (
                <Pagination
                    page={page}
                    onPageChange={setPage}
                    count={Math.ceil(antallDokumenter / rowsPerPage)}
                    size="small"
                />
            )}
        </>
    );
};
