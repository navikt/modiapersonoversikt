import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import usePrinter from 'src/components/Print/usePrinter';
import {
    fargePaBelop,
    formaterNOK,
    getAlleYtelseTyper,
    summertBruttobelopFraUtbetalinger,
    summertNettobelopFraUtbetalinger,
    summertSkattBelopFraUtbetalinger,
    summertTrekkBelopFraUtbetalinger,
    useFilterUtbetalinger
} from 'src/components/Utbetaling/utils';
import { formaterPeriode } from 'src/components/ytelser/utils';

export const TotaltForPeriode = () => {
    const { data } = useFilterUtbetalinger();
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;
    return (
        <VStack>
            <Heading size="xsmall" level="3" spacing>
                Totalt utbetalt for valgt periode
            </Heading>

            <VStack gap="space-8">
                <PrinterWrapper>
                    <BodyShort size="medium" className="print-only font-ax-bold">
                        Totalt utbetalt for periode:{' '}
                        {formaterPeriode({
                            fra: data.periode?.startDato,
                            til: data.periode?.sluttDato
                        })}
                    </BodyShort>
                    <Card
                        className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell"
                        padding="space-16"
                    >
                        <VStack gap="space-16">
                            <HStack gap="space-24" justify="space-between">
                                <HStack gap="space-8" justify="space-between" flexGrow="1">
                                    <VStack gap="space-8">
                                        <BodyShort weight="semibold">Detaljer</BodyShort>
                                        <BodyShort>{getAlleYtelseTyper(data.utbetalinger).join(', ')}</BodyShort>{' '}
                                    </VStack>
                                    <HStack justify="space-between" flexGrow="1">
                                        <VStack gap="space-8">
                                            <BodyShort weight="semibold">Brutto</BodyShort>
                                            <BodyShort>
                                                {formaterNOK(summertBruttobelopFraUtbetalinger(data.utbetalinger))}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="space-8">
                                            <BodyShort weight="semibold">Skattetrekk</BodyShort>
                                            <BodyShort
                                                className={fargePaBelop(
                                                    summertSkattBelopFraUtbetalinger(data.utbetalinger)
                                                )}
                                            >
                                                {formaterNOK(summertSkattBelopFraUtbetalinger(data.utbetalinger))}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="space-8">
                                            <BodyShort weight="semibold">Trekk</BodyShort>
                                            <BodyShort
                                                className={fargePaBelop(
                                                    summertTrekkBelopFraUtbetalinger(data.utbetalinger)
                                                )}
                                            >
                                                {formaterNOK(summertTrekkBelopFraUtbetalinger(data.utbetalinger))}
                                            </BodyShort>
                                        </VStack>
                                        <VStack gap="space-8">
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
                                </HStack>
                            </HStack>
                        </VStack>
                    </Card>
                </PrinterWrapper>
                <VStack align="start">
                    <Button
                        size="small"
                        onClick={() => {
                            printer.triggerPrint();
                        }}
                        variant="tertiary"
                        icon={<PrinterSmallIcon aria-hidden />}
                    >
                        Skriv ut
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    );
};
