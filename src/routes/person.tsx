import { createFileRoute, Navigate } from '@tanstack/react-router';
import LegacyAppContainer from 'src/app/LegacyAppContainer';
import PersonoversiktWrapper from 'src/app/personside/Personoversikt';
import LegacyModiaGate from 'src/components/LegacyModiaGate';

export const Route = createFileRoute('/person')({
    component: PersonLayout,
    notFoundComponent: () => <Navigate to="/person/oversikt" replace />
});

function PersonLayout() {
    return (
        <LegacyModiaGate>
            <LegacyAppContainer>
                <PersonoversiktWrapper />
            </LegacyAppContainer>
        </LegacyModiaGate>
    );
}
