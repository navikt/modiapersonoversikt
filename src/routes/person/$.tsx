import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/person/$')({
    component: () => <Navigate to="/person/oversikt" replace />
});
