import * as React from 'react';
import styled from 'styled-components';

import { Person } from '../../../../models/person/person';
import EtikettBase from 'nav-frontend-etiketter';
import { Diskresjonskoder } from '../../../../konstanter';
import { Egenansatt } from '../../../../models/egenansatt';
import { Vergemal } from '../../../../models/vergemal/vergemal';
import { Kodeverk } from '../../../../models/kodeverk';

interface Props {
    person: Person;
    egenAnsatt?: Egenansatt;
    vergemal?: Vergemal;
}

const StyledEtikketter = styled.div`
  > * {
    margin: 3px;
  }
`;

function lagDiskresjonskodeEtikett(diskresjonskode: Kodeverk) {
    switch (diskresjonskode.kodeRef) {
        case Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE:
            return <EtikettBase key={diskresjonskode.kodeRef} type={'advarsel'}>Kode 6</EtikettBase>;
        case Diskresjonskoder.FORTROLIG_ADRESSE:
            return <EtikettBase key={diskresjonskode.kodeRef} type={'advarsel'}>Kode 7</EtikettBase>;
        default:
            return null;
    }
}

function lagEgenAnsattEtikett() {
    return <EtikettBase key={'egenansatt'} type={'advarsel'}>Egen ansatt</EtikettBase>;
}

function lagSikkerhetstiltakEtikett() {
    return(
        <EtikettBase key={'sikkerhetstiltak'} type={'advarsel'}>
            Sikkerhetstiltak
        </EtikettBase>
    );
}

function lagTilrettelagtKommunikasjonEtikett(tilrettelagtKommunikasjon: Kodeverk) {
    return (
        <EtikettBase key={tilrettelagtKommunikasjon.kodeRef} type={'fokus'}>
            {tilrettelagtKommunikasjon.beskrivelse}
        </EtikettBase>);
}

function harVergemål(vergemal?: Vergemal) {
    return vergemal && vergemal.verger && vergemal.verger.length > 0;
}

function lagEtiketter(person: Person, egenAnsatt?: Egenansatt, vergemal?: Vergemal) {
    const etiketter: JSX.Element[]  = [];
    if (person.diskresjonskode) {
        const diskresjonskodeEtikett = lagDiskresjonskodeEtikett(person.diskresjonskode);
        if (diskresjonskodeEtikett) {
            etiketter.push(diskresjonskodeEtikett);
        }
    }
    if (egenAnsatt && egenAnsatt.erEgenAnsatt) {
        etiketter.push(lagEgenAnsattEtikett());
    }
    if (person.sikkerhetstiltak) {
        etiketter.push(lagSikkerhetstiltakEtikett());
    }
    if (harVergemål(vergemal)) {
        etiketter.push(<EtikettBase key="vergemal" type={'fokus'}>Vergemål</EtikettBase>);
    }

    person.tilrettelagtKomunikasjonsListe.forEach(tilrettelagtKommunikasjon  => {
            etiketter.push(lagTilrettelagtKommunikasjonEtikett(tilrettelagtKommunikasjon));
        }
    );

    return etiketter;
}

function Etiketter( {person, egenAnsatt, vergemal}: Props) {
    const etiketter = lagEtiketter(person, egenAnsatt, vergemal);
    return (
        <StyledEtikketter>
            {etiketter}
        </StyledEtikketter>
    );
}

export default Etiketter;