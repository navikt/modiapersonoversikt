import EtikettGraa from 'src/components/EtikettGraa';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';
import { formatterDatoTid } from 'src/utils/date-utils';

interface Props {
    journalpost: Dokumentmetadata;
}

function JournalpostLestAvBruker({ journalpost }: Props) {
    if (!journalpost.lestDato) {
        return null;
    }

    return <EtikettGraa>Lest: {formatterDatoTid(new Date(journalpost.lestDato))}</EtikettGraa>;
}

export default JournalpostLestAvBruker;
