import { ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import Card from 'src/components/Card';
import { getOppgaveId } from 'src/components/Oppgave/List/utils';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';

const routeApi = getRouteApi('/new/person/oppgaver');

export const OppgaveItem = ({
    oppgave,
    handleClick
}: {
    oppgave: OppgaveDto;
    handleClick: (id: string) => void;
}) => {
    const { data: gsakTema } = useGsakTema();
    const tema = gsakTema.find((item) => item.kode === oppgave.tema);
    const oppgaveTyper = tema?.oppgavetyper ?? [];
    const oppgavetype = oppgaveTyper.find((o) => o.kode === oppgave.oppgavetype);
    const aktivOppgaveId = routeApi.useSearch().id;
    const id = getOppgaveId(oppgave);
    return (
        <Card
            padding="2"
            className={`cursor-pointer hover:hover:bg-ax-bg-neutral-moderate-hover group
                ${aktivOppgaveId === id ? 'bg-ax-bg-neutral-moderate ' : ''}`}
            onClick={() => handleClick(id)}
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
