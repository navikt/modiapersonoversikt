import { createLazyFileRoute } from '@tanstack/react-router';
import { UtbetalingPage } from 'src/components/Utbetaling';

export const Route = createLazyFileRoute('/new/person/utbetaling')({
    component: UtbetalingPage
});
