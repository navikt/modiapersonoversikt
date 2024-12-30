import { createLazyFileRoute } from '@tanstack/react-router';
import VarslerNy from 'src/app/personside/infotabs/varsel/VarslerNy';

export const Route = createLazyFileRoute('/new/person/varsler')({
    component: VarslerNy
});
