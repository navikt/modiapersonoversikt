import * as React from 'react';
import styled from 'styled-components';

import { Person } from '../../../../../models/person/person';
import EtikettBase from 'nav-frontend-etiketter';
import { Diskresjonskoder } from '../../../../../konstanter';
import { Kodeverk } from '../../../../../models/kodeverk';
import SikkerhetstiltakEtikett from './SikkerhetstiltakEtikett';
import EgenAnsattEtikett from './EgenansattEtikettContainer';
import VergemålEtikettContainer from './VergemålEtikettContainer';

interface Props {
    person: Person;
}

const StyledEtikketter = styled.section`
    > * {
        margin: 6px 0 0 6px;
        white-space: nowrap;
    }
`;

function DiskresjonskodeEtikett(props: { diskresjonskode?: Kodeverk }) {
    if (!props.diskresjonskode) {
        return null;
    }

    switch (props.diskresjonskode.kodeRef) {
        case Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE:
            return <EtikettBase type={'advarsel'}>Kode 6</EtikettBase>;
        case Diskresjonskoder.FORTROLIG_ADRESSE:
            return <EtikettBase type={'advarsel'}>Kode 7</EtikettBase>;
        default:
            return null;
    }
}

function TilrettelagtKommunikasjonEtikett(props: { tilrettelagtKommunikasjon: Kodeverk }) {
    return <EtikettBase type={'fokus'}>{props.tilrettelagtKommunikasjon.beskrivelse}</EtikettBase>;
}

function Etiketter({ person }: Props) {
    return (
        <StyledEtikketter role="region" aria-label="etiketter">
            <DiskresjonskodeEtikett diskresjonskode={person.diskresjonskode} />
            <EgenAnsattEtikett />
            <SikkerhetstiltakEtikett sikkerhetstiltak={person.sikkerhetstiltak} />
            <VergemålEtikettContainer />
            {person.tilrettelagtKomunikasjonsListe.map(tilrettelagtKommunikasjon => (
                <TilrettelagtKommunikasjonEtikett
                    key={tilrettelagtKommunikasjon.kodeRef}
                    tilrettelagtKommunikasjon={tilrettelagtKommunikasjon}
                />
            ))}
        </StyledEtikketter>
    );
}

export default Etiketter;
