import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/person/utbetaling/$postering')({
    component: RouteComponent
});

function RouteComponent() {
    return <div>Empty route</div>;
}
