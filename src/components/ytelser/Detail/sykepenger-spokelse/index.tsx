import { Accordion, Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { Utbetalingsperiode, Utbetalingsperioder } from 'src/generated/modiapersonoversikt-api';
import { datoEllerTomString, formaterDato, prosentEllerNull } from 'src/utils/string-utils';

const SykpengerPerioder = ({ ytelse }: { ytelse: Utbetalingsperioder }) => {
    if (ytelse.utbetaltePerioder.length === 0) return <></>;

    const getEntries = (periode: Utbetalingsperiode) => {
        return {
            'Fra og med': formaterDato(periode.fom),
            'Til og med': formaterDato(periode.tom),
            Grad: prosentEllerNull(periode.grad)
        };
    };

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Perioder
            </Heading>
            <Accordion size="small">
                {ytelse.utbetaltePerioder.map((periode, index) => {
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

export const SykePengerSpokelseDetails = ({ ytelse }: { ytelse: Utbetalingsperioder }) => {
    return (
        <VStack gap="2" minHeight="0">
            <ErrorBoundary boundaryName="sykePengerDetails">
                <Card padding="4">
                    <Heading as="h4" size="small">
                        Om sykpenger
                    </Heading>
                </Card>
                <SykpengerPerioder ytelse={ytelse} />
            </ErrorBoundary>
        </VStack>
    );
};
