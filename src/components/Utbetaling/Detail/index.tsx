import { VStack } from '@navikt/ds-react';
import { Oppsummering } from 'src/components/Utbetaling/Detail/Oppsummering';
import { YtelseDetail } from 'src/components/Utbetaling/Detail/YtelseDetail';

import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';

export const UtbetalingDetail = ({ utbetaling }: { utbetaling: Utbetaling }) => {
    return (
        <VStack gap="space-32" paddingBlock="space-8">
            <Oppsummering utbetaling={utbetaling} />
            {utbetaling.ytelser.map((ytelse, i) => (
                <YtelseDetail key={`${i}-${ytelse.type}`} ytelse={ytelse} />
            ))}
        </VStack>
    );
};
