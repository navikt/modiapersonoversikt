import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/saker')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello "/new/person/saker"!</div>;
}
