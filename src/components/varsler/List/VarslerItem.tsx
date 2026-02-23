import { CheckmarkCircleIcon, ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { Detail, HStack, Label, Link, Tag, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import type { VarselData } from 'src/components/varsler/List/utils';
import { trackingEvents } from 'src/utils/analytics';
import { formaterDato } from 'src/utils/string-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/varsler');

const Status = ({ varsel }: { varsel: VarselData }) => {
    if (varsel.harFeiledeVarsler) {
        return (
            <Tag title="Varsling feilet" variant="error-moderate" size="xsmall">
                <ExclamationmarkTriangleIcon aria-hidden />
            </Tag>
        );
    }
    return (
        <Tag title="Varsling vellykket" variant="success-moderate" size="xsmall">
            <CheckmarkCircleIcon aria-hidden />
        </Tag>
    );
};

export const VarslerItem = ({ varsel }: { varsel: VarselData }) => {
    const aktivVarsel = routeApi.useSearch().id;
    const navigate = routeApi.useNavigate();
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (aktivVarsel === varsel.eventId) {
            linkRef.current?.focus();
        }
    }, [aktivVarsel, varsel.eventId]);

    const onClick = () => {
        navigate({
            search: { id: varsel.eventId },
            state: {
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'varsler', tekst: 'vis varsel' }
                }
            }
        });
    };

    return (
        <Link
            ref={linkRef}
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
                className={twMerge(
                    'cursor-pointer hover:bg-[var(--ax-bg-accent-moderate-hover)] group',
                    aktivVarsel === varsel.eventId &&
                        'bg-ax-bg-accent-moderate-pressed border-ax-bg-accent-moderate-pressed'
                )}
                as="li"
            >
                <VStack justify="center" gap="1">
                    <HStack wrap={false} justify="space-between" align="start" gap="2">
                        <Label size="small" as="h3">
                            {varsel.tittel}
                        </Label>
                        <Status varsel={varsel} />
                    </HStack>
                    <HStack gap="2">
                        <Detail>Varsel datoer:</Detail>
                        <Detail>{varsel.datoer.map(formaterDato).join(', ')}</Detail>
                    </HStack>
                </VStack>
            </Card>
        </Link>
    );
};
