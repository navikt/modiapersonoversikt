import { ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';
import { Link, getRouteApi } from '@tanstack/react-router';
import Card from 'src/components/Card';
import { getOppgaveId } from 'src/components/Oppgave/List/utils';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import { formatterDato } from 'src/utils/date-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/oppgaver');

export const OppgaveItem = ({
    oppgave
}: {
    oppgave: OppgaveDto;
}) => {
    const { data: gsakTema } = useGsakTema();
    const tema = gsakTema.find((item) => item.kode === oppgave.tema);
    const oppgaveTyper = tema?.oppgavetyper ?? [];
    const oppgavetype = oppgaveTyper.find((o) => o.kode === oppgave.oppgavetype);
    const aktivOppgaveId = routeApi.useSearch().id;
    const id = getOppgaveId(oppgave);

    return (
        <Link
            to="/new/person/oppgaver"
            search={{ id }}
            state={{
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'oppgaver', tekst: 'vis oppgave' }
                }
            }}
        >
            <Card
                padding="2"
                className={twMerge(
                    'cursor-pointer hover:bg-[var(--ax-bg-accent-moderate-hover)] group',
                    aktivOppgaveId === id && 'bg-ax-bg-accent-moderate-pressed border-ax-bg-accent-moderate-pressed'
                )}
                as="li"
            >
                <HStack justify="space-between" gap="1" wrap={false}>
                    <VStack justify="center" gap="1">
                        <Heading size="xsmall" as="h3" level="3">
                            {tema?.tekst ?? 'Ukjent tema'}
                        </Heading>
                        <HStack gap="2">
                            <BodyShort size="small" weight="semibold">
                                Oppgavetype:
                            </BodyShort>
                            <BodyShort size="small">{oppgavetype?.tekst ?? 'Ukjent oppgavetype'}</BodyShort>
                        </HStack>
                        <HStack gap="2">
                            <BodyShort size="small" weight="semibold">
                                Forfallsdato:
                            </BodyShort>
                            <BodyShort size="small">
                                {oppgave.fristFerdigstillelse ? formatterDato(oppgave.fristFerdigstillelse) : ''}
                            </BodyShort>
                        </HStack>
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
