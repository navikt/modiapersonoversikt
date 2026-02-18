import { Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { PensjonSak } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

export const PensjonDetails = ({ pensjon }: { pensjon: PensjonSak }) => {
    const entries = {
        'Fra og med': pensjon.fomDato ? formaterDato(pensjon.fomDato) : '',
        'Til og med': pensjon.tomDato ? formaterDato(pensjon.tomDato) : '',
        Type: pensjon.sakType ?? '',
        Status: pensjon.sakStatus ?? '',
        Enhet: pensjon.enhetsId ?? ''
    };

    return (
        <VStack>
            <Card padding="4">
                <Heading as="h4" size="small">
                    Om pensjon
                </Heading>
                <TitleValuePairsComponent entries={entries} columns={{ xs: 2, lg: 4 }} />
            </Card>
        </VStack>
    );
};
