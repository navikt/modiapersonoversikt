import { createFileRoute } from '@tanstack/react-router';
import SakerFullscreenProxy from 'src/app/personside/infotabs/saksoversikt/SakerFullscreenProxy';
import LegacyModiaGate from 'src/components/LegacyModiaGate';
import WaitForUserLoaded from 'src/components/WaitForUserLoaded';
import { keepQueryParamsSimple } from 'src/utils/keepQueryParamsSimple';
import { sakerSearchSchema } from './person/saker';

export const Route = createFileRoute('/saker')({
    component: RouteComponent,
    validateSearch: sakerSearchSchema,
    search: {
        middlewares: [keepQueryParamsSimple(['sakstema', 'avsender'])]
    }
});

function RouteComponent() {
    return (
        <LegacyModiaGate>
            <WaitForUserLoaded>{() => <SakerFullscreenProxy />}</WaitForUserLoaded>
        </LegacyModiaGate>
    );
}
