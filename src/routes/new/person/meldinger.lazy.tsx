import { createLazyFileRoute } from '@tanstack/react-router';
import { LukkbarNyMelding } from 'src/components/melding/LukkbarNyMelding';

export const Route = createLazyFileRoute('/new/person/meldinger')({
    component: RouteComponent
});

function RouteComponent() {
    return <LukkbarNyMelding />;
}
