import { Accordion, Heading, InlineMessage, VStack } from '@navikt/ds-react';
import { UtbetalingerTabell } from 'src/components/Utbetaling/UtbetalingerTabell';
import {
    formaterNOK,
    maanedOgAarForUtbetaling,
    summertNettobelopFraUtbetalinger,
    useFilterUtbetalinger,
    utbetalingDatoComparator
} from 'src/components/Utbetaling/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { type GroupedArray, groupArray } from 'src/utils/groupArray';

export const PeriodeAccordions = () => {
    const { data } = useFilterUtbetalinger();

    const utbetalingerGruppertPaaMaaned: GroupedArray<Utbetaling> = groupArray(
        data.utbetalinger.sort(utbetalingDatoComparator),
        maanedOgAarForUtbetaling
    );

    const utbetalingerGruppertPaAar = groupArray(
        utbetalingerGruppertPaaMaaned,
        (gruppe) => gruppe.category.split(' ')[1]
    );

    return utbetalingerGruppertPaAar.map((aar) => (
        <VStack key={aar.category}>
            <Heading size="xsmall" level="3" spacing>
                {aar.category}
            </Heading>
            <Accordion>
                {aar.array.map((periode) => (
                    <Accordion.Item key={periode.category}>
                        <Accordion.Header>{periode.category}</Accordion.Header>
                        <Accordion.Content className="overflow-x-auto">
                            <VStack gap="4">
                                <UtbetalingerTabell utbetalinger={periode.array} />
                                <InlineMessage size="small" className="px-2" status="success">
                                    Totalt for {periode.category}:{' '}
                                    {formaterNOK(summertNettobelopFraUtbetalinger(periode.array))}
                                </InlineMessage>
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </VStack>
    ));
};
