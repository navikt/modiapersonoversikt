import { createLazyFileRoute } from '@tanstack/react-router';
import { VarslerPage } from 'src/components/varsler';

export const Route = createLazyFileRoute('/new/person/varsler')({
    component: VarslerPage
});
