import { createFileRoute, Navigate } from '@tanstack/react-router';
import LegacyAppContainer from 'src/app/LegacyAppContainer';
import PersonoversiktWrapper from 'src/app/personside/Personoversikt';

export const Route = createFileRoute('/person')({
    component: PersonLayout,
    notFoundComponent: () => <Navigate to="/person/oversikt" replace />
});

function PersonLayout() {
    return (
        <LegacyAppContainer>
            <PersonoversiktWrapper />
        </LegacyAppContainer>
    );
}
