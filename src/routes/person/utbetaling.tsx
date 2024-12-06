import { createFileRoute } from '@tanstack/react-router';
import UtbetalingerContainer from 'src/app/personside/infotabs/utbetalinger/UtbetalingerContainer';

export const Route = createFileRoute('/person/utbetaling')({
    component: UtbetalingerContainer
});
