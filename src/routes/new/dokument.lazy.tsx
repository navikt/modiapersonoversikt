import { createLazyFileRoute } from '@tanstack/react-router';
import DokumentEgetVindu from 'src/components/Dokumenter/DokmentEgetVindu';
import WaitForUserLoaded from 'src/components/WaitForUserLoaded';

export const Route = createLazyFileRoute('/new/dokument')({
    component: DokumentRoute
});

function DokumentRoute() {
    return <WaitForUserLoaded>{({ fnr }) => <DokumentEgetVindu fnr={fnr} />}</WaitForUserLoaded>;
}
