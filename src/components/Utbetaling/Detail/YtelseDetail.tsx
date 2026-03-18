import { BodyShort, Heading, HStack, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { BruttoTabell } from 'src/components/Utbetaling/Detail/BruttoTabell';
import { SkattTabell } from 'src/components/Utbetaling/Detail/SkattTabell';
import { TrekkTabell } from 'src/components/Utbetaling/Detail/TrekkTabell';
import { fargePaBelop, formaterNOK } from 'src/components/Utbetaling/utils';
import { formaterPeriode } from 'src/components/ytelser/utils';
import type { Ytelse } from 'src/generated/modiapersonoversikt-api';
import { twMerge } from 'tailwind-merge';

export const YtelseDetail = ({ ytelse }: { ytelse: Ytelse }) => (
    <VStack gap="space-8">
        <VStack>
            <Heading size="xsmall" level="4">
                Utbetaling {ytelse.type}
            </Heading>
            <BodyShort size="small">
                Periode: {formaterPeriode({ fra: ytelse.periode?.start, til: ytelse.periode?.slutt })}
            </BodyShort>
        </VStack>
        <Card className="bg-ax-bg-neutral-soft rounded-(--ax-radius-8) utbetalinger-tabell" padding="2">
            <BruttoTabell ytelse={ytelse} />
            <TrekkTabell ytelse={ytelse} />
            <SkattTabell ytelse={ytelse} />
        </Card>
        <Card
            className={twMerge(
                'rounded-(--ax-radius-8) utbetalinger-tabell',
                ytelse.nettobelop < 0 ? 'bg-ax-bg-danger-soft' : 'bg-ax-bg-success-soft'
            )}
            padding="2"
        >
            <HStack align="stretch" justify="space-between" paddingInline="space-8">
                <Heading size="xsmall">Totalt</Heading>
                <BodyShort className={fargePaBelop(ytelse.nettobelop)}>{formaterNOK(ytelse.nettobelop)}</BodyShort>
            </HStack>
        </Card>
    </VStack>
);
