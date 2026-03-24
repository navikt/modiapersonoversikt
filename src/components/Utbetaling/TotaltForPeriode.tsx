import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Accordion, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import usePrinter from 'src/components/Print/usePrinter';
import {
    fargePaBelop,
    formaterNOK,
    getAlleYtelseTyper,
    summertBruttobelopFraUtbetalinger,
    summertNettobelopFraUtbetalinger,
    summertTrekkOgSkattBelopFraUtbetalinger,
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
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>Totalt for perioden</Accordion.Header>
                    <Accordion.Content>
                        <VStack gap="space-8">
                            <PrinterWrapper>
                                <BodyShort size="small">
                                    Periode:{' '}
                                    {formaterPeriode({
                                        fra: data.periode?.startDato,
                                        til: data.periode?.sluttDato
                                    })}
                                </BodyShort>
                                <Card
                                    className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell"
                                    padding="4"
                                >
                                    <VStack gap="4">
                                        <HStack gap="space-24" justify="space-between">
                                            <HStack gap="2" justify="space-between" flexGrow="1">
                                                <VStack gap="2">
                                                    <BodyShort weight="semibold">Detaljer</BodyShort>
                                                    <BodyShort>
                                                        {getAlleYtelseTyper(data.utbetalinger).join(', ')}
                                                    </BodyShort>{' '}
                                                </VStack>
                                                <HStack justify="space-between" flexGrow="1">
                                                    <VStack gap="2">
                                                        <BodyShort weight="semibold">Brutto</BodyShort>
                                                        <BodyShort>
                                                            {formaterNOK(
                                                                summertBruttobelopFraUtbetalinger(data.utbetalinger)
                                                            )}
                                                        </BodyShort>
                                                    </VStack>
                                                    <VStack gap="2">
                                                        <BodyShort weight="semibold">Trekk og skatt</BodyShort>
                                                        <BodyShort
                                                            className={fargePaBelop(
                                                                summertTrekkOgSkattBelopFraUtbetalinger(
                                                                    data.utbetalinger
                                                                )
                                                            )}
                                                        >
                                                            {formaterNOK(
                                                                summertTrekkOgSkattBelopFraUtbetalinger(
                                                                    data.utbetalinger
                                                                )
                                                            )}
                                                        </BodyShort>
                                                    </VStack>
                                                    <VStack gap="2">
                                                        <BodyShort weight="semibold">Totalt</BodyShort>
                                                        <BodyShort
                                                            className={fargePaBelop(
                                                                summertNettobelopFraUtbetalinger(data.utbetalinger)
                                                            )}
                                                        >
                                                            {formaterNOK(
                                                                summertNettobelopFraUtbetalinger(data.utbetalinger)
                                                            )}
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
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VStack>
    );
};
