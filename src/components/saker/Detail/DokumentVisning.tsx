import { Alert } from '@navikt/ds-react';
import { useCallback, useState } from 'react';
import { getMockableUrl } from 'src/app/personside/infotabs/saksoversikt/dokumentvisning/mockable-dokument-url';
import { DokumentEmbeder } from 'src/components/saker/Detail/DokumentEmbeder ';
import { byggDokumentVisningUrl, feilmelding } from 'src/components/saker/utils';
import { erIE11 } from 'src/utils/erIE11';

const DokumentVisning = ({ fnr, url }: { url: string; fnr: string }) => {
    const [errMsg, setErrMsg] = useState('');
    const onError = useCallback((statusKode: number) => setErrMsg(feilmelding(statusKode)), [setErrMsg]);

    if (erIE11()) {
        return <Alert variant="info">Kan ikke vise dokumenter i Internet Explorer. Prøv chrome</Alert>;
    }

    const urlV2 = getMockableUrl(byggDokumentVisningUrl(url));

    return (
        <DokumentEmbeder url={urlV2} fnr={fnr} onError={onError}>
            <Alert variant="warning" className={'my-4'}>
                {errMsg}
            </Alert>
        </DokumentEmbeder>
    );
};

export default DokumentVisning;
