import { createLazyFileRoute } from '@tanstack/react-router';
import OversiktNy from 'src/components/oversikt/OversiktNy';

export const Route = createLazyFileRoute('/new/person/oversikt')({
    component: OversiktNy
});
