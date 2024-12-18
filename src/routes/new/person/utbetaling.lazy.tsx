import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/utbetaling')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello "/new/person/utbetaling"!</div>;
}
