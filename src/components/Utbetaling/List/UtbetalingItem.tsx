import { ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import Card from 'src/components/Card';
import { formaterNOK, getUtbetalingId } from 'src/components/Utbetaling/List/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/utbetaling');

export const UtbetalingItem = ({
    utbetaling,
    handleClick,
    inRoute = true
}: {
    utbetaling: Utbetaling;
    handleClick: (id: string) => void;
    inRoute?: boolean;
}) => {
    const aktivUtbetaling = inRoute ? routeApi.useSearch().id : undefined;
    const id = getUtbetalingId(utbetaling);
    return (
        <Card
            padding="2"
            className={twMerge(
                'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)] group',
                aktivUtbetaling === id && 'bg-[var(--ax-bg-neutral-moderate)] border-[var(--ax-border-neutral-strong)]'
            )}
            onClick={() => handleClick(id)}
        >
            <HStack justify="space-between" gap="1" wrap={false}>
                <VStack justify="center" gap="1">
                    <Heading size="xsmall" as="h3" level="3">
                        {utbetaling.ytelser
                            ?.map((item) => item.type)
                            ?.unique()
                            .join(', ')}
                    </Heading>
                    <BodyShort size="small">{formaterNOK(utbetaling.nettobelop)}</BodyShort>
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Forfallsdato:
                        </BodyShort>
                        <BodyShort size="small">
                            {utbetaling.forfallsdato ? formatterDato(utbetaling.forfallsdato) : ''}
                        </BodyShort>
                    </HStack>
                    <BodyShort size="small" textColor="subtle">
                        {utbetaling.status}
                    </BodyShort>
                </VStack>
                <Button
                    variant="tertiary-neutral"
                    size="small"
                    icon={<ChevronRightIcon className="translate-x-0 group-hover:translate-x-1 transition-transform" />}
                />
            </HStack>
        </Card>
    );
};
