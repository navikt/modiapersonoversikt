import { createLazyFileRoute } from '@tanstack/react-router';
import OversiktNy from '../../../app/personside/infotabs/oversikt/OversiktNy';

export const Route = createLazyFileRoute('/new/person/oversikt')({
    component: OversiktNy
});
