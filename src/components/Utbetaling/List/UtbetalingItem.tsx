import { ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import Card from 'src/components/Card';
import { formaterNOK, getUtbetalingId } from 'src/components/Utbetaling/List/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';

const routeApi = getRouteApi('/new/person/utbetaling');

export const UtbetalingItem = ({
    utbetaling,
    handleClick
}: {
    utbetaling: Utbetaling;
    handleClick: (id: string) => void;
}) => {
    const aktivUtbetaling = routeApi.useSearch().id;
    const id = getUtbetalingId(utbetaling);
    return (
        <Card
            padding="2"
            className={`cursor-pointer hover:hover:bg-ax-bg-neutral-moderate-hover group
                ${aktivUtbetaling === id ? 'bg-ax-bg-neutral-moderate ' : ''}`}
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
                    name="Åpne"
                    aria-label="Åpne"
                    icon={<ChevronRightIcon className="translate-x-0 group-hover:translate-x-1 transition-transform" />}
                />
            </HStack>
        </Card>
    );
};
