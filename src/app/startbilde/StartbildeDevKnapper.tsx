import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';
import { paths, setNyBrukerIPath } from '../routes/routing';
import { useHistory } from 'react-router';
import { aremark } from '../../mock/person/aremark';
import { moss } from '../../mock/person/moss';

function StartbildeDevKnapper() {
    const history = useHistory();

    return (
        <>
            <KnappBase onClick={() => setNyBrukerIPath(history, aremark.fødselsnummer)} type="hoved">
                Snarvei til Aremark!
            </KnappBase>
            <KnappBase onClick={() => setNyBrukerIPath(history, moss.fødselsnummer)} type="hoved">
                Snarvei til Moss!
            </KnappBase>
            <KnappBase onClick={() => history.push(paths.standaloneKomponenter)} type="hoved">
                Snarvei til standalone-komponenter
            </KnappBase>
        </>
    );
}

export default StartbildeDevKnapper;
