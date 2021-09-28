import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as AdvarselIkonSvg } from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import { ForelderBarnRelasjon } from '../../PersondataDomain';
import { hentBarn, hentBarnUnder21 } from '../../person-utils';

interface Props {
    forelderBarnRelasjon: ForelderBarnRelasjon[];
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

function lagAdvarsel(barn: ForelderBarnRelasjon[]): React.ReactNode {
    const dode = barn.some(b => erDod(b.tilPerson.personstatus));
    if (dode) {
        return <AdvarselIkon title="Ett eller flere av barnene har status som død" />;
    }
    return null;
}

export function AntallBarn({ forelderBarnRelasjon }: Props) {
    const barnUnder21 = hentBarnUnder21(forelderBarnRelasjon);
    const barn = hentBarn(forelderBarnRelasjon);
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
