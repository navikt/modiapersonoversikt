import { Accordion, Heading, VStack } from '@navikt/ds-react';
import { capitalize } from 'lodash';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import {
    type Foreldrepenger,
    type ForeldrepengerPeriode,
    ForeldrepengerYtelse
} from 'src/generated/modiapersonoversikt-api';
import { datoEllerTomString, formaterDato, prosentEllerNull } from 'src/utils/string-utils';

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

    const getEntries = (periode: ForeldrepengerPeriode) => {
        return {
            'Fra og med': formaterDato(periode.fom),
            'Til og med': formaterDato(periode.tom),
            Grad: prosentEllerNull(periode.grad)
        };
    };

    return (
        <Card padding="space-16">
            <Heading as="h4" size="small">
                Perioder
            </Heading>
            <Accordion size="small">
                {ytelse.perioder.map((periode, index) => {
                    return (
                        <Accordion.Item key={`${index}-${periode.fom}`}>
                            <Accordion.Header>{`Periode - ${datoEllerTomString(periode.fom)}`}</Accordion.Header>
                            <Accordion.Content>
                                <TitleValuePairsComponent entries={getEntries(periode)} columns={{ xs: 2, md: 3 }} />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
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
