import { ChevronDownDoubleIcon, ChevronUpDoubleIcon } from '@navikt/aksel-icons';
import { Accordion, Button, Heading, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import { useMemo, useState } from 'react';
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

interface UtbetalingMedPeriode {
    category: string;
    array: Utbetaling[];
}

const AarAccordion = ({ aar }: { aar: GroupedArray<UtbetalingMedPeriode>[number] }) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const isClosed = useMemo(() => openItems.size < aar.array.length, [openItems, aar]);

    const toggleItem = (category: string, isOpen: boolean) => {
        setOpenItems((prev) => {
            const next = new Set(prev);
            if (isOpen) {
                next.add(category);
                trackVisDetaljvisning('utbetalinger', 'åpnet periode');
            } else {
                next.delete(category);
                trackVisDetaljvisning('utbetalinger', 'lukket periode');
            }
            return next;
        });
    };
    const toggleAllePerioder = () => {
        if (isClosed) {
            setOpenItems(new Set(aar.array.map((p) => p.category)));
        } else {
            setOpenItems(new Set());
        }
    };

    return (
        <VStack key={aar.category}>
            <HStack justify="space-between">
                <Heading size="xsmall" level="3" spacing>
                    {aar.category}
                </Heading>
                <Button
                    size="xsmall"
                    variant="tertiary"
                    icon={isClosed ? <ChevronUpDoubleIcon aria-hidden /> : <ChevronDownDoubleIcon aria-hidden />}
                    onClick={toggleAllePerioder}
                >
                    {isClosed ? 'Åpne alle' : 'Lukk alle'}
                </Button>
            </HStack>
            <Accordion>
                {aar.array.map((periode) => (
                    <Accordion.Item
                        key={periode.category}
                        open={openItems.has(periode.category)}
                        onOpenChange={(isOpen) => toggleItem(periode.category, isOpen)}
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
    );
};

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

    return utbetalingerGruppertPaAar.map((aar) => <AarAccordion key={aar.category} aar={aar} />);
};
