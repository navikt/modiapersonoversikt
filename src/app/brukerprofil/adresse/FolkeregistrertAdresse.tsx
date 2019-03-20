import * as React from 'react';

import { formatterRiktigAdresse } from '../../personside/visittkort/body/kontaktinformasjon/adresse/Adresse';
import { Person } from '../../../models/person/person';
import Element from 'nav-frontend-typografi/lib/element';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import styled from 'styled-components/macro';

const AdresseWrapper = styled.div`
    padding-top: 1rem;
`;

export default function FolkeregistrertAdresse({ person }: { person: Person }) {
    const adresse = person.folkeregistrertAdresse ? (
        formatterRiktigAdresse(person.folkeregistrertAdresse)
    ) : (
        <Normaltekst>Ikke registrert.</Normaltekst>
    );
    const post = person.postadresse ? (
        formatterRiktigAdresse(person.postadresse)
    ) : (
        <Normaltekst>Ikke registrert.</Normaltekst>
    );

    return (
        <>
            <AdresseWrapper>
                <Element>Bostedsadresse fra folkeregisteret</Element>
                {adresse}
            </AdresseWrapper>
            <AdresseWrapper>
                <Element>Postadresse fra folkeregisteret</Element>
                {post}
            </AdresseWrapper>
        </>
    );
}
