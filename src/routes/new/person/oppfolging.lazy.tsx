import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/oppfolging')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello "/new/person/oppfolging"!</div>;
}
