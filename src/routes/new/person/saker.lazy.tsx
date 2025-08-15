import { createLazyFileRoute } from '@tanstack/react-router';
import { SakerPage } from 'src/components/saker';

export const Route = createLazyFileRoute('/new/person/saker')({
    component: SakerPage
});
