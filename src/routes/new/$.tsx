import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/new/$')({
    component: () => <Navigate to="/new" replace />
});
