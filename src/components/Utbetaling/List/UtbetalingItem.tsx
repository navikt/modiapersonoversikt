import { Detail, HStack, Label, Link, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import { formaterNOK, getUtbetalingId } from 'src/components/Utbetaling/List/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import { formatterDato } from 'src/utils/date-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/utbetaling');

export const UtbetalingItem = ({ utbetaling }: { utbetaling: Utbetaling }) => {
    const aktivUtbetaling = routeApi.useSearch().id;
    const navigate = routeApi.useNavigate();
    const id = getUtbetalingId(utbetaling);
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (aktivUtbetaling === id) {
            linkRef.current?.focus();
        }
    }, [aktivUtbetaling, id]);

    const onClick = () => {
        navigate({
            search: { id },
            state: {
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'utbetaling', tekst: 'åpne utbetaling' }
                }
            }
        });
    };

    return (
        <Link
            ref={linkRef}
            data-utbetalingid={id}
            variant="neutral"
            className="hover:no-underline block"
            underline={false}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            tabIndex={0}
            role="link"
            onKeyDown={(e) => {
                if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
                e.preventDefault();
                onClick();
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
