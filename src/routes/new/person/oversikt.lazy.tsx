import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/oversikt')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello "/new/person/oversikt"!</div>;
}
