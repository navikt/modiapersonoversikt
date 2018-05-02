import * as React from 'react';
import styled from 'styled-components';

import { Person, TilrettelagtKommunikasjon } from '../../../../models/person';
import EtikettBase from 'nav-frontend-etiketter';
import { Diskresjonskoder } from '../../../../konstanter';
import { Egenansatt } from '../../../../models/egenansatt';
import { Vergemal } from '../../../../models/vergemal/vergemal';

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

function lagDiskresjonskodeEtikett(diskresjonskode: string) {
    switch (diskresjonskode) {
        case Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE:
            return <EtikettBase key={diskresjonskode} type={'advarsel'}>Strengt fortrolig adresse</EtikettBase>;
        case Diskresjonskoder.FORTROLIG_ADRESSE:
            return <EtikettBase key={diskresjonskode} type={'advarsel'}>Fortrolig adresse</EtikettBase>;
        default:
            return <EtikettBase key={diskresjonskode} type={'info'}>{diskresjonskode}</EtikettBase>;
    }
}

function lagEgenAnsattEtikett() {
    return <EtikettBase key={'egenansatt'} type={'advarsel'}>Egen Ansatt</EtikettBase>;
}

function lagSikkerhetstiltakEtikett() {
    return(
        <EtikettBase key={'sikkerhetstiltak'} type={'advarsel'}>
            Sikkerhetstiltak
        </EtikettBase>
    );
}

function lagTilrettelagtKommunikasjonEtikett(tilrettelagtKommunikasjon: TilrettelagtKommunikasjon) {
    return (
        <EtikettBase key={tilrettelagtKommunikasjon.behovKode} type={'fokus'}>
            {tilrettelagtKommunikasjon.beskrivelse}
        </EtikettBase>);
}

function lagEtiketter(person: Person, egenAnsatt?: Egenansatt, vergemal?: Vergemal) {
    const etiketter: JSX.Element[]  = [];
    if (person.diskresjonskode) {
        etiketter.push(lagDiskresjonskodeEtikett(person.diskresjonskode));
    }
    if (egenAnsatt && egenAnsatt.erEgenAnsatt) {
        etiketter.push(lagEgenAnsattEtikett());
    }
    person.tilrettelagtKomunikasjonsListe.map(tilrettelagtKommunikasjon  =>
        etiketter.push(lagTilrettelagtKommunikasjonEtikett(tilrettelagtKommunikasjon))
    );

    if (person.sikkerhetstiltak) {
        etiketter.push(lagSikkerhetstiltakEtikett());
    }
    if (vergemal && vergemal.verger && vergemal.verger.length > 0) {
        etiketter.push(<EtikettBase key="vergemal" type={'fokus'}>Vergemål</EtikettBase>);
    }
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