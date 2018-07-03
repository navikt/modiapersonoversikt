import * as React from 'react';
import { Person } from '../../../../../models/person/person';
import styled from 'styled-components';
import { paths } from '../../../../routes/routing';
import { Link } from 'react-router-dom';

const LenkeEndreBrukerprofil = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 0.9em;
`;

function LenkeBrukerprofilVisning(props: { nyBrukerprofilToggle: boolean, person: Person }) {
    if (props.nyBrukerprofilToggle) {
        return (
            <LenkeEndreBrukerprofil>
                <Link
                    className={'lenke'}
                    to={`${paths.brukerprofil}/${props.person.fødselsnummer}`}
                >
                    Administrer brukerprofil
                </Link>
            </LenkeEndreBrukerprofil>
        );
    } else {
        return (
            <LenkeEndreBrukerprofil>
                <a
                    className={'lenke'}
                    href={`${paths.legacyPersonPath}/${props.person.fødselsnummer}${paths.legacyBrukerprofil}`}
                >
                    Administrer brukerprofil
                </a>
            </LenkeEndreBrukerprofil>
        );
    }
}

export default LenkeBrukerprofilVisning;
