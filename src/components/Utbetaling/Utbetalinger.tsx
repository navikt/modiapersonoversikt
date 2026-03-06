import { Box, InlineMessage, VStack } from '@navikt/ds-react';
import { PeriodeAccordions } from 'src/components/Utbetaling/PeriodeAccordions';
import { TotaltForPeriode } from 'src/components/Utbetaling/TotaltForPeriode';
import { useFilterUtbetalinger } from 'src/components/Utbetaling/utils';

export const Utbetalinger = () => {
    const { data } = useFilterUtbetalinger();

    if (data.utbetalinger.length === 0) {
        return (
            <Box.New paddingBlock="4">
                <InlineMessage status="info" aria-live="polite">
                    Ingen resultat
                </InlineMessage>
            </Box.New>
        );
    }
    return (
        <VStack gap="8">
            <TotaltForPeriode />
            <PeriodeAccordions />
        </VStack>
    );
};
