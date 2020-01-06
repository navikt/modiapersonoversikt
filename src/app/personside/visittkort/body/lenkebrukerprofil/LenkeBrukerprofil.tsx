import * as React from 'react';
import { Person } from '../../../../../models/person/person';
import { paths } from '../../../../routes/routing';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import useUrlNyPersonforvalter from '../../../../brukerprofil/useUrlNyPersonforvalter';

function LenkeBrukerprofilVisning(props: { nyModiaPersonoversikt: boolean; person: Person }) {
    const personforvalterUrl = useUrlNyPersonforvalter();

    if (props.nyModiaPersonoversikt) {
        return (
            <a className="lenke" href={personforvalterUrl} target={'_blank'} rel="noreferrer noopener">
                <Normaltekst tag="span">Endre personopplysninger</Normaltekst>
            </a>
        );
        return (
            <Link className="lenke" to={`${paths.brukerprofil}/${props.person.fødselsnummer}`}>
                <Normaltekst tag="span">Endre personopplysninger</Normaltekst>
            </Link>
        );
    } else {
        return (
            <a className="lenke" href={personforvalterUrl} target={'_blank'} rel="noreferrer noopener">
                <Normaltekst tag="span">Endre personopplysninger</Normaltekst>
            </a>
        );
        return (
            <a
                className="lenke"
                href={`${paths.legacyPersonPath}/${props.person.fødselsnummer}${paths.legacyBrukerprofil}`}
            >
                <Normaltekst tag="span">Endre personopplysninger</Normaltekst>
            </a>
        );
    }
}

export default LenkeBrukerprofilVisning;
