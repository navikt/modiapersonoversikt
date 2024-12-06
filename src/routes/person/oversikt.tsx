import { createFileRoute } from '@tanstack/react-router';
import Oversikt from 'src/app/personside/infotabs/oversikt/Oversikt';

export const Route = createFileRoute('/person/oversikt')({
    component: Oversikt
});
