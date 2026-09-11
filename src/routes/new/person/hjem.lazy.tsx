import { createLazyFileRoute } from '@tanstack/react-router';
import Hjem from 'src/components/oversikt/Hjem';

export const Route = createLazyFileRoute('/new/person/hjem')({
    component: Hjem
});
