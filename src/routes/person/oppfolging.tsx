import { createFileRoute } from '@tanstack/react-router';
import OppfolgingContainer from 'src/app/personside/infotabs/oppfolging/OppfolgingContainer';

export const Route = createFileRoute('/person/oppfolging')({
    component: OppfolgingContainer
});
