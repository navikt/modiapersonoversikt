import { ExternalLinkIcon, EyeSlashIcon } from '@navikt/aksel-icons';
import { Pagination, type SortState, Table, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import Card from 'src/components/Card';
import { DokumentVisningExpandable } from 'src/components/dokumenter/DokumentVisningExpandable';
import { useSortedAndPaginatedDokumenter } from 'src/components/dokumenter/useSortedAndPaginatedDokumenter';
import { hentBrukerNavn } from 'src/components/saker/utils';
import {
    type Dokumentmetadata,
    DokumentmetadataAvsender,
    DokumentmetadataMottaker
} from 'src/generated/modiapersonoversikt-api';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { trackAccordionClosed, trackAccordionOpened, trackingEvents } from 'src/utils/analytics';
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

export const DokumenterPage = () => {
    const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});

    const [sort, setSort] = useState<DokumenterSortState | undefined>();
    const [page, setPage] = useState(1);
    const rowsPerPage = 50;

    const { dokumenter, antallDokumenter } = useSortedAndPaginatedDokumenter({ page, rowsPerPage, sort });
    const {
        data: { person }
    } = usePersonData();
    const brukersNavn = hentBrukerNavn(person);

    const handleOnExpand = (id: string, isOpen: boolean) => {
        setOpenMap({
            ...openMap,
            [id]: isOpen
        });
        isOpen ? trackAccordionOpened('dokumentvisning') : trackAccordionClosed('dokumentvisning');
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

    return (
        <Card padding="4" className="h-full overflow-auto">
            <VStack gap="2">
                <Table
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
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {dokumenter?.map((journalpost) => {
                            const isOpen = openMap[journalpost.id] ?? false;

                            return (
                                <Table.ExpandableRow
                                    onOpenChange={(open) => handleOnExpand(journalpost.id, open)}
                                    key={journalpost.id}
                                    content={<DokumentVisningExpandable journalpost={journalpost} isOpen={isOpen} />}
                                >
                                    <Table.HeaderCell scope="row">{journalpost.beskrivelse}</Table.HeaderCell>
                                    <Table.DataCell>{formaterDato(journalpost.dato)}</Table.DataCell>
                                    <Table.DataCell>
                                        {avsenderMottaker(brukersNavn, journalpost.avsender)}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {avsenderMottaker(brukersNavn, journalpost.mottaker)}
                                    </Table.DataCell>
                                    <Table.DataCell>{journalpost.temakodeVisning}</Table.DataCell>
                                    <Table.DataCell>{journalpost.tilhorendeFagsaksid}</Table.DataCell>
                                    {!!journalpost.id && !!journalpost.hoveddokument.dokumentreferanse ? (
                                        <Table.DataCell>
                                            <Link
                                                to="/dokument"
                                                data-umami-event={trackingEvents.detaljvisningKlikket}
                                                data-umami-event-fane="saker"
                                                data-umami-event-tekst="åpnet dokument"
                                                search={{
                                                    dokument: journalpost.hoveddokument.dokumentreferanse,
                                                    journalpost: journalpost.id
                                                }}
                                                target="_blank"
                                                className="lenke typo-element"
                                            >
                                                <ExternalLinkIcon title="Åpne hoveddokument i ny fane"></ExternalLinkIcon>
                                            </Link>
                                        </Table.DataCell>
                                    ) : (
                                        <EyeSlashIcon />
                                    )}
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
            </VStack>
        </Card>
    );
};
