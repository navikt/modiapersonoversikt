import { Detail, HStack, Label, VStack } from '@navikt/ds-react';
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
                <VStack justify="center">
                    <Label size="small" as="h3">
                        {utbetaling.ytelser
                            ?.map((item) => item.type)
                            ?.unique()
                            .join(', ')}
                    </Label>
                    <Detail weight="semibold" title="Kroner utbetalt">
                        {formaterNOK(utbetaling.nettobelop)}
                    </Detail>
                    <HStack gap="1">
                        <Detail>Forfallsdato:</Detail>
                        <Detail>{utbetaling.forfallsdato ? formatterDato(utbetaling.forfallsdato) : ''}</Detail>
                    </HStack>
                    <Detail textColor="subtle">{utbetaling.status}</Detail>
                </VStack>
            </Card>
        </Link>
    );
};
