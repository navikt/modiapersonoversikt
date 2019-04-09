import * as React from 'react';
import styled from 'styled-components';

import { Person } from '../../../../../models/person/person';
import SikkerhetstiltakEtikett from './SikkerhetstiltakEtikett';
import EgenAnsattEtikett from './EgenansattEtikettContainer';
import VergemålEtikettContainer from './VergemålEtikettContainer';
import DiskresjonskodeEtikett from './DiskresjonskodeEtikett';
import TilrettelagtKommunikasjonsEtiketter from './TilrettelagtKommunikasjonsEtiketter';
import ReservertIKRREtikett from './ReservertIKRREtikett';

interface Props {
    person: Person;
}

const StyledEtikketter = styled.section`
    > * {
        margin: 6px 0 0 6px;
        white-space: nowrap;
    }
`;

function Etiketter({ person }: Props) {
    return (
        <StyledEtikketter role="region" aria-label="etiketter">
            <DiskresjonskodeEtikett diskresjonskode={person.diskresjonskode} />
            <EgenAnsattEtikett />
            <SikkerhetstiltakEtikett sikkerhetstiltak={person.sikkerhetstiltak} />
            <ReservertIKRREtikett />
            <VergemålEtikettContainer />
            <TilrettelagtKommunikasjonsEtiketter
                tilrettelagtKomunikasjonsListe={person.tilrettelagtKomunikasjonsListe}
            />
        </StyledEtikketter>
    );
}

export default Etiketter;
