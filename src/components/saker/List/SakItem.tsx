import { ChevronRightIcon, CircleSlashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import Card from 'src/components/Card';
import { getSakId } from 'src/components/saker/utils';
import type { SaksDokumenter } from 'src/generated/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';

const routeApi = getRouteApi('/new/person/saker');

export const SakItem = ({
    sak,
    handleClick
}: {
    sak: SaksDokumenter;
    handleClick: (id: string) => void;
}) => {
    const aktivSakId = routeApi.useSearch().id;
    const id = getSakId(sak);
    return (
        <Card
            padding="2"
            className={`cursor-pointer hover:hover:bg-ax-bg-neutral-moderate-hover group
                ${aktivSakId === id ? 'bg-ax-bg-neutral-moderate ' : ''}`}
            onClick={() => handleClick(id)}
        >
            <HStack justify="space-between" gap="1" wrap={false}>
                <VStack justify="center" gap="1">
                    <Heading size="xsmall" as="h3" level="3">
                        {sak.temanavn}
                    </Heading>
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            SakID:
                        </BodyShort>
                        <BodyShort size="small">{sak.fagsaksnummer}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Opprettet:
                        </BodyShort>
                        <BodyShort size="small">{sak.opprettet ? formatterDato(sak.opprettet) : ''}</BodyShort>
                    </HStack>
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Status:
                        </BodyShort>
                        <BodyShort size="small">
                            {sak.avsluttet ? `Avsluttet(${formatterDato(sak.avsluttet)})` : 'Åpen'}
                        </BodyShort>
                    </HStack>
                </VStack>
                {sak.harTilgang ? (
                    <Button
                        variant="tertiary-neutral"
                        size="small"
                        name="Åpne"
                        aria-label="Åpne"
                        icon={
                            <ChevronRightIcon className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                        }
                    />
                ) : (
                    <div className="h-4">
                        <CircleSlashIcon title="Du har ikke tema tilgang" fontSize="1rem" />
                    </div>
                )}
            </HStack>
        </Card>
    );
};
