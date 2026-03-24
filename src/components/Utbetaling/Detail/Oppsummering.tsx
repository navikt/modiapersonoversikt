import { BodyShort, Detail, Heading, HStack, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import {
    fargePaBelop,
    formaterNOK,
    getBruttoSumYtelser,
    getTrekkOgSkattSumYtelser
} from 'src/components/Utbetaling/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';

export const Oppsummering = ({ utbetaling }: { utbetaling: Utbetaling }) => (
    <VStack gap="space-8">
        <Heading size="xsmall" level="4">
            Oppsummering av utbetalingen
        </Heading>
        <Card className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell" padding="space-8">
            <VStack gap="space-16">
                <HStack justify="space-between" padding="space-8">
                    <VStack gap="space-8">
                        <BodyShort weight="semibold">Kontonummer</BodyShort>
                        <BodyShort>{utbetaling.konto}</BodyShort>
                    </VStack>
                    <VStack gap="space-8">
                        <BodyShort weight="semibold">Brutto</BodyShort>
                        <BodyShort>{formaterNOK(getBruttoSumYtelser(utbetaling.ytelser))}</BodyShort>
                    </VStack>
                    <VStack gap="space-8">
                        <BodyShort weight="semibold">Trekk og skatt</BodyShort>
                        <BodyShort className={fargePaBelop(getTrekkOgSkattSumYtelser(utbetaling.ytelser))}>
                            {formaterNOK(getTrekkOgSkattSumYtelser(utbetaling.ytelser))}
                        </BodyShort>
                    </VStack>
                    <VStack gap="space-8">
                        <BodyShort weight="semibold">Totalt</BodyShort>
                        <BodyShort className={fargePaBelop(utbetaling.nettobelop)}>
                            {formaterNOK(utbetaling.nettobelop)}
                        </BodyShort>
                    </VStack>
                </HStack>

                <VStack paddingInline="space-8">
                    {utbetaling.melding && (
                        <HStack gap="space-8">
                            <Detail weight="semibold">Melding</Detail>
                            <Detail weight="semibold">{utbetaling.melding}</Detail>
                        </HStack>
                    )}
                    <HStack gap="space-8">
                        <Detail weight="semibold">Utbetalingsmetode:</Detail>
                        <Detail weight="semibold">{utbetaling.metode}</Detail>
                    </HStack>
                </VStack>
            </VStack>
        </Card>
    </VStack>
);
