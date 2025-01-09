import { createLazyFileRoute } from '@tanstack/react-router';
import VarslerNy from 'src/components/varsler/VarslerNy';

export const Route = createLazyFileRoute('/new/person/varsler')({
    component: VarslerNy
});
