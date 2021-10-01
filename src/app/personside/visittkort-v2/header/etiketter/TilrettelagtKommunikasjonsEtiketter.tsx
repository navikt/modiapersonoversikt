import * as React from 'react';
import EtikettBase from 'nav-frontend-etiketter';
import { TilrettelagtKommunikasjon } from './../../PersondataDomain';

interface Props {
    tilrettelagtKommunikasjon: TilrettelagtKommunikasjon;
}

function TilrettelagtKommunikasjonsEtiketter({ tilrettelagtKommunikasjon }: Props) {
    const talesprakEtikett =
        tilrettelagtKommunikasjon.talesprak.length > 0 ? <EtikettBase type={'fokus'}>Talespråktolk</EtikettBase> : null;
    const tegnsprakEtikett =
        tilrettelagtKommunikasjon.tegnsprak.length > 0 ? <EtikettBase type={'fokus'}>Tegnspråktolk</EtikettBase> : null;

    return (
        <>
            {talesprakEtikett}
            {tegnsprakEtikett}
        </>
    );
}

export default TilrettelagtKommunikasjonsEtiketter;
