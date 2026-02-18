import { createLazyFileRoute } from '@tanstack/react-router';
import { DokumenterPage } from 'src/components/Dokumenter';

export const Route = createLazyFileRoute('/new/person/dokumenter')({
    component: DokumenterPage
});
