import * as React from 'react';
import { Kodeverk, TilrettelagtKommunikasjonMapper } from '../../../../../models/kodeverk';
import EtikettBase from 'nav-frontend-etiketter';

interface Props {
    tilrettelagtKomunikasjonsListe?: Kodeverk[];
}

function TilrettelagtKommunikasjonEtikett(props: { tilrettelagtKommunikasjon: Kodeverk }) {
    if (!props.tilrettelagtKommunikasjon.type) {
        return <EtikettBase type={'fokus'}>{props.tilrettelagtKommunikasjon.beskrivelse}</EtikettBase>;
    }
    return (
        <EtikettBase type={'fokus'}>
            {TilrettelagtKommunikasjonMapper[props.tilrettelagtKommunikasjon.type]}
        </EtikettBase>
    );
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
