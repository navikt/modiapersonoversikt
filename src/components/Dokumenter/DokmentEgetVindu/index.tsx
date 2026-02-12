import { HStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import DokumentVisning from 'src/components/saker/Detail/DokumentVisning';
import { getSaksdokumentUrl } from 'src/components/saker/utils';
import { useOnMount } from 'src/utils/customHooks';

const routeApi = getRouteApi('/new/dokument');

function DokumentEgetVindu({ fnr }: { fnr: string }) {
    const { dokument, journalpost } = routeApi.useSearch();

    useOnMount(() => {
        document.title = 'Dokument';
    });

    if (!dokument) {
        return (
            <HStack>
                <AlertStripeFeil>Mangler dokumentURL</AlertStripeFeil>
            </HStack>
        );
    }
    return <DokumentVisning fnr={fnr} url={getSaksdokumentUrl(journalpost, dokument)} />;
}

export default DokumentEgetVindu;
