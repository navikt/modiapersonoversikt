import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as AdvarselIkonSvg } from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import { erDod, Familierelasjon, getBarn, getBarnUnder21 } from '../../../../../models/person/person';

interface Props {
    familierelasjoner: Familierelasjon[];
}

const ListElementMedIkon = styled.span`
    display: inline-flex;
`;
const AdvarselIkon = styled(AdvarselIkonSvg)`
    width: 1rem;
    margin-top: -0.125rem;
    margin-left: 0.125rem;
    margin-right: 0.125rem;
`;

function lagAdvarsel(barn: Familierelasjon[]): React.ReactNode {
    const dode = barn.some(b => erDod(b.tilPerson.personstatus));
    if (dode) {
        return <AdvarselIkon title="Ett eller flere av barna har status som død" />;
    }
    return null;
}

export function AntallBarn({ familierelasjoner }: Props) {
    const barnUnder21 = getBarnUnder21(familierelasjoner);
    const barn = getBarn(familierelasjoner);
    if (barn.length === 0) {
        return null;
    }
    if (barnUnder21.length === 0) {
        return <li title="Barn under 21 år">Ingen barn under 21 år</li>;
    }
    const advarsel = lagAdvarsel(barnUnder21);
    return (
        <ListElementMedIkon title="Barn under 21 år">
            {advarsel}
            {barnUnder21.length} barn under 21 år
        </ListElementMedIkon>
    );
}
