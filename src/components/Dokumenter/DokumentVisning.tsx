import { Alert, VStack } from '@navikt/ds-react';
import { useCallback, useState } from 'react';
import { DokumentEmbeder } from 'src/components/Dokumenter/DokumentEmbeder';
import { byggDokumentVisningUrl, feilmelding } from 'src/components/Dokumenter/utils';
import { erIE11 } from 'src/utils/erIE11';
import { getMockableUrl } from 'src/utils/mockable-dokument-url';

const DokumentVisning = ({ fnr, url }: { url: string; fnr: string }) => {
    const [errMsg, setErrMsg] = useState('');
    const onError = useCallback((statusKode: number) => setErrMsg(feilmelding(statusKode)), [setErrMsg]);

    if (erIE11()) {
        return <Alert variant="info">Kan ikke vise dokumenter i Internet Explorer. Prøv chrome</Alert>;
    }

    const urlV2 = getMockableUrl(byggDokumentVisningUrl(url));

    return (
        <DokumentEmbeder url={urlV2} fnr={fnr} onError={onError}>
            <VStack align="stretch" width="100%">
                <Alert variant="warning">{errMsg}</Alert>
            </VStack>
        </DokumentEmbeder>
    );
};

export default DokumentVisning;
