import { Accordion, BodyShort, Heading, HStack, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import {
    fargePaBelop,
    formaterNOK,
    getAlleYtelseTyper,
    summertBruttobelopFraUtbetalinger,
    summertNettobelopFraUtbetalinger,
    summertTrekkOgSkattBelopFraUtbetalinger,
    useFilterUtbetalinger
} from 'src/components/Utbetaling/utils';

export const TotaltForPeriode = () => {
    const { data } = useFilterUtbetalinger();
    return (
        <VStack>
            <Heading size="xsmall" level="3" spacing>
                Totalt utbetalt for valgt periode
            </Heading>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>Totalt for perioden</Accordion.Header>
                    <Accordion.Content>
                        <Card className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell" padding="4">
                            <VStack gap="4">
                                <HStack justify="space-between">
                                    <VStack gap="2">
                                        <BodyShort weight="semibold">Detaljer</BodyShort>
                                        <BodyShort>
                                            {getAlleYtelseTyper(data.utbetalinger).map((type, i) => (
                                                <>
                                                    {i === getAlleYtelseTyper(data.utbetalinger).length - 1
                                                        ? type
                                                        : `${type}, `}
                                                </>
                                            ))}
                                        </BodyShort>
                                    </VStack>
                                    <VStack gap="2">
                                        <BodyShort weight="semibold">Brutto</BodyShort>
                                        <BodyShort>
                                            {formaterNOK(summertBruttobelopFraUtbetalinger(data.utbetalinger))}
                                        </BodyShort>
                                    </VStack>
                                    <VStack gap="2">
                                        <BodyShort weight="semibold">Trekk og skatt</BodyShort>
                                        <BodyShort
                                            className={fargePaBelop(
                                                summertTrekkOgSkattBelopFraUtbetalinger(data.utbetalinger)
                                            )}
                                        >
                                            {formaterNOK(summertTrekkOgSkattBelopFraUtbetalinger(data.utbetalinger))}
                                        </BodyShort>
                                    </VStack>
                                    <VStack gap="2">
                                        <BodyShort weight="semibold">Totalt</BodyShort>
                                        <BodyShort
                                            className={fargePaBelop(
                                                summertNettobelopFraUtbetalinger(data.utbetalinger)
                                            )}
                                        >
                                            {formaterNOK(summertNettobelopFraUtbetalinger(data.utbetalinger))}
                                        </BodyShort>
                                    </VStack>
                                </HStack>
                            </VStack>
                        </Card>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VStack>
    );
};
