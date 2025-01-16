import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/arbeid')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello "/new/person/arbeid"!</div>;
}
