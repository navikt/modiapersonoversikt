import * as React from 'react';
import { Person } from '../../../../../models/person/person';
import { paths } from '../../../../routes/routing';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

function LenkeBrukerprofilVisning(props: { nyModiaPersonoversikt: boolean; person: Person }) {
    if (props.nyModiaPersonoversikt) {
        return (
            <Link className="lenke" to={`${paths.brukerprofil}/${props.person.fødselsnummer}`}>
                <Normaltekst tag="span">Administrer brukerprofil</Normaltekst>
            </Link>
        );
    } else {
        return (
            <a
                className="lenke"
                href={`${paths.legacyPersonPath}/${props.person.fødselsnummer}${paths.legacyBrukerprofil}`}
            >
                <Normaltekst tag="span">Administrer brukerprofil</Normaltekst>
            </a>
        );
    }
}

export default LenkeBrukerprofilVisning;
