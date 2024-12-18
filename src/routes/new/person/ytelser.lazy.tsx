import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/ytelser')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello "/new/person/ytelser"!</div>;
}
