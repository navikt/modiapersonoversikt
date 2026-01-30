import { createLazyFileRoute } from '@tanstack/react-router';
import { DokumenterPage } from 'src/components/dokumenter';

export const Route = createLazyFileRoute('/new/person/dokumenter')({
    component: DokumenterPage
});
