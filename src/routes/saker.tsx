import { createFileRoute } from '@tanstack/react-router';
import SakerFullscreenProxy from 'src/app/personside/infotabs/saksoversikt/SakerFullscreenProxy';
import WaitForUserLoaded from 'src/components/WaitForUserLoaded';
import { sakerSearchSchema } from './person/saker';
import { keepQueryParams } from 'src/utils/keepQueryParams';

export const Route = createFileRoute('/saker')({
    component: RouteComponent,
    validateSearch: sakerSearchSchema,
    search: {
        middlewares: [keepQueryParams(['sakstema', 'avsender'])]
    }
});

function RouteComponent() {
    return <WaitForUserLoaded>{() => <SakerFullscreenProxy />}</WaitForUserLoaded>;
}