import { createFileRoute } from '@tanstack/react-router';
import VarslerContainer from 'src/app/personside/infotabs/varsel/VarslerContainer';

export const Route = createFileRoute('/person/varsler')({
    component: VarslerContainer
});
