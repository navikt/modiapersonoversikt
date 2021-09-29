import * as React from 'react';
import styled from 'styled-components/macro';
import { Person } from '../../PersondataDomain';
import DiskresjonskodeEtikett from './DiskresjonskodeEtikett';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import EgenAnsattEtikett from './EgenAnsattEtikett';
import SikkerhetstiltakEtikett from './SikkerhetstiltakEtikett';

interface Props {
    person: Person;
}

const StyledEtikketter = styled.section`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > * {
        margin: 6px 0 0 6px;
        white-space: nowrap;
    }
`;

function Etiketter({ person }: Props) {
    return (
        <ErrorBoundary boundaryName="Etiketter">
            <StyledEtikketter role="region" aria-label="etiketter">
                <DiskresjonskodeEtikett adressebeskyttelse={person.adressebeskyttelse[0].kode} />
                <EgenAnsattEtikett erEgenansatt={person.erEgenAnsatt} />
                <SikkerhetstiltakEtikett sikkerhetstiltak={person.sikkerhetstiltak} />
                {/*<ReservertIKRREtikett />
                <VergemalsEtikett vergemål={person.vergemal} />
                <TilrettelagtKommunikasjonsEtiketter
                    tilrettelagtKomunikasjonsListe={person.tilrettelagtKomunikasjonsListe}
                />
                <DoedsboEtikett doedsbo={person.kontaktinformasjonForDoedsbo} />
                <FullmaktEtikett fullmakt={person.fullmakt} /> */}
            </StyledEtikketter>
        </ErrorBoundary>
    );
}

export default Etiketter;
