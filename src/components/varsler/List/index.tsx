import { CheckmarkCircleIcon, ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Heading, Pagination, Skeleton, type SortState, Table, Tag, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import Card from 'src/components/Card';
import { VarselDetail } from 'src/components/varsler/Details';
import { ENDASH, emptyReplacement, formaterDato } from 'src/utils/string-utils';
import { useFilterVarsler, type VarselData } from './utils';

const Status = ({ varsel }: { varsel: VarselData }) => {
    if (varsel.harFeilteVarsel) {
        return (
            <Tag title="Varsling feilet" variant="error-moderate" size="small">
                <ExclamationmarkTriangleIcon aria-hidden /> Varsling feilet
            </Tag>
        );
    }
    return (
        <Tag title="Varsling vellykket" variant="success-moderate" size="small">
            <CheckmarkCircleIcon aria-hidden /> Varsling vellykket
        </Tag>
    );
};

export const VarslerListe = () => {
    const { varsler, isLoading, isError } = useFilterVarsler();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SortState | undefined>({ orderBy: 'sisteDato', direction: 'descending' });

    const rowsPerPage = 10;

    if (isError) return;

    if (isLoading) return <Skeleton variant="rounded" height={166} />;

    if (!varsler || varsler.length === 0) {
        return <Alert variant="info">Brukeren har ingen varsler.</Alert>;
    }

    const handleSort = (sortKey: string) => {
        setSort((prevSort) =>
            prevSort?.orderBy === sortKey && prevSort.direction === 'ascending'
                ? { orderBy: sortKey, direction: 'descending' }
                : { orderBy: sortKey, direction: 'ascending' }
        );
    };

    type StringKeyOf<T> = Extract<keyof T, string>;

    function isKeyOf<T extends object>(key: string, obj: T): key is StringKeyOf<T> {
        return key in obj;
    }

    function comparator<T>(a: T, b: T, orderBy: keyof T): number {
        if (b[orderBy] == null || b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const sortedData = varsler.slice().sort((a, b) => {
        if (!sort) return 0;
        if (!isKeyOf(sort.orderBy, a)) return 0;
        return sort.direction === 'ascending' ? comparator(b, a, sort.orderBy) : comparator(a, b, sort.orderBy);
    });

    const paginatedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Card padding="4">
            <VStack gap="space-16">
                <Heading as="h4" size="small">
                    Varsler
                </Heading>
                <BodyLong>
                    Viser varsler for det siste året. For eldre varsler, opprett sak i porten for manuell uthenting.
                </BodyLong>
                <Table zebraStripes={true} sort={sort} onSortChange={handleSort} size="small">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader sortKey="tittel" sortable scope="col">
                                Varsel
                            </Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="sisteDato" sortable scope="col">
                                Sendt
                            </Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="produsent" sortable scope="col">
                                Produsert av
                            </Table.ColumnHeader>
                            <Table.HeaderCell scope="col">Kanal</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                            <Table.HeaderCell scope="col" />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {paginatedData.map((varsel, index) => {
                            return (
                                <Table.ExpandableRow
                                    shadeOnHover={true}
                                    key={index}
                                    togglePlacement="right"
                                    content={<VarselDetail valgtVarsel={varsel} />}
                                >
                                    <Table.DataCell>{varsel.tittel}</Table.DataCell>
                                    <Table.DataCell>{formaterDato(varsel.sisteDato)}</Table.DataCell>
                                    <Table.DataCell>{varsel.produsent}</Table.DataCell>
                                    <Table.DataCell>
                                        {emptyReplacement(varsel.kanaler?.join(', '), ENDASH)}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        <Status varsel={varsel} />
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
                {sortedData.length > rowsPerPage && (
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        count={Math.ceil(sortedData.length / rowsPerPage)}
                        size="xsmall"
                    />
                )}
            </VStack>
        </Card>
    );
};
