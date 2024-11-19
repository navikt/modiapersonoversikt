import { Alert } from '@navikt/ds-react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
    component: Index
});

function Index() {
    return (
        <div>
            <Alert variant="info">Ingen aktiv bruker. Bruk menyen over for å søke etter person.</Alert>
        </div>
    );
}
