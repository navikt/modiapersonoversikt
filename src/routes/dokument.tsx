import { createFileRoute } from '@tanstack/react-router';
import SaksDokumentEgetVindu from 'src/app/personside/infotabs/saksoversikt/SaksDokumentIEgetVindu';
import LegacyModiaGate from 'src/components/LegacyModiaGate';
import WaitForUserLoaded from 'src/components/WaitForUserLoaded';
import { z } from 'zod';

const dokumentSearchSchema = z.object({
    dokument: z.preprocess(String, z.string().catch('')),
    journalpost: z.preprocess(String, z.string().optional())
});

export const Route = createFileRoute('/dokument')({
    component: DokumentRoute,
    validateSearch: dokumentSearchSchema
});

function DokumentRoute() {
    return (
        <LegacyModiaGate>
            <WaitForUserLoaded>{({ fnr }) => <SaksDokumentEgetVindu fnr={fnr} />}</WaitForUserLoaded>
        </LegacyModiaGate>
    );
}
