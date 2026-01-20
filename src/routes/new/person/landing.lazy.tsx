import { Alert } from '@navikt/ds-react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/new/person/landing')({
    component: Index
});

function Index() {
    return (
        <div className="flex-1">
            <Alert variant="info">Ingen aktiv bruker. Bruk menyen over for å søke etter person.</Alert>
        </div>
    );
}
