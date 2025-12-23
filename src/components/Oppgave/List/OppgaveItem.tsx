import { Detail, HStack, Label, VStack } from '@navikt/ds-react';
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
                <VStack justify="center">
                    <Label size="small" as="h3">
                        {tema?.tekst ?? 'Ukjent tema'}
                    </Label>
                    <HStack gap="1">
                        <Detail>Oppgavetype:</Detail>
                        <Detail>{oppgavetype?.tekst ?? 'Ukjent oppgavetype'}</Detail>
                    </HStack>
                    <HStack gap="1">
                        <Detail>Forfallsdato:</Detail>
                        <Detail>
                            {oppgave.fristFerdigstillelse ? formatterDato(oppgave.fristFerdigstillelse) : ''}
                        </Detail>
                    </HStack>
                </VStack>
            </Card>
        </Link>
    );
};
