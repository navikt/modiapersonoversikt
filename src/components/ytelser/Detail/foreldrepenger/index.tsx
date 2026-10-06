import { Heading, VStack } from '@navikt/ds-react';
import { capitalize } from 'lodash';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import { PerioderMedGradTable } from 'src/components/ytelser/Detail/PerioderMedGradTable';
import { type Foreldrepenger, ForeldrepengerYtelse } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

const getForeldrePengerEntries = (ytelse: Foreldrepenger) => {
    const perioder = { 'Fra og med': formaterDato(ytelse.fom), 'Til og med': formaterDato(ytelse.tom) };

    return {
        Saksnummer: ytelse.saksnummer,
        Ytelsetype: capitalize(ytelse.ytelse),
        ...(ytelse.ytelse === ForeldrepengerYtelse.ENGANGSST_NAD ? { Dato: formaterDato(ytelse.fom) } : perioder)
    };
};

const ForeldrepengerPerioder = ({ ytelse }: { ytelse: Foreldrepenger }) => {
    if (ytelse.perioder.length === 0 || ytelse.ytelse === ForeldrepengerYtelse.ENGANGSST_NAD) return <></>;

    return (
        <Card padding="space-16">
            <Heading as="h4" size="small">
                Perioder
            </Heading>
            <PerioderMedGradTable perioder={ytelse.perioder} />
        </Card>
    );
};

export const ForeldrePengerDetails = ({ ytelse }: { ytelse: Foreldrepenger }) => {
    return (
        <VStack gap="space-4" minHeight="0">
            <Card padding="space-16">
                <Heading as="h3" size="small">
                    Om {ytelse.ytelse.toLowerCase()}
                </Heading>
                <TitleValuePairsComponent entries={getForeldrePengerEntries(ytelse)} />
            </Card>
            <ForeldrepengerPerioder ytelse={ytelse} />
        </VStack>
    );
};
