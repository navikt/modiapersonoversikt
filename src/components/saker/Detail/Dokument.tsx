import { Alert } from '@navikt/ds-react';
import DokumentVisning from 'src/components/saker/Detail/DokumentVisning';
import { getSaksdokumentUrl } from 'src/components/saker/utils';
import type { Dokument, Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';
import { DokumentDokumentStatus } from 'src/generated/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';

const Dokument = ({
    journalPost,
    dokument,
    kanVises
}: { journalPost: Dokumentmetadata; dokument: Dokument; kanVises: boolean }) => {
    const fnr = usePersonAtomValue();
    const journalpostId = journalPost.journalpostId;
    const dokumentReferanse = dokument.dokumentreferanse;
    const ikkeTilgjengelig = journalpostId === null || dokumentReferanse === null;

    const dokumentTekst = (dokument: Dokument) => {
        return (
            dokument.tittel +
            (dokument.skjerming ? ' (Skjermet)' : '') +
            (dokument.dokumentStatus === DokumentDokumentStatus.KASSERT ? ' (Kassert)' : '') +
            (ikkeTilgjengelig ? ' (Dokument er ikke tilgjengelig)' : '')
        );
    };

    if (!kanVises || ikkeTilgjengelig) {
        return (
            <Alert variant="warning" className="my-4">
                {dokumentTekst(dokument)}
            </Alert>
        );
    }

    const dokumentUrl = getSaksdokumentUrl(journalpostId, dokumentReferanse);

    return <DokumentVisning fnr={fnr} url={dokumentUrl} />;
};

export default Dokument;
