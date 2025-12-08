import { ChevronRightIcon, CircleSlashIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';
import { Link, getRouteApi } from '@tanstack/react-router';
import Card from 'src/components/Card';
import { getSakId } from 'src/components/saker/utils';
import type { SaksDokumenter } from 'src/generated/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import { formatterDato } from 'src/utils/date-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/saker');

export const SakItem = ({
    sak
}: {
    sak: SaksDokumenter;
}) => {
    const aktivSakId = routeApi.useSearch().id;
    const id = getSakId(sak);

    return (
        <Link
            to="/new/person/saker"
            search={{ id }}
            state={{
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'saker', tekst: 'åpne sak' }
                }
            }}
        >
            <Card
                padding="2"
                className={twMerge(
                    'cursor-pointer hover:bg-[var(--ax-bg-accent-moderate-hover)] group',
                    aktivSakId === id && 'bg-ax-bg-accent-moderate-pressed border-ax-bg-accent-moderate-pressed'
                )}
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
                    <VStack justify="center">
                        {sak.harTilgang ? (
                            <ChevronRightIcon
                                aria-hidden
                                fontSize="1.5rem"
                                className="translate-x-0 group-hover:translate-x-1 transition-transform"
                            />
                        ) : (
                            <CircleSlashIcon title="Du har ikke tema tilgang" fontSize="1rem" />
                        )}
                    </VStack>
                </HStack>
            </Card>
        </Link>
    );
};
