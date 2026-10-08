import { Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { PerioderMedGradTable } from 'src/components/ytelser/Detail/PerioderMedGradTable';
import type { SykepengerSpokelse } from 'src/generated/modiapersonoversikt-api';

const SykpengerPerioder = ({ ytelse }: { ytelse: SykepengerSpokelse }) => {
    if (ytelse.utbetaltePerioder.length === 0) return <></>;

    return (
        <>
            <Heading as="h3" size="xsmall">
                Perioder
            </Heading>
            <PerioderMedGradTable perioder={ytelse.utbetaltePerioder} />
        </>
    );
};

export const SykePengerSpokelseDetails = ({ ytelse }: { ytelse: SykepengerSpokelse }) => {
    return (
        <VStack gap="space-4" minHeight="0">
            <Card padding="space-16">
                <Heading level="4" size="small" spacing>
                    Sykepenger fra Speil
                </Heading>
                <SykpengerPerioder ytelse={ytelse} />
            </Card>
        </VStack>
    );
};
