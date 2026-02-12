import { createLazyFileRoute } from '@tanstack/react-router';
import SaksDokumentEgetVindu from 'src/app/personside/infotabs/saksoversikt/SaksDokumentIEgetVindu';
import WaitForUserLoaded from 'src/components/WaitForUserLoaded';

export const Route = createLazyFileRoute('/new/dokument')({
    component: DokumentRoute
});

function DokumentRoute() {
    return <WaitForUserLoaded>{({ fnr }) => <SaksDokumentEgetVindu fnr={fnr} />}</WaitForUserLoaded>;
}
