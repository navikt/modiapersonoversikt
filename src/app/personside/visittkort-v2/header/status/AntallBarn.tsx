import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as AdvarselIkonSvg } from 'nav-frontend-ikoner-assets/assets/advarsel-sirkel-fyll.svg';
import { ForelderBarnRelasjon } from '../../PersondataDomain';
import { hentBarn, hentBarnUnder22 } from '../../visittkort-utils';

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

function lagAdvarselOmDodtBarn(barn: ForelderBarnRelasjon[]): React.ReactNode {
    const dode = barn.some(barn => {
        if (!barn.dodsdato.isEmpty()) {
            return true;
        }
        return false;
    });
    if (dode) {
        return <AdvarselIkon title="Ett eller flere av barna har status som død" />;
    }
    return null;
}

export function AntallBarn({ forelderBarnRelasjon }: Props) {
    const barn = hentBarn(forelderBarnRelasjon);
    if (barn.isEmpty()) {
        return null;
    }
    const barnUnder22 = hentBarnUnder22(barn);
    if (barnUnder22.isEmpty()) {
        return <li title="Barn under 22 år">Ingen barn under 22 år</li>;
    }
    const advarselOmDodtBarn = lagAdvarselOmDodtBarn(barnUnder22);
    return (
        <ListElementMedIkon title="Barn under 22 år">
            {advarselOmDodtBarn}
            {barnUnder22.length} barn under 22 år
        </ListElementMedIkon>
    );
}
