import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/varsler')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello "/new/person/varsler"!</div>;
}
