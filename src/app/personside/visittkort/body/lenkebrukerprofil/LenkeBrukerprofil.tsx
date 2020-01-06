import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import useUrlNyPersonforvalter from '../../../../brukerprofil/useUrlNyPersonforvalter';

function LenkeBrukerprofilVisning() {
    const personforvalterUrl = useUrlNyPersonforvalter();
    return (
        <a className="lenke" href={personforvalterUrl} target={'_blank'} rel="noreferrer noopener">
            <Normaltekst tag="span">Endre personopplysninger</Normaltekst>
        </a>
    );
}

export default LenkeBrukerprofilVisning;
