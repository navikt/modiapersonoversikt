import * as React from 'react';
import styled from 'styled-components';

import { Person } from '../../../../models/person';
import EtikettBase from 'nav-frontend-etiketter';
import { Diskresjonskoder } from '../../../../constants';

interface Props {
    person: Person;
}

const EtikettContainer = styled.div`
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

function lagEtiketter(person: Person) {
    const etiketter = [];
    if (person.diskresjonskode) {
        etiketter.push(lagDiskresjonskodeEtikett(person.diskresjonskode));
    }
    return etiketter;
}

function Etiketter( {person}: Props) {
    const etiketter = lagEtiketter(person);
    return (
        <EtikettContainer>
            {etiketter}
        </EtikettContainer>
    );
}

export default Etiketter;