import React from 'react';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import { Journalpost, Kommunikasjonsretning } from '../../../../../../models/saksoversikt/journalpost';
import { formatterDatoTid } from '../../../../../../utils/date-utils';

interface Props {
    journalpost: Journalpost;
}

function JournalpostLestAvBruker({ journalpost }: Props) {
    if (journalpost.retning !== Kommunikasjonsretning.Ut) {
        return null;
    }

    return (
        <EtikettGraa>
            {journalpost.lestDato && <div>Lest: {formatterDatoTid(new Date(journalpost.lestDato))}</div>}
        </EtikettGraa>
    );
}

export default JournalpostLestAvBruker;
