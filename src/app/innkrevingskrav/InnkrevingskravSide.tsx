import React from 'react';
import { Alert, Box, Heading, Loader, Page, Search } from '@navikt/ds-react';
import { useQuery } from '@tanstack/react-query';
import { get } from '../../api/api';
import { apiBaseUri } from '../../api/config';

const InnkrevingskravSide = () => {
    const [innkrevingskravId, setInnkrevingskravId] = React.useState('');

    const queryKey = ['innkrevingskrav', innkrevingskravId];

    const { isLoading, error, data } = useQuery({
        queryKey,
        queryFn: () => get(`${apiBaseUri}/innkrevingskrav/${queryKey[1]}`),
        enabled: !!innkrevingskravId
    });

    return (
        <Page style={{ width: '100%', height: '100%' }}>
            <Box>
                <Heading size="large">Innkrevingskrav</Heading>
                <form
                    role="search"
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >
                    <Search
                        placeholder="Skriv inn innkrevingskrav-id"
                        label="Søk etter innkrevingskrav"
                        variant="secondary"
                        onSearchClick={setInnkrevingskravId}
                    />
                </form>
                {isLoading && <Loader />}
                {error && <Alert variant={'error'}>{error.message}</Alert>}
                {data && JSON.stringify(data)}
            </Box>
        </Page>
    );
};

export default InnkrevingskravSide;
