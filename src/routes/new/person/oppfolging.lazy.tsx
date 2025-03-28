import { createLazyFileRoute } from '@tanstack/react-router';
import { OppfolgingPage } from 'src/components/Oppfolging';

export const Route = createLazyFileRoute('/new/person/oppfolging')({
    component: OppfolgingPage
});
