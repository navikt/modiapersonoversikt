import { createLazyFileRoute } from '@tanstack/react-router';
import { YtelserPage } from 'src/components/ytelser';

export const Route = createLazyFileRoute('/new/person/ytelser')({
    component: YtelserPage
});
