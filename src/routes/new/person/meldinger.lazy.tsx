import { createLazyFileRoute } from '@tanstack/react-router';
import { MeldingerPage } from 'src/components/Meldinger';

export const Route = createLazyFileRoute('/new/person/meldinger')({
    component: RouteComponent
});

function RouteComponent() {
    return <MeldingerPage />;
}
