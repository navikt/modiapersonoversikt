import * as React from 'react';
import { Kodeverk, KodeverkEtikett } from '../../../../../models/kodeverk';
import EtikettBase from 'nav-frontend-etiketter';

interface Props {
    tilrettelagtKomunikasjonsListe?: Kodeverk[];
}

function TilrettelagtKommunikasjonEtikett(props: { tilrettelagtKommunikasjon: Kodeverk }) {
    return <EtikettBase type={'fokus'}>{KodeverkEtikett[props.tilrettelagtKommunikasjon.beskrivelse]}</EtikettBase>;
}

function TilrettelagtKommunikasjonsEtiketter(props: Props) {
    if (!props.tilrettelagtKomunikasjonsListe) {
        return null;
    }

    const etiketter = props.tilrettelagtKomunikasjonsListe.map(tilrettelagtKommunikasjon => (
        <TilrettelagtKommunikasjonEtikett
            key={tilrettelagtKommunikasjon.kodeRef}
            tilrettelagtKommunikasjon={tilrettelagtKommunikasjon}
        />
    ));
    return <>{etiketter}</>;
}

export default TilrettelagtKommunikasjonsEtiketter;
