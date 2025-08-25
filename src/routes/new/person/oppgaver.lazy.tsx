import { createLazyFileRoute } from '@tanstack/react-router';
import { OppgaverPage } from 'src/components/Oppgave';

export const Route = createLazyFileRoute('/new/person/oppgaver')({
    component: OppgaverPage
});
