import { Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { PensjonSak } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

const PensjonSak = ({ pensjon }: { pensjon: PensjonSak }) => {
    const entries = {
        'Fra og med': pensjon.fomDato ? formaterDato(pensjon.fomDato) : '',
        'Til og med': pensjon.tomDato ? formaterDato(pensjon.tomDato) : '',
        Type: pensjon.sakType ?? '',
        Status: pensjon.sakStatus ?? '',
        Enhet: pensjon.enhetsId ?? ''
    };

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Om pensjon
            </Heading>
            <TitleValuePairsComponent entries={entries} columns={{ xs: 2, lg: 4 }} />
        </Card>
    );
};

export const PensjonDetails = ({ pensjon }: { pensjon: PensjonSak }) => {
    return (
        <VStack gap="2" minHeight="0">
            <ErrorBoundary boundaryName="pensjonDetails">
                <PensjonSak pensjon={pensjon} />
            </ErrorBoundary>
        </VStack>
    );
};
