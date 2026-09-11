import { createLazyFileRoute } from '@tanstack/react-router';
import Oversikt from 'src/components/oversikt/Oversikt';

export const Route = createLazyFileRoute('/new/person/oversikt')({
    component: Oversikt
});
