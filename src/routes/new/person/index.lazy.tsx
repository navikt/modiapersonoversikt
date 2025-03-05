import { Navigate, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/')({
    component: RouteComponent
});

function RouteComponent() {
    return <Navigate to="/new/person/oversikt" replace />;
}
