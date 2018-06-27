import * as React from 'react';
import styled from 'styled-components';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { Verge } from '../../../../../models/vergemal/vergemal';

const VergesakstypeStyling = styled.span`
  display: block;
`;

export function Vergesakstype({verger}: {verger: Verge[]}) {
    const alleVergesakstyper = verger.map(verge => verge.vergesakstype ?
        verge.vergesakstype.beskrivelse : 'Ingen vergesakstype oppgitt');
    const unikeVergssakstyper = Array.from(new Set(alleVergesakstyper)).join(', ');
    return (
        <VergesakstypeStyling>
            <Undertekst>{unikeVergssakstyper}</Undertekst>
        </VergesakstypeStyling>
    );
}
