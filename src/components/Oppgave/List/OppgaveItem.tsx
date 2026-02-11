import { Detail, HStack, Label, Link, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import { getOppgaveId } from 'src/components/Oppgave/List/utils';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import { formatterDato } from 'src/utils/date-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/oppgaver');

export const OppgaveItem = ({ oppgave }: { oppgave: OppgaveDto }) => {
    const { data: gsakTema } = useGsakTema();
    const tema = gsakTema.find((item) => item.kode === oppgave.tema);
    const oppgaveTyper = tema?.oppgavetyper ?? [];
    const oppgavetype = oppgaveTyper.find((o) => o.kode === oppgave.oppgavetype);
    const aktivOppgaveId = routeApi.useSearch().id;
    const navigate = routeApi.useNavigate();
    const id = getOppgaveId(oppgave);
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (aktivOppgaveId === id) {
            linkRef.current?.focus();
        }
    }, [aktivOppgaveId, oppgave.oppgaveId]);

    const onClick = () => {
        navigate({
            search: { id },
            state: {
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'oppgaver', tekst: 'vis oppgave' }
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
