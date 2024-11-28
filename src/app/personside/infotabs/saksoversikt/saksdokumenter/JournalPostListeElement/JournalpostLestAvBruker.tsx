import EtikettGraa from '../../../../../../components/EtikettGraa';
import { Journalpost } from '../../../../../../models/saksoversikt/journalpost';
import { formatterDatoTid } from '../../../../../../utils/date-utils';

interface Props {
    journalpost: Journalpost;
}

function JournalpostLestAvBruker({ journalpost }: Props) {
    if (!journalpost.lestDato) {
        return null;
    }

    return <EtikettGraa>Lest: {formatterDatoTid(new Date(journalpost.lestDato))}</EtikettGraa>;
}

export default JournalpostLestAvBruker;
