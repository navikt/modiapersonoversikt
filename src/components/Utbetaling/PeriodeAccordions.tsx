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
import { trackVisDetaljvisning } from 'src/utils/analytics';
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
                    <Accordion.Item
                        key={periode.category}
                        onOpenChange={(isOpen) => {
                            if (isOpen) {
                                trackVisDetaljvisning('utbetalinger', 'åpnet periode');
                            } else {
                                trackVisDetaljvisning('utbetalinger', 'lukket periode');
                            }
                        }}
                    >
                        <Accordion.Header>{periode.category}</Accordion.Header>
                        <Accordion.Content className="overflow-x-auto">
                            <VStack gap="space-16">
                                <UtbetalingerTabell utbetalinger={periode.array} />
                                <InlineMessage
                                    size="small"
                                    className="px-2"
                                    status={summertNettobelopFraUtbetalinger(periode.array) >= 0 ? 'success' : 'error'}
                                >
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
