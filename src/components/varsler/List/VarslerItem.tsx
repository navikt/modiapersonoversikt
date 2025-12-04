import { CheckmarkCircleFillIcon, ChevronRightIcon, ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import Card from 'src/components/Card';
import type { VarselData } from 'src/components/varsler/List/utils';
import { formaterDato } from 'src/utils/string-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/varsler');

export const VarslerItem = ({
    varsel,
    handleClick
}: {
    varsel: VarselData;
    handleClick: (id: string) => void;
}) => {
    const aktivVarsel = routeApi.useSearch().id;
    return (
        <Card
            padding="2"
            className={twMerge(
                'cursor-pointer hover:bg-[var(--ax-bg-accent-moderate-hover)] group',
                aktivVarsel === varsel.eventId &&
                    'bg-ax-bg-accent-moderate-pressed border-ax-bg-accent-moderate-pressed'
            )}
            onClick={() => handleClick(varsel.eventId)}
            as="li"
        >
            <HStack justify="space-between" gap="1" wrap={false}>
                <VStack justify="center" gap="1">
                    <Heading size="xsmall" as="h3" level="3">
                        {varsel.tittel}
                    </Heading>
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Varsel datoer:
                        </BodyShort>
                        <BodyShort size="small">{varsel.datoer.map(formaterDato).join(', ')}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Status:
                        </BodyShort>
                        {varsel.harFeilteVarsel ? (
                            <ExclamationmarkTriangleFillIcon fontSize="1.5rem" title="Har feil" />
                        ) : (
                            <CheckmarkCircleFillIcon fontSize="1.5rem" title="Ok" />
                        )}
                    </HStack>
                </VStack>
                <Button
                    variant="tertiary-neutral"
                    size="small"
                    name="Åpne"
                    aria-label="Åpne"
                    icon={
                        <ChevronRightIcon
                            aria-hidden
                            className="translate-x-0 group-hover:translate-x-1 transition-transform"
                        />
                    }
                />
            </HStack>
        </Card>
    );
};
