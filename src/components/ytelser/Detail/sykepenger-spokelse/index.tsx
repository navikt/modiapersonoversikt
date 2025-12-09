import { Accordion, Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { SykpengerVedtak, Utbetalingsperiode } from 'src/generated/modiapersonoversikt-api';
import { datoEllerTomString, formaterDato, prosentEllerNull } from 'src/utils/string-utils';

const getSykpengerVedtakEntries = (ytelse: SykpengerVedtak) => {
    return {
        Vedtaksreferanse: ytelse.vedtaksreferanse,
        Vedtaksdato: ytelse.vedtattTidspunkt ? formaterDato(ytelse.vedtattTidspunkt) : 'Ukjent vedtaksdato'
    };
};

const SykpengerPerioder = ({ ytelse }: { ytelse: SykpengerVedtak }) => {
    if (ytelse.utbetalinger.length === 0) return <></>;

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
                {ytelse.utbetalinger.map((periode, index) => {
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

export const SykePengerSpokelseDetails = ({ ytelse }: { ytelse: SykpengerVedtak }) => {
    return (
        <VStack gap="2" minHeight="0">
            <ErrorBoundary boundaryName="sykePengerDetails">
                <Card padding="4">
                    <Heading as="h4" size="small">
                        Om sykpenger fra spokelse
                    </Heading>
                    <TitleValuePairsComponent entries={getSykpengerVedtakEntries(ytelse)} />
                </Card>
                <SykpengerPerioder ytelse={ytelse} />
            </ErrorBoundary>
        </VStack>
    );
};
