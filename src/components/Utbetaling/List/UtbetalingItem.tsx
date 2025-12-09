import { ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';
import { Link, getRouteApi } from '@tanstack/react-router';
import Card from 'src/components/Card';
import { formaterNOK, getUtbetalingId } from 'src/components/Utbetaling/List/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import { formatterDato } from 'src/utils/date-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/utbetaling');

export const UtbetalingItem = ({
    utbetaling
}: {
    utbetaling: Utbetaling;
}) => {
    const aktivUtbetaling = routeApi.useSearch().id;
    const id = getUtbetalingId(utbetaling);

    return (
        <Link
            to="/new/person/utbetaling"
            search={{ id: id }}
            state={{
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'utbetaling', tekst: 'åpne utbetaling' }
                }
            }}
        >
            <Card
                padding="2"
                as="li"
                className={twMerge(
                    'cursor-pointer hover:bg-[var(--ax-bg-accent-moderate-hover)] group',
                    aktivUtbetaling === id && 'bg-ax-bg-accent-moderate-pressed border-ax-bg-accent-moderate-pressed'
                )}
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
                    <VStack justify="center">
                        <ChevronRightIcon
                            aria-hidden
                            fontSize="1.5rem"
                            className="translate-x-0 group-hover:translate-x-1 transition-transform"
                        />
                    </VStack>
                </HStack>
            </Card>
        </Link>
    );
};
