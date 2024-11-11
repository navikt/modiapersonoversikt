import React, { useState } from 'react';
import { Alert, Box, HGrid, Heading, Loader, Page, Search, Table } from '@navikt/ds-react';
import { formaterNOK } from '../personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import { useQueryParams } from '../../utils/url-utils';
import { useHistory } from 'react-router';
import { $api } from 'src/lib/clients/modiapersonoversikt-api';
import { FetchError } from 'src/api/api';

const InnkrevingsKravDetaljer = ({ kravId }: { kravId: string }) => {
    const { data, isLoading, error } = $api.useQuery('get', '/rest/innkrevingskrav/{innkrevingskravId}', {
        params: { path: { innkrevingskravId: kravId } }
    });

    return (
        <>
            {isLoading && <Loader />}
            {error && <Alert variant={'error'}>{(error as FetchError).message}</Alert>}
            {data && (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Kravtype</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Opprinnelig beløp</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Gjenstående beløp</Table.HeaderCell>
                        </Table.Row>

                        {data.krav.map((krav) => (
                            <Table.Row>
                                <Table.DataCell>{krav.kravType}</Table.DataCell>
                                <Table.DataCell>{formaterNOK(krav.opprinneligBeløp)}</Table.DataCell>
                                <Table.DataCell>
                                    {krav.gjenståendeBeløp ? formaterNOK(krav.gjenståendeBeløp) : '-'}
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Header>
                </Table>
            )}
        </>
    );
};

const InnkrevingskravSide = () => {
    const { kravId } = useQueryParams<{ kravId?: string }>();
    const [nyKravId, setNyKravId] = useState<string | undefined>(kravId);

    const history = useHistory();
    const setKravId = (clear?: boolean) => history.replace({ search: `?kravId=${clear ? '' : nyKravId}` });

    return (
        <Page style={{ width: '100%', height: '100%' }}>
            <Page.Block as="header" gutters>
                <Heading size="large">Innkrevingskrav</Heading>
            </Page.Block>
            <Box as="main" padding="4" paddingBlock="8">
                <HGrid gap="6" columns="1fr 4fr">
                    <Box borderWidth="1" borderRadius="medium" padding="4">
                        <form
                            role="search"
                            onSubmit={(event) => {
                                event.preventDefault();
                                setKravId();
                            }}
                        >
                            <Search
                                placeholder="Krav-ID"
                                label="Søk etter innkrevingskrav"
                                hideLabel={false}
                                variant="secondary"
                                value={nyKravId}
                                onChange={setNyKravId}
                                onClear={() => {
                                    setKravId(true);
                                }}
                            />
                        </form>
                    </Box>
                    <Box background="surface-subtle" padding="4" borderWidth="1" borderRadius="medium">
                        {!kravId ? (
                            <Alert variant="info">Skriv inn en krav ID</Alert>
                        ) : (
                            <InnkrevingsKravDetaljer kravId={kravId} />
                        )}
                    </Box>
                </HGrid>
            </Box>
        </Page>
    );
};

export default InnkrevingskravSide;
