import * as React from 'react';
import { PersonsokResponse } from '../../models/person/personsok';
import styled from 'styled-components';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface Props {
    resultat: PersonsokResponse;
}

const LinjeStyle = styled.div`
    display: flex;
    flex-direction: row;
`;

function PersonsokResultatLinje(props: Props) {
    return (
        <LinjeStyle>
            <Normaltekst>{props.resultat.navn.fornavn}</Normaltekst>
        </LinjeStyle>
    );
}

export default PersonsokResultatLinje;
