import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/meldinger')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Hello "/new/person/meldinger"!</div>;
}
